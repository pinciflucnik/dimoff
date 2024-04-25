import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../constants/constants';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { LoginResponse, RegisterResponse } from 'src/types/auth-res-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userToken$$ = new BehaviorSubject<LoginResponse | RegisterResponse | undefined>(undefined);
  userToken$ = this.userToken$$.asObservable();
  userToken: string| undefined;
  subscription: Subscription;
  constructor(private http: HttpClient) {
    this.subscription = this.userToken$.subscribe((token) => {
      this.userToken = token?.idToken
    })
  }

  register(email: string, password: string){
    const payload = {
      email,
      password,
      "returnSecureToken": true 
    }

    return this.http.post<RegisterResponse>(constants.register_URL, JSON.stringify(payload)).pipe(tap((res)=> this.userToken$$.next(res)))
  }

  login(email: string, password: string){
    const payload = {
      email,
      password,
      "returnSecureToken": true 
    }

    return this.http.post<LoginResponse>(constants.login_URL, JSON.stringify(payload)).pipe(tap((res)=> this.userToken$$.next(res)))
  }
}

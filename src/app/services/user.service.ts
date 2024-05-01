import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { constants } from '../constants/constants';
import { BehaviorSubject, Subscription, tap, TimeoutInfo } from 'rxjs';
import { LoginResponse, RegisterResponse } from 'src/types/auth-res-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<LoginResponse | RegisterResponse | undefined>(undefined);
  user$ = this.user$$.asObservable();
  userToken: string| undefined;
  subscription: Subscription;
  elapsed: number = 0;
  // timeOutID: ReturnType<typeof setTimeout> | undefined;
  constructor(private http: HttpClient, private router: Router) {
    this.subscription = this.user$.subscribe((token) => {
      this.userToken = token?.idToken
    })
  }

  register(email: string, password: string){
    const payload = {
      email,
      password,
      "returnSecureToken": true 
    }

    return this.http.post<RegisterResponse>(constants.register_URL, JSON.stringify(payload)).pipe(tap((res)=> this.user$$.next(res)))
  }

  login(email: string, password: string){
    const payload = {
      email,
      password,
      "returnSecureToken": true 
    }

    return this.http.post<LoginResponse>(constants.login_URL, JSON.stringify(payload))
    .pipe(tap((res)=> {
      this.user$$.next(res)
      sessionStorage.setItem("user", res.email),
      sessionStorage.setItem("token", res.idToken),
      setTimeout(()=> {
        sessionStorage.clear();
        this.router.navigate(["/login"]);        
      } ,36000);
    }))
  }
  getProfile(){
    return sessionStorage.getItem("user");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}

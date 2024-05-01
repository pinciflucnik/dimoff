import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PartsListResponseType } from 'src/types/api-res-types';
import { constants } from '../constants/constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentToken = sessionStorage.getItem('token')
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }
  addPart(partsName: string){
    const body = {'name': partsName};
    return this.http.post(`${constants.base_URL}parts.json?auth=${this.currentToken}`,body);
  }
  getParts(){
    return this.http.get<PartsListResponseType>(`${constants.base_URL}parts.json?auth=${this.currentToken}`);
  }
}

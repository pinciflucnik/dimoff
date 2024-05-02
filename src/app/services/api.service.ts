import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ListResponseType } from 'src/types/api-res-types';
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
  addActivity(actName: string){
    const body = {'name': actName};
    return this.http.post(`${constants.base_URL}activities.json?auth=${this.currentToken}`,body);
  }
  getParts(){
    return this.http.get<ListResponseType>(`${constants.base_URL}parts.json?auth=${this.currentToken}`);
  }
  getActivities(){
    return this.http.get<ListResponseType>(`${constants.base_URL}activities.json?auth=${this.currentToken}`);
  }
  deletePart(partId: string){
    return this.http.delete(`${constants.base_URL}parts/${partId}.json?auth=${this.currentToken}`);
  }
  deleteActivity(partId: string){
    return this.http.delete(`${constants.base_URL}activities/${partId}.json?auth=${this.currentToken}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ClientType, ListResponseType } from 'src/types/api-res-types';
import { constants } from '../constants/constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentToken = sessionStorage.getItem('token');
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }
  addPart(partsName: string){
    const body = {'name': partsName};
    return this.http.post(`${constants.base_URL}parts.json?auth=${this.currentToken}`,body);
  }
  addActivity(actName: string){
    const body = {'name': actName};
    return this.http.post(`${constants.base_URL}activities.json?auth=${this.currentToken}`,body);
  }
  addClient(clientName: string, phone: string, make: string, model: string, vin: string, plate: string){
    let cars: any = []
    cars.push({
      'make': make,
      'model': model,
      'vin': vin,
      'rego': plate
    })
    
    const body = {
      'name': clientName,
      'phone': phone,
      'cars' : cars
    }
    return this.http.post<ClientType>(`${constants.base_URL}clients.json?auth=${this.currentToken}`,body)
  }
  addCar(id: string, make: string, model: string, vin: string, plate: string){
    let cars: any = [];
    return this.http.get(`${constants.base_URL}clients/${id}/cars.json?auth=${this.currentToken}`)
    .pipe(tap((res) => {
        cars = res;
        cars.push({
          'make': make,
          'model': model,
          'vin': vin,
          'rego': plate
        });
        return this.http.put(`${constants.base_URL}clients/${id}/cars.json?auth=${this.currentToken}`, cars).subscribe(() => {
        })
        
      }));
  }
  editClient(id: string, client: ClientType){
    return this.http.put<ClientType>(`${constants.base_URL}clients/${id}.json?auth=${this.currentToken}`,client)
  }
  getParts(){
    return this.http.get<ListResponseType>(`${constants.base_URL}parts.json?auth=${this.currentToken}`);
  }
  getActivities(){
    return this.http.get<ListResponseType>(`${constants.base_URL}activities.json?auth=${this.currentToken}`);
  }
  getClients(){
    return this.http.get<ClientType>(`${constants.base_URL}clients.json?auth=${this.currentToken}`)
  }
  getClient(id: string){
    return this.http.get<ClientType>(`${constants.base_URL}clients/${id}.json?auth=${this.currentToken}`)
  }
  getCars(id: string){

    return this.http.get(`${constants.base_URL}clients/${id}/cars.json?auth=${this.currentToken}`);
  }
  deletePart(partId: string){
    return this.http.delete(`${constants.base_URL}parts/${partId}.json?auth=${this.currentToken}`);
  }
  deleteActivity(partId: string){
    return this.http.delete(`${constants.base_URL}activities/${partId}.json?auth=${this.currentToken}`);
  }
  deleteCar(id: string, plate: string){
    let cars: any = []
    return this.http.get(`${constants.base_URL}clients/${id}/cars.json?auth=${this.currentToken}`)
    .pipe(tap((res) => {
        cars = res;
        let index = -1;
        for (const car of cars) {
          if (car.rego === plate){
            index = cars.indexOf(car);
            cars.splice(index,1);
            break;
          }
        }
        return this.http.put(`${constants.base_URL}clients/${id}/cars.json?auth=${this.currentToken}`, cars).subscribe(() => {
        })
        
      }));

  }
}

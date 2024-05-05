import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClientType } from 'src/types/api-res-types';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  isLoading: boolean = false;
  showMore: boolean = false;
  addCar: boolean = false;
  clientId: string = '';
  clientToEdit: string = '';
  toggledIds: Array<string> = [];
  clientList: [ClientType] = [{
    'name': 'noName',
    'phone': 'phone',
    'cars': [{
      'CB4444BB': {
        'make': 'empty',
        'model': 'empty'
      }
    }]
  }];
  constructor (private api: ApiService, private router: Router){}
  ngOnInit(): void {
    this.isLoading = true
    this.api.getClients().subscribe({
      next: (res) => {
        this.isLoading = false;
        this.clientList = [{
          'name': 'noName',
          'phone': 'phone',
          'cars': [{
            'CB4444BB': {
              'make': 'empty',
              'model': 'empty'
            }
          }]
        }];
        this.clientList.pop();
        if (res != null){
          let entries = Object.entries(res);
          for (const entry of entries) {
            entry[1]['_id'] = entry[0];
            this.clientList.push(entry[1])
          }
        }
        else {
          alert('Все още няма въведени клиенти')
        }
      },
      error: err => {
        if (err.status == 401){
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return alert('Моля влезте отново');
        }
        
        alert(err.message)
      }      
    })
  }
  addClient(form: NgForm){
    const { clientName, phone, make, model, vin, rego } = form.value;
    this.api.addClient(clientName, phone, make, model, vin, rego).subscribe({
      next: () => {
        form.reset();
        this.ngOnInit()
      },
      error: err => {
        if (err.status == 401){
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return alert('Моля влезте отново');
        }
        
        alert(err.message)
      }
    })
  }
  onToggle(id: string | undefined){
    if (id == undefined){
      return alert('Нещо много се счупи - обади се на Владо')
    }
    this.showMore = !this.showMore;
    if (!this.showMore){
      if (this.toggledIds.includes(id)){
        let index = this.toggledIds.indexOf(id);
        this.toggledIds.splice(index,1);
        this.showMore = true;
      }
      else {
        this.showMore = true;
        this.toggledIds.push(id!);
      }
    }
    else {
      this.toggledIds.push(id!);
    }
  }
  carToggle(clientId: string){
    this.addCar=!this.addCar;
    this.clientId = clientId
  }
  onAddCar(form: NgForm){
    let { make, model, vin, rego } = form.value;
    this.api.addCar(this.clientId, make, model, vin, rego).subscribe({
      next: (res) =>{
        console.log('response from component: ',res);
        form.reset();
        this.carToggle('hide form');
        setTimeout(() =>{this.ngOnInit()},1000);
      },
      error: err => {
        if (err.status == 401){
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return alert('Моля влезте отново');
        }
        
        alert(err.message)

      }
    })
  }
  onDelete(id: string, rego: string){
    return this.api.deleteCar(id, rego).subscribe({
      next: () => {
        setTimeout(() =>{this.ngOnInit()},1000);
      },
      error: err => {
        if (err.status == 401){
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return alert('Моля влезте отново');
        }
        
        alert(err.message)

      }
    })
  }
  onEdit(id: string){
    this.clientToEdit = id;
    this.router.navigate([`/dimoff/edit/${id}`]);
  }
}

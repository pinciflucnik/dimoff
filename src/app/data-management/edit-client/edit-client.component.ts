import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ClientType } from 'src/types/api-res-types';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  id: string = this.activatedRoute.snapshot.params['id'];
  client: ClientType = {
    'name': '',
    'phone': '',
    'cars' : [],
    '_id': this.id
 }
  editForm: FormGroup = new FormGroup ({});
  clientName= new FormControl ('', Validators.required)
  phone= new FormControl ('', Validators.required)
  
  constructor (private api: ApiService, private activatedRoute : ActivatedRoute, private router: Router){
    this.api.getClient(this.id).subscribe({
      next: (res) => {
        this.client = res;
        this.clientName.setValue(this.client!.name);
        this.phone.setValue(this.client!.phone);
        
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
  };
  onEdit(){
      this.client.name = this.clientName.value;
      this.client.phone = this.phone.value;
      this.api.editClient(this.id, this.client).subscribe({
        next: (res) => {
          this.router.navigate(['/dimoff/clients-list'])
          
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
}

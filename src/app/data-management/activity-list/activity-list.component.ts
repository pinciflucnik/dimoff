import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
import { ListType } from 'src/types/api-res-types';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  isLoading: boolean = false;
  list: [ListType] = [{'id': '', 'name': ''}]
  constructor(private api: ApiService, private router: Router){}
  ngOnInit(): void {
    this.isLoading = true;
    this.api.getActivities().subscribe({
      next: (res) => {
        this.list = [{'id': '', 'name': ''}];
        let entries = Object.entries(res);
        this.list.pop();
        for (const entry of entries) {
          this.list?.push({'id': entry[0], 'name': entry[1].name})
        }
        this.isLoading = false;
        
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
  newActivity(form: NgForm){
    const { partName } = form.value;
    let activitiesList = [];
    for (const item of this.list) {
      activitiesList.push(item.name);
    }
    if(activitiesList.includes(partName)){
      alert(`${partName} вече е въведен!`);
      form.reset();
      return;
    }

    return this.api.addActivity(partName).subscribe({
      next: (res) => {
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
  onDelete(id: string){
    return this.api.deleteActivity(id).subscribe({
      next: (res) => {
        this.ngOnInit()
      },
      error: err => {
        if (err.status == 401){
          sessionStorage.clear();
          this.router.navigate(['/login']);
          return alert('Моля влезте отново');
        }

        alert(err.message);
      }
    })
  }
}

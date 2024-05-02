import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ListType } from 'src/types/api-res-types';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  isLoading: boolean = false;
  list: [ListType] = [{'id': '', 'name': ''}]
  constructor(private api: ApiService){}
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
        alert(err.message)
      }
    })
  }
  newActivity(form: NgForm){
    const { partName } = form.value;
    return this.api.addActivity(partName).subscribe({
      next: (res) => {
        form.reset();
        this.ngOnInit()
      },
      error: err => {
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
        alert(err.message);
      }
    })
  }
}

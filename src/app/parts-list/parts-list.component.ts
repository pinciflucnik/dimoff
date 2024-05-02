import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartsListType } from 'src/types/api-res-types';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit {
  isLoading: boolean = false
  list: [PartsListType] = [{'id': '', 'name': ''}]
  constructor(private api: ApiService){}
  ngOnInit(): void {
    this.isLoading = true;
    this.api.getParts().subscribe({
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
  newPart(form: NgForm){
    const { partName } = form.value;
    return this.api.addPart(partName).subscribe({
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
    return this.api.deletePart(id).subscribe({
      next: (res) => {
        this.ngOnInit()
      },
      error: err => {
        alert(err.message);
      }
    })
  }
}

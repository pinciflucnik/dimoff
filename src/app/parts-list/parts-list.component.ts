import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PartsListResponseType, PartsListType } from 'src/types/api-res-types';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit {
  list: [PartsListType] = [{'id': '', 'name': ''}]
  constructor(private api: ApiService){}
  ngOnInit(): void {
    this.api.getParts().subscribe({
      next: (res) => {
        let entries = Object.entries(res);
        this.list.pop();
        for (const entry of entries) {
          this.list?.push({'id': entry[0], 'name': entry[1].name})
        }
        console.log(this.list);
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
        form.value.partName = '';
        this.ngOnInit()
      },
      error: err => {
        alert(err.message)
      }
    })
  }
  onDelete(id: string){
    id = '';
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { PartsListComponent } from './parts-list/parts-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ActivityListComponent } from './activity-list/activity-list.component';



@NgModule({
  declarations: [
    MainComponent,
    PartsListComponent,
    ActivityListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    MainComponent,
    PartsListComponent,
    ActivityListComponent
  ]
})
export class DataManagementModule { }

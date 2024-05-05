import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { PartsListComponent } from './parts-list/parts-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ClientsComponent } from './clients/clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';



@NgModule({
  declarations: [
    MainComponent,
    PartsListComponent,
    ActivityListComponent,
    ClientsComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainComponent,
    PartsListComponent,
    ActivityListComponent
  ]
})
export class DataManagementModule { }

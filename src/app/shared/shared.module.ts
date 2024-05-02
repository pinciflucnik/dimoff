import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    LoaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user-management/register/register.component';
import { LoginComponent } from './user-management/login/login.component';
import { UserManagementModule } from './user-management/user-management/user-management.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { DataManagementModule } from './data-management/data-management.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserManagementModule,
    FormsModule,
    HttpClientModule,
    DataManagementModule
    
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

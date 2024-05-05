import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './data-management/main/main.component';
import { loggedInGuard } from './logged-in.guard';
import { notLoggedInGuard } from './not-logged-in.guard';
import { PartsListComponent } from './data-management/parts-list/parts-list.component';
import { LoginComponent } from './user-management/login/login.component';
import { RegisterComponent } from './user-management/register/register.component';
import { ActivityListComponent } from './data-management/activity-list/activity-list.component';
import { ClientsComponent } from './data-management/clients/clients.component';
import { EditClientComponent } from './data-management/edit-client/edit-client.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent, canActivate: [loggedInGuard]},
  {path: 'main', component: MainComponent, canActivate: [notLoggedInGuard]},
  {path: 'dimoff/parts-list', component: PartsListComponent, canActivate: [notLoggedInGuard]},
  {path: 'dimoff/activities-list', component: ActivityListComponent, canActivate: [notLoggedInGuard]},
  {path: 'dimoff/clients-list', component: ClientsComponent, canActivate: [notLoggedInGuard]},
  {path: 'dimoff/edit/:id', component: EditClientComponent, canActivate: [notLoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

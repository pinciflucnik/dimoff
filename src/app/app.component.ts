import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'autoserviceHelper';
  isLogged : boolean = false
  constructor(private userService: UserService, private router: Router){
    this.isLogged = !!!this.userService.getProfile()
  }
}

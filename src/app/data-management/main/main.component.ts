import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isLogged: boolean = false;
  constructor (private userAuth: UserService){
    if (this.userAuth.getProfile()) {
      this.isLogged = true;
    }
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private router: Router, private userService: UserService){}
  onLogin(form: NgForm){
    const { email, pass} = form.value;
    return this.userService.login(email, pass).subscribe({
      next: (res) => {
        this.router.navigate([''])
      },
      error: err => {
        alert(err.message)
      }
      
    })
  }
}

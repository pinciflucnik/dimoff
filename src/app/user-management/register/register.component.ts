import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor ( private router: Router, private userService: UserService){}
  onRegister(form: NgForm){
    const {email, pass, rePass} = form.value;
    if (rePass !== pass){
      return;
    }
    return this.userService.register(email, pass).subscribe({
      next: (res) => {
        this.router.navigate([''])
      },
      error: err => {
        alert(err.message)
      }
    })
  }
}

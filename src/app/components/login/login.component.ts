import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string
  password:string

  constructor(
    private authService:AuthService, 
    private flashMessages:FlashMessagesService,
    private route:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.authService.login(this.email, this.password)
    .then(auth => {
      if(auth){ //si auth n'est pas null veut dire qu'il est authentifié
        this.flashMessages.show('You are logged successfully', {
          cssClass:'alert-success', timeout: 5000
        })
          this.route.navigate(['/']);
      }
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass:'alert-danger', timeout: 10000
      })
    })
  }

  onLoginWithGoogle(){
    this.authService.loginWithGoogle()
    .then(auth => {
      if(auth){ //si auth n'est pas null veut dire qu'il est authentifié
        this.flashMessages.show('You are logged successfully', {
          cssClass:'alert-success', timeout: 5000
        })
          this.route.navigate(['/']);
      }
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass:'alert-danger', timeout: 10000
      })
    })
  }
}

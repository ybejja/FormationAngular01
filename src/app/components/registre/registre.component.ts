import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  email:string;
  password:string;

  constructor(private authClient:AuthService, private route:Router, private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
  }


  onRegister(){

    this.authClient.register(this.email, this.password)
    .then(register => {
      this.flashMessages.show('You are register successfully', {
        cssClass:'alert-success', timeout: 5000
      })
      this.route.navigate(['/'])
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass:'alert-danger', timeout: 5000
      })
    })
  }
}

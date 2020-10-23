import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client:Client = {

    firstname:"",
    email:"",
    lastname : "",
    phone : null,
    balance: null,
    useId:''
  }
  constructor(private serviceClient:ClientService, 
              private authService:AuthService,
              private route:Router, 
              private flashMessages : FlashMessagesService,) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(userConnected => {
      this.client.useId = userConnected.uid;
    })
  }

  onSubmit() {
    console.log(this.client);
    this.serviceClient.NewClient(this.client);
    this.flashMessages.show("Clent added successfully", {cssClass:'alert alert-primary',timeout:5000})
    this.route.navigate(['/']);
  }

}

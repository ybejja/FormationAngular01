import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client:Client = {

    firstname:"",
    email:"",
    lastname : "",
    phone : null,
    balance: null
  }

  id:string;
  constructor(
    private clientService:ClientService,
    private route:ActivatedRoute,
    private routeNavigate:Router,
    private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.clientService.GetClient(this.id).subscribe(client => {
      this.client = client;
      this.client.id =this.id;
    });
  }

  onSubmit(){
    console.log(this.client)
    this.clientService.UpdateClient(this.client);
    this.flashMessages.show("Client updated", {cssClass:'alert alert-warning', timeout:5000});
    this.routeNavigate.navigate(['/']);
  }

}

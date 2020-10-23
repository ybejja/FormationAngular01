import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {

  id:string
  client:Client = {

    firstname:"",
    email:"",
    lastname : "",
    phone : null,
    balance: null
  }
  showBalance:boolean=false

  constructor(
    private seviceClient:ClientService,
    private route:ActivatedRoute,
    private routeNavigate:Router,
    private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.seviceClient.GetClient(this.id).subscribe(client => {
      console.log(client)
      this.client = client;
      this.client.id =this.id;
    })


  }
  
  onSubmit(){
    this.seviceClient.UpdateClient(this.client);
    this.flashMessages.show("Balance updated", {cssClass:'alert alert-warning',timeout:5000})
  }

  deleteClient(id:string){
    if(confirm('Are you sur to delete'))
    {
      this.seviceClient.DeleteClient(id)
      this.flashMessages.show("client deleted", {cssClass:'alert alert-danger',timeout:5000})
      this.routeNavigate.navigate(['/']);
    }
  }

}

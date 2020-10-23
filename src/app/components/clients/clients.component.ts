import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from 'src/app/models/client';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:Client[]
  results:Client[]
  total : number;
  constructor(
    private clientService:ClientService,
    private routeNavigate:Router,
    private authService:AuthService,
    private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(user => {

      this.clientService.getClient(user.uid).subscribe(clients => {
        this.results = this.clients =  clients;
        this.total = this.getTotal();

      })
    })
    
  }
  
  search(query){

    this.results = (query) ? this.clients.filter(clt => clt.firstname.toLowerCase().includes(query.toLowerCase()) //includes equivalent to like
                                                              || clt.lastname.toLowerCase().includes(query.toLowerCase())
                                                              || clt.email.toLowerCase().includes(query.toLowerCase())
                                                              || clt.phone.toString().includes(query)
                                                              || clt.balance.toString().includes(query)) : this.clients;


  }
  getTotal() : number{

     return this.clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());

    }, 0)
  }

  deleteClient(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.clientService.DeleteClient(id)
        this.flashMessages.show("client deleted", {cssClass:'alert alert-danger',timeout:5000})
        this.routeNavigate.navigate(['/']);
        Swal.fire({
          title: 'Deleted',
          text: 'Client deleted',
          icon: 'success',
          timer:5000
        }
        )
     
      } 
    })
  }

}

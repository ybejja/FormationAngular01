import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean = false;
  userConnected:string;

  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(user => {
      if(user){
        this.isLogged=true;
        this.userConnected = user.email;
      }else{
        this.isLogged = false;
      }
    })
  }


  loginOut(){
    this.authService.logOut();
    this.route.navigate(['/login'])
  }
}

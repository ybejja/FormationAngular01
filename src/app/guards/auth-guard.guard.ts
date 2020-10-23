import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth:AngularFireAuth, private route:Router){}

  canActivate(): Observable<boolean>  {

    return this.afAuth.authState.pipe(map(auth => {
      if(!auth)
      {
        this.route.navigate(['/login']);
        return false;
      }else{
        return true;
      }
    }))

  }
  
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

const url = window.location.href;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public UserService: UserService, public router: Router,public http: HttpClient){}

  canActivate() {
    if(this.UserService.beinglogin()){
      console.log('Guard Ok!')
      return true;
    }else{
      console.log('Blocked by Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }

}

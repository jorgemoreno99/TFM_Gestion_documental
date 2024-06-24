import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {

  constructor( public router: Router, public userService: UserService){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.userService.getIsSupervisor(this.userService.getData().user).subscribe((isSupervisor)=>{
      if(!isSupervisor){
        Swal.fire({
          title: 'Access Denied',
          text: "Sorry, you don't have permission to access this resource.",
          icon: 'error',
          showCloseButton: true
        });
        this.router.navigate(['/'])
      }
    });
    return  this.userService.getIsSupervisor(this.userService.getData().user)
  }
}

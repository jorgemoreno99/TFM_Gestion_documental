import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isSupervisor : boolean = false;
  email: string = "" ;

  constructor(
    public router: Router,
    public userService: UserService,
  ) {}

  ngOnInit(): void {
    this.email = this.userService.getData().user
    if(!this.email) this.logout()

    this.userService.getIsSupervisor(this.email).subscribe((response : any)=>{
      this.isSupervisor = response
      this.userService.saveSupervisor(this.isSupervisor)
  })

  }

  adminButtonHandler(){
    this.router.navigate(['/admin'])
  }
  
  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }
}

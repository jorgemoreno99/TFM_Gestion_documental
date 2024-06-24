import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(
    public router: Router,
    public userService: UserService,
  ) {}

  allUsers : any[] = []
  dataSource : any;

  ngOnInit(): void {
    this.loadInfo()
  }
  
  async loadInfo(){
    Swal.showLoading()
    this.userService.getUsers().subscribe((response: any) => {
      this.allUsers = response.data;
      console.log(this.allUsers); 
      this.dataSource = new MatTableDataSource<any>(this.allUsers);
      Swal.close()
    });
  }

  changeHandler(event : any, row:any){
    let idProfile = row.idProfile
      this.userService.setSupervisor(idProfile, event.checked).subscribe((response: any) => {
        Swal.showLoading()
        Swal.fire({
          title: 'Success!',
          text: event.checked? 'Supervisor added successfully': 'Supervisor removed successfully',
          icon: 'success',
          showConfirmButton: true
        }).then(()=>this.loadInfo())
        
      }, (error:any) =>{
        console.log(error);
        Swal.showLoading()
        Swal.fire({
          title: 'Error',
          text: "Error updating profile",
          icon: 'error',
          showConfirmButton: true
        }).then(()=>this.loadInfo())

      });
  }



}

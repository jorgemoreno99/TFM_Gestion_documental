import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {ActivityService} from '../../../services/activity/activity.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { IActivityDTO } from '../../../services/activity/activity.domain';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})

export class HomeComponent implements OnInit {

  loaded = false;
  IAmSupervisor = false

  pendingActivities: IActivityDTO[] = [];
  submittedActivities:IActivityDTO[] = [];
  myActivities:IActivityDTO[] = []; //Only for supervisors
  allActivities:IActivityDTO[] = []; //Only for supervisors

  dataSourcePending: any;
  dataSourceSubmitted: any;
  dataSourcemyActivities: any; //Only for supervisors
  dataSourceAllActivities: any; //Only for supervisors

  displayedColumns = ["subject", "description", "due_date", "creator", "reviewed"];
  filterValue: string = '';

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.IAmSupervisor = this.userService.getData().isSupervisor
    if(this.IAmSupervisor) this.loadInfoSupervisor()
    else this.loadInfoUser();
  }
  
  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }


  async loadInfoUser() {
    forkJoin({
      responsePending: this.activityService.getPendingActivities(),
      responseSubmitted: this.activityService.getSubmittedActivities(),
    }).subscribe(
      (r: any) => {
        console.log(r);
        this.pendingActivities = r.responsePending.data
        this.submittedActivities = r.responseSubmitted.data
        this.pendingActivities.forEach((a : any) => {
          a['creator'] = a.idCreator_supervisor?.idProfile_profile?.name ?? a.idCreator_supervisor?.idProfile_profile?.email
          a['reviewed'] = ""
        });
        this.submittedActivities.forEach((a : any) => {
          a['creator'] = a.idCreator_supervisor?.idProfile_profile?.name ?? a.idCreator_supervisor?.idProfile_profile?.email
          a['reviewed'] = this.isReviewed(a) ? "✓" : ""
        });
        this.dataSourcePending = new MatTableDataSource<any>(this.pendingActivities);
        this.dataSourceSubmitted = new MatTableDataSource<any>(this.submittedActivities);

        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    )

  }

  async loadInfoSupervisor() {
    forkJoin({
      responseMyActivities: this.activityService.getByCreator(),
      responseAllActivities: this.activityService.getAll(),
    }).subscribe(
      (r: any) => {
        console.log(r);
        this.myActivities =  r.responseMyActivities.data
        this.allActivities = r.responseAllActivities.data
        this.myActivities.concat(this.allActivities).forEach((a : any) => {
          a['creator'] = a.idCreator_supervisor?.idProfile_profile?.name ?? a.idCreator_supervisor?.idProfile_profile?.email
        });
        this.dataSourcemyActivities = new MatTableDataSource<any>(this.myActivities);
        this.dataSourceAllActivities = new MatTableDataSource<any>(this.allActivities);

        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    )

  }

  isReviewed(a : IActivityDTO){
    let res = false;
    if(a.contributions?.length){
      let myContribution = a.contributions.find(c => c.idProfile_profile.email == this.userService.getData().user)
      if(myContribution != undefined && myContribution.approvals.length > 0 ) res = true
    }
    return res

  }


  createHandler() {
    this.router.navigate(['/newActivity']);
  }
  

  clearFilter() {
    this.dataSourcePending = new MatTableDataSource<any>(this.pendingActivities);
    this.dataSourceSubmitted = new MatTableDataSource<any>(this.submittedActivities);
    this.filterValue = "";
  }

  goToDetails(row: any) {
    this.router.navigate(['/details', row.idactivity]);
  }

  getLabel(str : string){
    str = str.replace("_", " ")        
    return str.charAt(0).toUpperCase() + str.slice(1)
  }


  filter(): void {
    // if (this.role == 'Admin' || this.role == 'Supervisor') { // en el caso de que sea admin o supervisor:
    //   let filteredEquipments = this.allActivities.filter((equipment: {
    //     manufacturer: any; keepCalibrated: any; bu: any; location: any; group: any;
    //     denomination: string; code: string; oldCode: string; owner: string; reference: string; serialNumber: string;
    //     pic: string;
    //   }) => {
    //     let searchTerms = this.filterValue.toLowerCase().split(" ");
    //     let termFound = [];

    //     for (let i = 0; i < searchTerms.length; i++) {
    //       let term = searchTerms[i];

    //       let found = equipment?.code?.toLowerCase()?.includes(term) ||
    //         equipment?.oldCode?.toLowerCase()?.includes(term) ||
    //         equipment?.owner?.toLowerCase()?.includes(term) ||
    //         equipment?.reference?.toLowerCase()?.includes(term) ||
    //         equipment?.serialNumber?.toLowerCase()?.includes(term) ||
    //         equipment?.denomination?.toLowerCase()?.includes(term) ||
    //         equipment?.group?.name.toLowerCase()?.includes(term) ||
    //         equipment?.location?.name.toLowerCase()?.includes(term) ||
    //         equipment?.bu?.name.toLowerCase()?.includes(term) ||
    //         equipment?.keepCalibrated?.name.toLowerCase()?.includes(term) ||
    //         equipment?.pic?.toLowerCase()?.includes(term) ||
    //         equipment?.manufacturer?.name.toLowerCase()?.includes(term);
    //       termFound.push(found);
    //     }

    //     let allTermsFound = termFound.every(found => found);

    //     return allTermsFound
    //   });

    //   this.dataSource = new MatTableDataSource<any>(filteredEquipments);
    // }
  }

exportGoogleSheet() {

    Swal.fire({
        title: 'Generating Export<br>Please wait...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

  }
}

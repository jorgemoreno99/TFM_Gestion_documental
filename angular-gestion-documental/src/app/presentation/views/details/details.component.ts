import { IContributionDTO } from './../../../services/contribution/contribution.domain';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../../services/activity/activity.service';
import { IActivityDTO } from '../../../services/activity/activity.domain';
import { MatCardModule } from '@angular/material/card';
import { forkJoin } from 'rxjs';
import { ContributionService } from '../../../services/contribution/contribution.service';
import { MatDialog } from '@angular/material/dialog';
import { NewContributionDialogComponent } from './new-contribution-dialog/new-contribution-dialog.component';
import { IFileDTO } from '../../../services/file/file.domain';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ContributionDetailsDialogComponent } from './contribution-details-dialog/contribution-details-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private userService: UserService,
    private contributionService: ContributionService,
    public dialog: MatDialog,

    // public UserService: UserService,
    // private datePipe: DatePipe,
  ) { }
  IAmSupervisor = false;
  submitted = false;
  activity! : IActivityDTO;
  files : IFileDTO[] = []
  loaded = false;
  dataSourceContributions : any;

  ngOnInit(): void {
    this.IAmSupervisor = this.userService.getData().isSupervisor
    this.loadInfo();
  }


  loadInfo() {
    this.loaded = false;
    let id = this.route.snapshot.paramMap.get('id')
    this.files = [];
    forkJoin({
      responseActivity: this.IAmSupervisor ? this.activityService.getForSupervisor(id) : this.activityService.get(id),
      responseFiles: this.activityService.getFiles(id??""),
    }).subscribe(
      (r: any) => {
        console.log(r);
        this.activity = r.responseActivity.data
        this.activity.creator = r.responseActivity.data.idCreator_supervisor?.idProfile_profile.email
        r.responseFiles.forEach((f : any) => {
          this.files.push({publid_id : f.public_id, url: f.url, name : f.public_id.split('/').slice(-1)})
        });
        this.dataSourceContributions = new MatTableDataSource(this.activity.contributions)
        this.submitted = !this.IAmSupervisor && this.activity.contributions.length > 0
        this.loaded = true;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  createContribution(){
    let body : IContributionDTO = {
      idActivity: this.activity.idactivity,
      comment : "comment"
    }
    this.contributionService.create(body).subscribe(response=>{
      console.log(response);
    })
  }

  createContributionHandler(){
    const dialogRef = this.dialog.open(NewContributionDialogComponent, {
      disableClose: true,
      width: '70%',
      data:{
        activity: this.activity
      }
    });
    dialogRef.afterClosed().subscribe((changed) => {
        if(changed)this.loadInfo()
    })
  }

  isApproved(cont : any){
    return cont.approvals?.some((approval:any)=> approval.idSupervisor_supervisor.idProfile_profile.email == this.userService.getData().user )
  }

  getContributionsDetailsDialog(cont : IContributionDTO){
    console.log(cont.idcontribution);
    const dialogRef = this.dialog.open(ContributionDetailsDialogComponent, {
      disableClose: true,
      width: '70%',
      data:{
        contribution: cont,
        activityCreator : this.activity.creator
      }
    });
    dialogRef.afterClosed().subscribe((changed) => {
      if(changed)this.loadInfo()
  })
  }



  
  

}

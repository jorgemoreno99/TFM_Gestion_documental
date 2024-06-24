import { Component, Inject, OnInit } from '@angular/core';
import { IContributionDTO } from '../../../../services/contribution/contribution.domain';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContributionService } from '../../../../services/contribution/contribution.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/user.service';
import { ApprovalService } from '../../../../services/approvals/approval.service';

@Component({
  selector: 'app-contribution-details-dialog',
  templateUrl: './contribution-details-dialog.component.html',
  styleUrl: './contribution-details-dialog.component.scss'
})
export class ContributionDetailsDialogComponent implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ContributionDetailsDialogComponent>,
    private contributionService: ContributionService,
    private approvalService: ApprovalService,
    private fb: FormBuilder,
    private userService: UserService,

  ) { }
  IAmSupervisor = false;
  ICanApprove = false;
  contribution!: any;
  files : any = []
  form = this.fb.group({
    reviewed: [false],
    approved: [false],
    grade: [null],
    comment: [""],
  });
  myReview : any = undefined;
  tooltipDeleteMsg = "Delete"


  ngOnInit(): void {
    Swal.showLoading()
    this.IAmSupervisor = this.userService.getData().isSupervisor
    this.contribution = this.data.contribution
    this.ICanApprove = this.IAmSupervisor && this.userService.getData().user == this.data.activityCreator
    console.log(this.contribution);



    if(this.IAmSupervisor){
      this.myReview =this.contribution.approvals?.find((approval:any)=> approval.idSupervisor_supervisor.idProfile_profile.email == this.userService.getData().user )
      console.log(this.myReview);
      if (this.myReview) {
        this.form.patchValue({
          reviewed: true, 
          approved: this.myReview.approved,
          grade:  this.myReview.grade ,
          comment:  this.myReview.comment
        });
        this.form.get('reviewed')?.disable();
      }
      
    }else if(!this.IAmSupervisor && this.contribution.approvals.length > 0) {
      let review = this.contribution.approvals[0]
      this.form.patchValue({
        reviewed: true, 
        approved: review.approved,
        grade:  review.grade ,
        comment:  review.comment
      });
      this.form.disable()
      this.tooltipDeleteMsg = "You can not delete reviewed contributions"
    }

    this.contributionService.getFiles(this.contribution.idcontribution?.toString()).subscribe((response : any)=>{
      response.forEach((f : any) => {
        this.files.push({publid_id : f.public_id, url: f.url, name : f.public_id.split('/').slice(-1)})
      });
      Swal.close()
    })

  }
  closeDialog() {
    this.dialogRef.close(false); 
  }

  getHeader(){
    let str ;
    if(this.contribution.idProfile_profile?.name){
      str = this.contribution.idProfile_profile.name + "'s Contribution"
    }else if(this.contribution.idProfile_profile?.email){
      str = "Contribution: "+ this.contribution.idProfile_profile.email
    }else{
      str = "Contribution"
    }
    return str;
  }


  send() {  

    Swal.showLoading();
    let body: any = this.form.value
    body['idContribution'] = this.contribution.idcontribution
    body['reviewed'] = true
    this.approvalService.create(body).subscribe(response=>{
      console.log(response);
      Swal.fire({
        title: 'Success!',
        text: 'Contribution added successfully!',
        icon: 'success',
        timer: 2300,
        confirmButtonColor: '#556add',
        customClass: {
          popup: 'swal-popup-success'
        }
      });
      this.dialogRef.close(true);
    })
  }

  deleteContribution(){
    console.log("delete");
    this.contributionService.delete(this.contribution.idcontribution?.toString()).subscribe((response : any)=>{
      Swal.fire({
        title: 'Success!',
        text: 'Contribution deleted successfully!',
        icon: 'success',
        timer: 3300,
        confirmButtonColor: '#556add',
        customClass: {
          popup: 'swal-popup-success'
        }
      });
      this.dialogRef.close(true);
    })
    
  }


}

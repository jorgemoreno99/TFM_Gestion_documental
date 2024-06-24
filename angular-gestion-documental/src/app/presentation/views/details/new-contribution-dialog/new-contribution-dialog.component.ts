import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContributionService } from '../../../../services/contribution/contribution.service';
import Swal from 'sweetalert2';
import { IContributionDTO } from '../../../../services/contribution/contribution.domain';
import { FormBuilder, Validators } from '@angular/forms';
import { IActivityDTO } from '../../../../services/activity/activity.domain';

@Component({
  selector: 'app-new-contribution-dialog',
  templateUrl: './new-contribution-dialog.component.html',
  styleUrl: './new-contribution-dialog.component.scss'
})
export class NewContributionDialogComponent implements OnInit  {

  activity! : IActivityDTO
  filesToUpload: any[] = [];
  form = this.fb.group({
    comment: [''],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewContributionDialogComponent>,
    private contributionService: ContributionService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activity = this.data.activity
  }


  closeDialog() {
    this.dialogRef.close(false); 
  }


 //files:
handleFileInput(event: any) {
  this.filesToUpload = [...this.filesToUpload, ...event.target.files];
}

removeFiles(file: any) {
  if (file) {
    const index = this.filesToUpload.indexOf(file, 0);
    if (index > -1) {
      this.filesToUpload.splice(index, 1);
    }
  } else this.filesToUpload = [];
}

createContribution() {  

  Swal.showLoading();
  let body: any = this.form.value
  body['idActivity'] = this.activity.idactivity
  this.contributionService.create(body).subscribe(async (response: any) => {
    const contributionId = response.idcontribution;
    if (this.filesToUpload && this.filesToUpload.length > 0) {
      await this.uploadFiles(contributionId);
    }

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
  }); 
}

async uploadFiles(contributionId: number){
  const formData = new FormData();
  this.filesToUpload.forEach((file : any)=> formData.append('files', file, file.name));
  this.contributionService.uploadFiles(contributionId.toString(), formData).subscribe(
    response => {
      console.log('Archivos subidos con éxito', response);
    },
    error => {
      console.error('Error al subir los archivos', error);
    });

}


}

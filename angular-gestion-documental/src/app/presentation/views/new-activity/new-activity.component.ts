import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../../../services/activity/activity.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrl: './new-activity.component.scss'
})
export class NewActivityComponent implements OnInit{

  constructor(
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private router : Router
  ) {}

  form!: FormGroup;
  filesToUpload :  any [] = []

  ngOnInit(){
    this.form = this.formBuilder.group({
      subject: [null, [Validators.required, Validators.maxLength(45)]],
      description: [null, [Validators.required, Validators.maxLength(500)]],
      due_date: [null, []],
    })
  }

  createHandler() {
    if (!this.form.valid) {
      Swal.fire({
        title: 'Pay Attention!',
        text: 'You must complete all fields before submitting',
        icon: 'warning',
      })
    } else {
      Swal.fire({
        title: 'Create Activity?',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.isLoading();
          this.activityService.create(this.form.value).subscribe(
            async response => {
              await this.uploadFiles(response.idactivity)
              Swal.fire({
                icon: 'success',
                title: 'Activity Created',
              })
              this.router.navigate(['/home']);
            },
            error => {
              console.log(error);
              
              Swal.fire({
                icon: 'error',
                text: error.error.message,
              })
            });
        }
      });
    }
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

async uploadFiles(idactivity: number){
  const formData = new FormData();
  this.filesToUpload.forEach(file => formData.append('files', file, file.name));
  this.activityService.uploadFiles(idactivity.toString(), formData).subscribe(
    response => {
      console.log('Archivos subidos con éxito', response);
    },
    error => {
      console.error('Error al subir los archivos', error);
    });

}
  

}

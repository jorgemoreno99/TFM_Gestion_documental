import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewActivityComponent } from './new-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: NewActivityComponent },
];

@NgModule({
  declarations: [NewActivityComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatFormFieldModule,
    MatListModule,
    RouterModule.forChild(routes),
    MatDatepickerModule
  ]
})
export class NewActivityModule { }

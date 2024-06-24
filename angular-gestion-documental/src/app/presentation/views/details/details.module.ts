import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DetailsComponent } from './details.component';
import { MatCardModule } from '@angular/material/card';
import { NewContributionDialogComponent } from './new-contribution-dialog/new-contribution-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { ContributionDetailsDialogComponent } from './contribution-details-dialog/contribution-details-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  { path: '', component: DetailsComponent },
];

@NgModule({
  declarations: [DetailsComponent, NewContributionDialogComponent, ContributionDetailsDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatFormFieldModule,
    MatListModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule
  ]
})
export class NewActivityModule { }

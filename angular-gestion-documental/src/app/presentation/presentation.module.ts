import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutsModule } from "./layouts/layouts.module";
import { RoutingModule } from "./routing/routing.module";
import {  MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  imports: [
      CommonModule,
      LayoutsModule,
      RoutingModule,
      MatCardModule,
      MatListModule,
      MatIconModule,
      FormsModule,
      ReactiveFormsModule,
  ],
  exports: [RoutingModule],
  declarations: [
  ],
})
export class PresentationModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../layouts/pages.component';
import { LoginComponent } from '../views/login/login.component';
// import { LoginGuard } from 'src/app/core/auth/login.guard';
import { DetailsComponent } from '../views/details/details.component';
import { RegisterComponent } from '../views/register/register.component';
import { NewActivityComponent } from '../views/new-activity/new-activity.component';
import { LoginGuard } from '../../core/auth/login.guard';
import { SupervisorGuard } from '../../core/auth/supervisor.guard';
// import { AdminGuard } from 'src/app/core/auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '', redirectTo: '/home', pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../views/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'newActivity',
        loadChildren: () => import('../views/new-activity/new-activity.module').then(m => m.NewActivityModule),
        canActivate: [SupervisorGuard],
      },
      {
        path: 'details/:id',
        loadChildren: () => import('../views/details/details.module').then(m => m.NewActivityModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../views/admin/admin.module').then(m => m.AdminModule),
        canActivate: [SupervisorGuard],
      },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/views/contact/contact.component';
import { WelcomeComponent } from './components/views/welcome/welcome.component';
import { CurriculumComponent } from './components/views/curriculum/curriculum.component';


const routes: Routes = [
  {
    path:'', component: WelcomeComponent
  },
  {
    path:'formulario', component: ContactComponent
  },
  {
    path:'curriculum-vitae', component: CurriculumComponent
  },
  {
    path:'**', component: WelcomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// register.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error = '';


  //todo : register
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
  ) { 
      // redirect to home if already logged in
      // if (this.userService.currentUserValue) { 
      //     this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          email: ['', Validators.required], //TODO: Validator email
          password: ['', Validators.required]
      });


  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.form.invalid) {
          return;
      }


      this.loading = true;
      this.userService.register(this.f['email'].value, this.f['password'].value)
          .pipe(first()).subscribe(
            data => {
                this.userService.saveData(this.f['email'].value, data.token )
                this.router.navigate(['/']);
            },
            error => {
                this.error = error.error.message;
                this.loading = false;
            });
  }
  loginHandler(){
    this.router.navigate(['/login']);
  }

}

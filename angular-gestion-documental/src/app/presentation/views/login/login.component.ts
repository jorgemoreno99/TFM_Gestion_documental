import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
  ) { 
  }

  ngOnInit() {

    this.userService.logout();

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
      this.userService.login(this.f['email'].value, this.f['password'].value)
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
  registerHandler(){
    this.router.navigate(['/register']);
  }
}

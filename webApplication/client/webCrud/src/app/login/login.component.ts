import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hideRequired:boolean = true; 
  loginForm: FormGroup;
  hide = true;
  constructor(private router: Router, private fb: FormBuilder,
     private s_service: UserService, private http: HttpClient,
     private cookieService:CookieService) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  onSubmit() {
    console.log(this.loginForm.value);
    console.log("test");

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const loginData = this.loginForm.value;
      const loginDataStr = JSON.stringify(loginData);
      this.s_service.loginPostValues(loginData).subscribe(
        (data: any) => {
          console.log("successfully login");
          // alert("form submitted");
          console.log(data);
          if (data.status === 1) {
            console.log(JSON.stringify(this.cookieService));
            console.log(this.cookieService.get('sessionId'));
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            alert(data.message);
          }

          this.loginForm.reset();
        },
        (error) => {
          console.log("form not submitted");
          alert("form not submitted");
        },
      );
      // this.http.post('/login', this.loginForm.value).subscribe(
      //   (response) => {
      //     // Handle the response here
      //     console.log(response);
      //   },
      //   (error) => {
      //     // Handle error, e.g., display an error message
      //     console.error(error);
      //   }
      // );
    
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent {
  userform: FormGroup;

  constructor(private formBuilder: FormBuilder, private s_userService: UserService, private http: HttpClient) {
    this.userform = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)], Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      dob: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)], Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[6-9]{1}[0-9]{9}$")],
      gender: ['', [Validators.required,]],
      district: ['', [Validators.required]],
      message: ['', [Validators.required,]],
    })

  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  onSubmit() {
    console.log(this.userform.value);

    if (this.userform.valid) {
      const userData = this.userform.value;
      const userDataStr = JSON.stringify(userData);
      this.s_userService.userPostValues(userDataStr).subscribe(
        (data) => {
          console.log("form submitted");
          alert("form submitted");
          this.userform.reset();
        },
        (error) => {
          console.log("form not submitted");
          alert("form not submitted");
        }
      )
    }
    this.userform.reset();
  }
}


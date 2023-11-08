import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent {
  regForm: FormGroup;
  hide = true;
  districts: string[] = ['Chennai', 'Trichy', 'Madurai', 'Tirunelveli'];

  constructor(private router: Router, private fb: FormBuilder, private s_service: UserService, private http: HttpClient) {

    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gender: ['', Validators.required],
      district: ['', Validators.required],
      comment: ['', Validators.required],
    })
    //console.log(this.regForm.value);
  }
  onSubmit() {
    console.log(this.regForm.value);
    if (this.regForm.valid) {
      console.log(this.regForm.value);
      const userData = this.regForm.value;
      const userDataStr = JSON.stringify(userData);
      this.s_service.regPostValues(userData).subscribe(
        (data: any) => {
          console.log("form submitted");
          console.log(data);
          
          if (data.status === 1) {
            alert(data.message);
          }
          this.regForm.reset();
        },
        (error) => {
          console.log("form not submitted");
          alert("form not submitted");
        }
      )
      this.regForm.reset();
      this.router.navigate(['/login']);
    }
  }
}
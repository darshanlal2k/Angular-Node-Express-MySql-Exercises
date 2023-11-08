import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private s_http: HttpClient) {

  }
  regPostValues(data: any) {
    return this.s_http.post(' http://localhost:3000/registration', data);
  }
  loginPostValues(data: any) {
    return this.s_http.post(' http://localhost:3000/login', data);
  }
  dashboardValues(){
    return this.s_http.get(' http://localhost:3000/dashboard');
  }
}



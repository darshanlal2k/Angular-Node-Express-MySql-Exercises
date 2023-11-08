import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private s_http: HttpClient) { }

  userPostValues(data: any) {
    return this.s_http.post(' http://localhost:3000/registration', data);
  }
}

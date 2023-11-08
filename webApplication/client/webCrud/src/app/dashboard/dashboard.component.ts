import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // standalone: true,
  // imports: [MatTableModule],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Gender', 'Dob','District','Comment','Register Timing'];
  dataSource = ELEMENT_DATA;
  sample: any[] = [];



  constructor(private http: HttpClient, private s_service: UserService, private router: Router) {
    // this.s_service.dashboardValues().subscribe(
    //   (data:any) => {
    //     console.log(data);
    console.log("testiign one");
    //   },
    //   (err) => {
    //     console.log(err);

    //   })
  }
  ngOnInit() {
    console.log("inserting into ngoninit");

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.s_service.dashboardValues().subscribe(

      (data: any) => {
        console.log(data);
        console.log(data.status);
        console.log(data.record);
        console.log("insert data");
        this.sample = data.record;
      },
      (error) => {
        console.log("form not submitted");
        alert("form not submitted");
      },
    )
    console.log("testiign two");
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css']
})
export class StudentcrudComponent {

  studentArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;

  studentName: string = '';
  course: string = '';
  fee: string = '';
  currentStuId = '';

  constructor(private http: HttpClient) {
    this.allStudents();
  }

  allStudents() {
    this.http.get("http://localhost:5000/api/student/")
      .subscribe((results: any) => {
        this.isResultLoaded = true;
        console.log(results.data);
        this.studentArray = results.data;
        console.log(this.studentArray[0].stuname);
      })
  }
  register() {
    let bodyData = {
      "stuname": this.studentName,
      "course": this.course,
      "fee": this.fee,
    };
    this.http.post("http://localhost:5000/api/student/add", bodyData)
      .subscribe((results: any) => {
        console.log(results);
        alert("student registered successfully");
        this.allStudents();
      })
  }
  update(data: any) {
    this.studentName = data.stuname;
    this.course = data.course;
    this.fee = data.fee;
    this.currentStuId = data.id;
  }

  updateRecords() {
    let bodyData = {
      "stuname": this.studentName,
      "course": this.course,
      "fee": this.fee,
    };

    this.http.put("http://localhost:5000/api/student/update" + "/" + this.currentStuId, bodyData)
      .subscribe((results: any) => {
        console.log(results);
        alert("student details updated successfully");
        this.allStudents();
      })
  }
  save() {
    if (this.currentStuId == '') {
      this.register();
    }
    else {
      this.updateRecords();
    }
  }
  setdelete(data: any) {
    this.http.delete("http://localhost:5000/api/student/delete" + "/" + data.id)
    .subscribe((results: any) => {
      console.log(results);
      alert("student deleted successfully");
      this.allStudents();
    })
  }
}

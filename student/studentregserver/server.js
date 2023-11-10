const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const mysql = require('mysql');
server.use(bodyParser.json());
// const cors = require('cors')
const cors = require('cors');
server.use(cors());

// server.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rosemaryschool',
});

db.connect((error) => {
    if (error) {
        console.log("Database not connected");
    }
    else {
        console.log("Database connected");
    }
});



server.get("/api/student", (request, response) => {
    let sql = "SELECT * from student";
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Error connecting to database");

        }
        else {
            response.send({ status: true, data: result });
        }
    });
});

server.post("/api/student/add", (request, response) => {
    let details = {
        stuname: request.body.stuname,
        course: request.body.course,
        fee: request.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            // console.log("student details not inserted");
            response.send({ status: false, message: 'student created failed' });
        }
        else {
            // console.log("student details inserted successfully");
            response.send({ status: true, message: 'student created successfully' });
        }
    });
});

server.get("/api/student/:id", (request, response) => {
    let studentId = request.params.id;
    let sql = "SELECT * from student where id=" + studentId;
    db.query(sql, (error, result) => {
        if (error) {
            console.log("Error connecting to database");
        }
        else {
            response.send({ status: true, data: result });
        }
    })
});

server.put("/api/student/update/:id", (request, response) => {
    let stuname = request.body.stuname;
    let course = request.body.course;
    let fee = request.body.fee;
    let id = request.params.id;
    let sql = "UPDATE student SET stuname='" + stuname + "', course='" + course + "', fee='" + fee + "' WHERE id=" + id;

    let update = db.query(sql, (error, result) => {
        if (error) {
            response.send({ status: true, message: "student updated failed" });
        }
        else {
            response.send({ status: true, message: "student updated successfully" });
        }
    });
});

server.delete("/api/student/delete/:id", (request, response) => {
    let sql = "DELETE from student WHERE id=" + request.params.id + "";
    let query = db.query(sql, (error, result) => {
        if (error) {
            response.send({ status: true, message: "student deleted failed" });
        }
        else {
            response.send({ status: true, message: "student deleted successfully" });
        }
    });
});

server.listen(5000, (error) => {
    if (error) {
        console.log("port error");
    }
    else {
        console.log("port started");
    }
});
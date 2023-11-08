console.log("darshan lal");
const { connect } = require('http2');
let mysql = require('mysql');

let connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud'
});

connection.connect(function (err) {

    if (err) {
        return console.log("unable to connect database" + err.message);
    } else {
        console.log("databse connected successfully");
    }

    // connection.query("select * from students", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    // });

});

// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
module.exports = connection;
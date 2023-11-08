var connection = require('./db');

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Set up session middleware with cookie store
app.use(
	session({
		secret: 'abc1234', // Change this to a secure secret
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 3600000, // Session expiration time in milliseconds (1 hour in this example)
			path: '/'
		},
	})
);

// Middleware to log session and cookies data
app.use((req, res, next) => {
	console.log('Session Data:');
	console.log(req.session);

	console.log('Cookies:');
	console.log(req.cookies);
	res.cookie('sessionId', '12345',
			 	{ maxAge: 900000, 
				httpOnly: false,
				path: '/', 
				domain: 'localhost' 
			 });
	next();
});

// app.post('/', (req, res) => {
// 	req.session.user.name = 'john_doe';
// 	req.session.email = 'john@example.com';

// 	// Set a cookie
// 	//res.cookie('sampleCookie', 'cookieValue', { maxAge: 3600000 }); // Cookie expires in 1 hour

// 	//res.send("normal slash");
// });

// Handle the POST request to receive data from both cookies and session
// app.post('/post-data', (req, res) => {
// 	console.log("inside post data");
// 	console.log(req.session.username + "username");
// 	console.log(req.session.email);
// 	// Access data from the session
// 	const sessionData = req.session;

// 	// Access data from the cookies
// 	const sampleCookie = req.cookies.sampleCookie;

// 	// Access data from the POST request body
// 	const postData = req.body.postData;

// 	res.send(`
// 	  Session Data: ${JSON.stringify(sessionData)}<br>
// 	  Sample Cookie Value: ${sampleCookie}<br>
// 	  Posted Data: ${postData}
// 	`);
// });


app.post('/registration', (req, res) => {
	const dataReceived = req.body;
	console.log(dataReceived);
	//const {name,age,dob,email,password,phoneNumber,gender,district,comment } = req.body;
	console.log(req.sessionID);
	console.log(req.cookies);
	console.log("into reg");
	var sql = "insert into registration(name,email,password,gender,dob,district,comment,reg_time) values(?,?,?,?,?,?,?,now())";
	var values = [
		dataReceived.name,
		dataReceived.email,
		dataReceived.password,
		dataReceived.gender,
		dataReceived.dob,
		dataReceived.district,
		dataReceived.comment,
	];
	connection.query(sql, values, (error, results, fields) => {
		if (error) {
			console.error('Error executing query: ' + error);
			return;
		}
		else {
			console.log(results);
			console.log("inside post data");
			// console.log(req.session.user.name + "username");
			// console.log(req.session.email);
			res.status(200).json({ message: "insert succes", status: 1 });


		}
	})
});

app.post('/login', (req, res) => {
	const dataReceived = req.body;
	var sql = "select * from registration WHERE email= '" + dataReceived.email + "'";
	connection.query(sql, (err, result, fields) => {
		if (err) {
			console.error('Error executing query: ' + error);
			return;
		}
		else if ((result[0].email == dataReceived.email) && (result[0].password == dataReceived.password)) {
			console.log(result[0]);
			 req.session.user = result[0];
			 console.log("login"+req.session.user);
			 console.log("login"+req.sessionID);
			 res.cookie('sessionId', '12345',
			 	{ maxAge: 900000, 
				httpOnly: true,
				path: '/', 
				domain: 'localhost' 
			 });
				res.send({ message: "login Successfully", status: 1 });
			 //res.status(200).json({ message: "login Successfully", status: 1 });
		}
		else {
			console.log(result);
			res.status(200).json({ message: "login not Successfully", status: 1 });
		}
	})
})

function requireAuth(req, res, next){
	console.log("auth meth"+req.session);
	console.log("auth"+req.session.user);
	next();
	
}
app.get('/dashboard', requireAuth,(req, res) => {
	console.log('inside dashboard');
	console.log(req.session);
	console.log(req.session.user);
	// console.log(res.json({ user: req.session.user }));
	var sql = "select name,email,gender,dob,district,comment,reg_time from registration";
	connection.query(sql, (err, result, fields) => {

		if (err) {
			console.error('Error executing query: ' + err);
			return;
		}
		else {
			//console.log(req.session.user);
			if (result.length > 0) {
				//console.log(result);
				//console.log(req.session.user);
				// console.log(res.json({ user: req.session.user }));
				res.status(200).json({ message: "dashboard Successfully", status: 1, record: result });
			}

		}
	})
})
// Protected route (dashboard)
// app.get('/dashboard', (req, res) => {
// 	console.log('inside dashboard');
// 	console.log(req.session.user);
// 	//res.send(json({ user: req.session.user }));
// 	// Check if the user is authenticated
// 	if (req.session.user) {
// 		console.log('inside dashboard user');
// 		// User is logged in, send user data
// 		res.json({ user: req.session.user });
// 		res.status(200).json({ message: "dashboard Successfully", status: 1, record: req.session.user });
// 	} else {
// 		res.status(401).json({ message: 'Unauthorized' });
// 	}
// });
app.listen(PORT, (error) => {
	if (!error)
		console.log("Server is Successfully Running,and App is listening on port " + PORT)
	else
		console.log("Error occurred, server can't start", error);
}
);
// });
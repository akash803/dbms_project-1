var http=require('http');
var express=require('express');
var fs=require('fs');
var url = require('url');

var mysql=require('mysql');
var app=express();
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

//MYSQL
var con=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "17pranav29",
  database: "project"
});

var path = require('path');
const { nextTick } = require('process');
let port = 8000;
httpServer = http.Server(app);
console.log(__dirname);
//app.use(express.static(__dirname + '/images'));

app.get('/login1.html', function(req, res) {
  res.sendfile(__dirname + '/login1.html');
}); 

app.post('/login1.html', (req,res) => {
  
  var user, pass, p = '\0';
	console.log("NO ERROR!!");

	user = req.body.username;
	pass = req.body.password;

  console.log(user+" "+pass);

  con.connect(function(err) {

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query("SELECT admin_name,password from admin", function (err, result, fields) {
      if (err) p="\0";
      else{
        console.log(result);
        var size = Object.keys(result).length;
        var i;

        for(i =0 ;i<size;i++){
          console.log(result[i].admin_name+" "+result[i].password);
          if(result[i].admin_name == user){
            p = result[i].password;
            console.log("found");
            break;
          }
        }
        
        if (p == pass) {
          res.sendFile(path.join(__dirname,'login2.html'));
          return console.log("CORRECT!!!");
        }
        else {
          res.sendFile(path.join(__dirname,'login1.html'));
          return console.log("WRONG!!!");
        }
      }
    });
  });
});

app.get('/login2.html', function(req, res) {
  res.sendFile(__dirname + '/login2.html');
});

app.get('/login3.html', function(req, res) {
  res.sendFile(__dirname + '/login3.html');
});

app.post('/login3.html', (req,res) => {
	console.log("NO ERROR!!");

  var title,name,city,state,pincode,phone,email,dob,pancardno;
  title = req.body.employeeetitle;
  name = req.body.employeename;
  city = req.body.city;
  state = req.body.state;
  pincode = req.body.pincode;
  email = req.body.email;
  dob = req.body.dob;
  pancardno = req.body.pancardno;

  con.connect(function(err) {

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query("INSERT INTO employee values ("+title+","+name+","+dob+","+city+","+pincode+","+phone+","+pancardno+","+state+","+email+")", function (err, result, fields) {
      if (err) p="\0";
      else console.log(result);
    });
  });
});

app.get('/login4.html', function(req, res) {
  res.sendFile(__dirname + '/login4.html');
});

app.post('/login4.html', (req,res) => {
	console.log("NO ERROR!!");

  var dept_name = req.body.dept_name;

  con.connect(function(err) {

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query("INSERT INTO dept values ("+dept_name+")", function (err, result, fields) {
      if (err) res.sendFile(path.join(__dirname+'login4.html'));
      else console.log(result);
    });
  });
});

app.get('/login5.html', function(req, res) {
  res.sendFile(__dirname + '/login5.html');
});
app.get('/login6.html', function(req, res) {
  res.sendFile(__dirname + '/login6.html');
});
app.get('/login7.html', function(req, res) {
  res.sendFile(__dirname + '/login7.html');
});

app.post('/login7.html', (req,res) => {
	console.log("NO ERROR!!");
  con.connect(function(err) {

    console.log("connecting to database");
    if(!err) console.log('connected');
    
    var dept_name = req.body.dept_name;

    con.query("", function (err, result, fields) {
      if (err) p="\0";
      else console.log(result);
    });
  });
});

app.listen(port);
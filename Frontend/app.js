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
  res.sendFile(__dirname + '/login1.html');
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

  var title,name,city,state,pincode,phone,email,dob,pancardno,addr;
  title = req.body.employeeetitle;
  name = req.body.employeename;
  city = req.body.city;
  state = req.body.state;
  pincode = req.body.pincode;
  email = req.body.email;
  dob = req.body.DOB;
  //fontend pancardno = req.body.pancardno;
  // frontend addr = req.body.address;
  // frontend phone = req.body.phone;

  con.connect(function(err) {

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query("INSERT INTO employee values ("+title+","+name+","+dob+","+address+","+city+","+state+","+pincode+","+phone+","+pancardno+","+email+")", function (err, result, fields) {
      if (err){
        // what should we do?
      }
      else{
        // again, do what?
        console.log(result);
      }
    });
  });
});

app.get('/login4.html', function(req, res) {
  res.sendFile(__dirname + '/login4.html');
});

app.post('/login4.html', (req,res) => {
	console.log("NO ERROR!!");

  // frontend var dept_name = req.body.dept_name;

  con.connect(function(err) {

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query("INSERT INTO dept values ("+dept_name+")", function (err, result, fields) {
      if (err){
        // do what?
      }
      else{
        // do what?
        console.log(result);
      }
    });
  });
});

app.get('/login5.html', function(req, res) {
  res.sendFile(__dirname + '/login5.html');
});

app.post('/login5.html',(req,res)=>{
  console.log("NO ERROR!!");

  var name = req.body.gradename;
  var shortname = req.body.gradeshortname;
  var basic = req.body.basic;
  var da = req.body.dearnessallowance;
  var ta = req.body.travelallowance;
  var ma = req.body.medicalallowance;
  var hra = req.body.hra;
  var bonus = req.body.bonus;
  var pt = req.body.professionaltax;
  var pf = req.body.providentfund;

  con.connect(function(err){

    console.log("connecting to database");
    if(!err) console.log('connected');
    
    con.query("INSERT INTO grade values ("+name+","+shortname+","+basic+","+ta+","+da+","+hra+","+ma+","+bonus+","+pf+","+pt+")",function(err,result,fields){
      if (err) res.sendFile(path.join(__dirname+'login5.html'));
      else console.log(result);
    });
  });
});

app.get('/login7.html', function(req, res) {
  res.sendFile(__dirname + '/login7.html');
});

app.post('/login7.html',(req,res)=>{
  console.log("NO ERROR!!");

  // frontend var e_id = req.body.e_id;

  con.connect(function(err){

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query();
  });
});

app.get('/login8.html', function(req, res) {
  res.sendFile(__dirname + '/login8.html');
});

app.post('/login8.html',function(req,res){
  console.log("NO ERROR!!");

  // frontend var e_id = req.body.e_id;
  // frontend var d_id = req.body.d_id;
  // frontend var g_id = req.body.g_id;

  con.connect(function(err){

    console.log("connecting to database");
    if(!err) console.log('connected');

    con.query("INSERT INTO emp_grade values ("+e_id+","+d_id+","+g_id+")",function(err,result,fields){
      if (err){
        // do what?
      }
      else{
        // do what?
        console.log(result);
      }
    });
  });
});

app.listen(port);
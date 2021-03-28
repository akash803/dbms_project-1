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
//Remember to add your own data!!!!!!!!!!!!!
var con=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});

con.connect(function(err) {
  console.log("connecting to database");
  if(!err) console.log('connected');
  else console.log('error');
});

var path = require('path');
const { nextTick } = require('process');
let port = 8000;
httpServer = http.Server(app);
console.log(__dirname);
app.use(express.static(__dirname + '/images'));

app.get('/login1.html', function(req, res) {
  res.sendFile(__dirname + '/login1.html');
}); 

app.post('/login1.html', (req,res) => {
  
  var user, pass, p = '\0';
	console.log("NO ERROR!!");

	user = req.body.username;
	pass = req.body.password;

  console.log(user+" "+pass);
  con.query("SELECT admin_name,password from admin;", function (err, result, fields) {
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
  pancardno = req.body.pancardno;
  addr = req.body.address;
  phone = req.body.phone;

  var sql = "INSERT INTO employee(emp_title,emp_name,emp_dob,emp_address,emp_city,emp_state,emp_pincode,emp_mobile_number,emp_pancard_number,emp_mail_id) values ('"+title+"','"+name+"','"+dob+"','"+address+"','"+city+"','"+state+"',"+pincode+",'"+phone+"','"+pancardno+"','"+email+"');"
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err){
      // what should we do?
    }
    else{
      // again, do what?
      res.sendFile(os.join(__dirname,'login3.html'));
      console.log("inserted row");
    }
  });
});

app.get('/login4.html', function(req, res) {
  res.sendFile(__dirname + '/login4.html');
});

app.post('/login4.html', (req,res) => {
	console.log("NO ERROR!!");

  var dept_name = req.body.dept_name;
  console.log(dept_name);

  var sql = "INSERT INTO dept(dept_name) values ('"+dept_name+"');"
  console.log(sql);

  con.query(sql, function (err, result) {
    if (err){
      // do what?
    }
    else{
      // do what?
      console.log("record inserted");
      res.sendFile(path.join(__dirname,'login4.html'));
    }
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
  var bonus = req.body.Bonus;
  var pt = req.body.professionaltax;
  var pf = req.body.providentfund;

  var sql = "INSERT INTO grade(grade_name,grade_short_name,grade_basic,grade_ta,grade_da,grade_hra,grade_ma,grade_bonus,grade_pf,grade_pt) values ('"+name+"','"+shortname+"',"+basic+","+ta+","+da+","+hra+","+ma+","+bonus+","+pf+","+pt+");";
  console.log(sql);
  con.query(sql,function(err,result,fields){
    if (err){
      // do what?
    }
    else{
      res.sendFile(path.join(__dirname,'login5.html'));
      console.log('inserted row');
    }
  });
});

app.get('/login7.html', function(req, res) {
  res.sendFile(__dirname + '/login7.html');
});

app.post('/login7.html',(req,res)=>{
  console.log("NO ERROR!!");

  var e_id = req.body.e_id;
  console.log(e_id);

  var sql1 = "SELECT * FROM dept join (emp_grade join grade on emp_grade.emp_grade_id = grade.grade_id) on emp_grade.emp_dept_id = dept.dept_id where emp_id = "+e_id+";";
});

app.get('/login8.html', function(req, res) {
  res.sendFile(__dirname + '/login8.html');
});

app.post('/login8.html',function(req,res){
  console.log("NO ERROR!!");

  var e_id = req.body.e_id;
  var d_id = req.body.d_id;
  var g_id = req.body.g_id;
  // console.log(e_id);
  // console.log(d_id);
  // console.log(g_id);
  var sql = "INSERT INTO emp_grade values ("+e_id+","+d_id+","+g_id+");"
  console.log(sql);

  con.query(sql,function(err,result,fields){
    if (err){
      // do what?
    }
    else{
      // do what?
      res.sendFile(path.join(__dirname,'login8.html'));
      console.log(result);
    }
  });
});

app.listen(port);
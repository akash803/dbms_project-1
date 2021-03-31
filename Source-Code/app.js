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

app.set('view engine','ejs'); 
app.engine('ejs', require('ejs').__express);     // EJS


//MYSQL
//Remember to add your own data!!!!!!!!!!!!!
var con=mysql.createConnection({
  host: "localhost",
  user: "ZerothKing",
  password: "Sj@19012002",
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

app.get('/login1', function(req, res) {
  res.render('login1', {signupRequest : 'Success'});
}); 

app.post('/login1', (req,res) => {
  
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
        res.render('login2', {signupRequest : 'Success'});
        return console.log("CORRECT!!!");
      }
      else {
        res.render('login1', {signupRequest : 'Error'});
        return console.log("WRONG!!!");
      }
    }
  });
});

app.get('/login2', function(req, res) {
  res.render('login2', {signupRequest : 'Error'});
});
app.get('/login3', function(req, res) {
  res.render('login3', {error : 'None'});
});

app.post('/login3', (req,res) => {
	// console.log("NO ERROR!!");

  var title,name,city,state,pincode,phone,email,dob,pancardno,addr;
  title = req.body.employeetitle;
  name = req.body.employeename;
  city = req.body.city;
  state = req.body.state;
  pincode = req.body.pincode;
  email = req.body.email;
  dob = req.body.DOB;
  pancardno = req.body.pancardno;
  address = req.body.address;
  phone = req.body.phone;

  var sql = "INSERT INTO employee(emp_title,emp_name,emp_dob,emp_address,emp_city,emp_state,emp_pincode,emp_mobile_number,emp_pancard_number,emp_mail_id) values ('"+title+"','"+name+"','"+dob+"','"+address+"','"+city+"','"+state+"',"+pincode+",'"+phone+"','"+pancardno+"','"+email+"');"
  console.log(sql);
  con.query(sql, function (err, result, fields) {
    if (err){
      console.log(err);
      res.render('login3', {error : 'Error'});
    }
    else{
      console.log(fields);
      res.render('login3', {error : 'Done'});
      // console.log("inserted row");
    }
  });
});

app.get('/login4', function(req, res) {
  res.render('login4', {error : 'None'});
});

app.post('/login4', (req,res) => {
	console.log("NO ERROR!!");

  var dept_name = req.body.dept_name;
  console.log(dept_name);

  var sql = "INSERT INTO dept(dept_name) values ('"+dept_name+"');"
  console.log(sql);

  con.query(sql, function (err, result) {
    if (err){
      console.log(err);
      res.render('login4', {error : 'Error'});
    }
    else{
      // do what?
      console.log("record inserted");
      res.render('login4', {error : 'Done'});
    }
  });
});

app.get('/login5', function(req, res) {
  res.render('login5', {error : 'None'});
});

app.post('/login5',(req,res)=>{
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
      res.render('login5', {error : 'Error'});
    }
    else{
      res.render('login5', {error : 'Done'});
      console.log('inserted row');
    }
  });
});

var data = {
    dept_id : 0,
    dept_name : 'NULL',
    emp_id : 0,
    emp_grade_id : 0,
    grade_name : 'NULL',
    grade_short_name : 'NULL',
    grade_basic : 0,
    grade_ta : 0,
    grade_hra : 0,
    grade_ma : 0,
    grade_bonus : 0,
    grade_pf : 0,
    grade_pt : 0
  }

// JSON.stringify(data);
// data = JSON.parse(data);
app.get('/login7', function(req, res) {
  console.log("Get Req");
  res.render('login7',{ data : {dept_id : 0,
    dept_name : 'NULL',
    emp_id : 0,
    emp_grade_id : 0,
    grade_name : 'NULL',
    grade_short_name : 'NULL',
    grade_basic : 0,
    grade_ta : 0,
    grade_hra : 0,
    grade_ma : 0,
    grade_bonus : 0,
    grade_pf : 0,
    grade_pt : 0
}, error : 'None'});
});

app.post('/login7',(req,res)=>{
  console.log("NO ERROR!!");

  var e_id = req.body.e_id;
  console.log(e_id);

  var sql1 = "SELECT * FROM dept join (emp_grade join grade on emp_grade.emp_grade_id = grade.grade_id) on emp_grade.emp_dept_id = dept.dept_id where emp_id = "+e_id+";";

  con.query(sql1,function(err,result,fields){
    // obj = {data : result[0]};
    console.log(result);
    console.log(result[0]);
    if (err){
      res.render('login7', {data : result[0], error : 'Error'});
    }
    else{
      if (result.length == 0) {
          res.render('login7', {data : data, error : 'Dis'});
      }
      else res.render('login7', {data : result[0], error : 'Done'});
    }
  });  

});

app.get('/login8', function(req, res) {
  res.render('login8', {error : 'None'});
});

app.post('/login8',function(req,res){
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
      res.render('login8', {error : 'Error'});
    }
    else{
      res.render('login8', {error : 'Done'});
      console.log(result);
    }
  });
});

app.listen(port);

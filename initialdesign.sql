create database project;
use project;

create table admin(
	admin_id int primary key,
    admin_name varchar(100),
    password varchar(100)
);

create table dept(
	dept_id int primary key auto_increment,
    dept_name varchar(100) unique
);

create table grade(
	grade_id int primary key auto_increment,
    grade_name varchar(100),
    grade_short_name varchar(30),
    grade_basic int ,
    grade_ta int ,
    grade_da int ,
    grade_hra int ,
    grade_ma int ,
    grade_bonus int,
    grade_pf int ,
    grade_pt int
);

create table employee(
	emp_id int primary key auto_increment,
    emp_title varchar(100),
    emp_name varchar(100),
    emp_dob date,
    emp_address varchar(100),
    emp_city varchar(100),
    emp_state varchar(100),
    emp_pincode int,
    emp_mobile_number char(10),
    emp_pancard_number char(10),
    emp_mail_id varchar(100) unique
);

create table emp_grade(
	emp_id int,
    emp_dept_id int,
    emp_grade_id int,
    foreign key (emp_id) references employee(emp_id),
    foreign key (emp_dept_id) references dept(dept_id),
    foreign key (emp_grade_id) references grade(grade_id)
);

create table transaction(
	transaction_id int primary key auto_increment,
    emp_id int,
    emp_dept_id int,
    emp_grade_id int,
    foreign key (emp_id) references employee(emp_id),
    foreign key (emp_dept_id) references dept(dept_id),
    foreign key (emp_grade_id) references grade(grade_id)
);
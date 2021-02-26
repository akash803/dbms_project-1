create database project;
use project;

create table admin(
	admin_id int primary key,
    admin_name varchar(100) not null default 'admin',
    password varchar(100) not null default '1234',
    email_id varchar(100)
);

create table dept(
	dept_id int primary key auto_increment,
    dept_name varchar(100) not null unique
);

create table grade(
	grade_id int primary key,
    grade_name varchar(100) not null,
    grade_basic int default 0,
    grade_ta int default 0,
    grade_da int default 0,
    grade_hra int default 0,
    grade_ma int default 0,
    grade_bonus int default 0,
    grade_pf int default 0,
    grade_pt int default 0,
    constraint nonzero check (grade_basic>=0 and grade_ta>=0 and grade_da>=0 and grade_hra>=0 and grade_ma>=0 and grade_bonus>=0 and grade_pf>=0 and grade_pt>=0)
);

create table employee(
	emp_id int primary key,
    emp_title varchar(100) not null,
    emp_name varchar(100) not null,
    emp_dob date,
    emp_doj date,
    emp_city varchar(100),
    emp_pincode int,
    emp_mobile_number int,
    emp_state varchar(100),
    emp_mail_id varchar(100) unique
);

create table emp_grade(
	emp_id int unique not null,
    emp_dept_id int not null,
    emp_grade_id int not null,
    emp_from_date date not null,
    emp_to_date date not null,
    foreign key (emp_id) references employee(emp_id),
    foreign key (emp_dept_id) references dept(dept_id),
    foreign key (emp_grade_id) references grade(grade_id),
    constraint valid_dates check (emp_to_date > emp_from_date)
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
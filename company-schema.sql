DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE department (
	id INT not null auto_increment,
    name varchar(30),
    PRIMARY KEY (id)
);

Create table role (
	id INT not null auto_increment,
    title varchar(30),
    salary decimal(10,4) null,
    department_id int,
    primary key (id)
);

create table employee (
	id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
);
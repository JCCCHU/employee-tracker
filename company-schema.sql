DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE department (
	id INT,
    PRIMARY KEY (id)
);

Create table role (
	id INT,
    title varchar(30),
    salary decimal(10,4) null,
    department_id int,
    primary key (id)
);

create table employee (
	id int,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id)
);
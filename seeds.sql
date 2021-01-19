DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2),
    PRIMARY KEY (id)
)

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
)

INSERT INTO employee (first_name, last_name, role_id)
values ("Bob", "Dole", "1"), ("Richard", "Hammer", "2")

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Human Resources"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, Department_id)
VALUES ("Sales Person", "50000", "1"), ("Software Engineer","60000","2"), ("HR Rep","50000","3"),("Lawyer","50000","4"),("Accountant","50000","5")


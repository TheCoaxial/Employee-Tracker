
const mysql = require('mysql');
const inquirer = require('inquirer');
const conTable = require('console.table');


// Creating connection with db
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Cj9a7xb3012!",

    database: "employee_db"
});


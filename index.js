
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

// connection.connect goes here


begin = () => {

    inquirer
        .prompt({
            name: "doWhat",
            type: "list",
            message: "what would you like to do?",
            choices: [
                "Add Employee",
                "Add Department",
                "Add Role",
                "View Employees",
                "View Department",
                "View Role",
                "Update Employee Roles",
                "Quit"
            ]

        })
        .then(function(answer){
            switch (answer.doWhat){
                case "Add Employee":
                    // Add Employee function
                    break;
                case "Add Department":
                    // Add Department Function
                    break;
                case "Add Role":
                    // Add Role Function
                    break;
                case "View Employees":
                    // Add Viewemployees function
                    break;
                case "View Department":
                    // Add view Department function
                    break;
                case "View Role":
                    // Add view role function
                    break;
                case "Update Employee Roles":
                    // Add update employee function
                    break;
                case "Quit":
                    // Add Quit function
                    break;
                default:
                    console.log("default");
                    // repeat quit function
                    break;
            }
        })

}
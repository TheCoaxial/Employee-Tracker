
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
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id" + connection.threadId + "\n");
    begin();
    
})



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
                    addEmployee();
                    break;
                case "Add Department":
                    // Add Department Function
                    addDepartment();
                    break;
                case "Add Role":
                    // Add Role Function
                    addRole();
                    break;
                case "View Employees":
                    // Add Viewemployees function
                    getEmployees();
                    break;
                case "View Department":
                    // Add view Department function
                    getDepartments();
                    break;
                case "View Role":
                    // Add view role function
                    getRoles();
                    break;
                case "Update Employee Roles":
                    // Add update employee function
                    break;
                case "Quit":
                    // Add Quit function
                    connection.end();
                    break;
                default:
                    console.log("default");
                    connection.end();
                    // repeat quit function
                    
                    break;
            }
        })

}

getEmployees = function(){
    //create a function to get employees
    connection.query("SELECT * FROM employee", (err, res) =>{
        if (err) throw err;
        console.table(res)
        begin();
    })

};

getRoles = function(){
    //create a function to get roles
    let queryOne = "SELECT * FROM role";
    connection.query(queryOne, (err, res) =>{
        if (err) throw err;
        console.table(res)
        begin();
    })
};

getDepartments = function(){
    //Create function to get departments
    let queryOne = "SELECT * FROM department";
    connection.query(queryOne, (err, res) =>{
        if (err) throw err;
        console.table(res)
        begin();
    })
};

addEmployee = function(){
    connection.query("SELECT * FROM role", function (err, roles){
        if (err) throw err;

        inquirer.prompt([
            {
                name: "firstname",
                type: "input",
                message: "Enter new employee's first name"
            },
            {
                name: "lastname",
                type: "input",
                message: "Enter new employee's last name"
            },
            {
                name: "job",
                type: "list",
                message: "Select employee's position",
                choices: roles.map(role =>({name: role.title, value: role.id}))
            }
        ]).then(function(answers){
            
            let employee = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ? )`;
            
            connection.query(employee,[answers.firstname, answers.lastname, answers.job], function(err, res){
                if (err) throw err;
                begin();
            });
        });
    });
};

addRole = function(){
    connection.query("SELECT * FROM department", function (err, department){
        if (err) throw err;
       

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "branch",
                type: "list",
                message: "Select department for new role",
                choices: department.map(dept =>({name: dept.name, value: dept.id}))
            }
        ]).then(function(answers){
            
            let role = `INSERT INTO role (title, salary, Department_id) VALUES (?, ?, ? )`;
           
            connection.query(role, [answers.title, answers.salary, answers.branch], function(err, res){
                if (err) throw err;
                begin();
            });
        });
    });
};


addDepartment = function(){
    inquirer.prompt([
        {
            name: "depname",
            type: "input",
            message: "Enter new derpartment's name"
        }   
        
    ]).then(function(answers){
        
        let employee = `INSERT INTO department (name) VALUES ( ? )`;
        
        connection.query(employee,[answers.depname], function(err, res){
            if (err) throw err;
            begin();
        });
    });
    
};



const mysql = require('mysql');
const inquirer = require('inquirer');
const  conTable  = require('console.table');


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
                    // Viewemployees function
                    getEmployees();
                    break;
                case "View Department":
                    // view Department function
                    getDepartments();
                    break;
                case "View Role":
                    // view role function
                    getRoles();
                    break;
                case "Update Employee Roles":
                    // update employee function
                    changeRole();
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
    //function to get employees
    connection.query("SELECT * FROM employee", (err, res) =>{
        if (err) throw err;
        console.table(res)
       
        menuExit();
       
    })

};

getRoles = function(){
    //function to get roles   
    connection.query("SELECT * FROM role", (err, res) =>{
        if (err) throw err;
        console.table(res)
            
        menuExit();
    })
};

getDepartments = function(){
    //function to get departments
    connection.query("SELECT * FROM department", (err, res) =>{
        if (err) throw err;
        console.table(res)
            
        menuExit();
    })
};

// Function to add employee
addEmployee = function(){
    //Grabbing data from role table
    connection.query("SELECT * FROM role", function (err, roles){
        if (err) throw err;
        // grabbing user input
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
            
            // build query string
            let employee = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ? )`;
            
            // make query and insert answers as values
            connection.query(employee,[answers.firstname, answers.lastname, answers.job], function(err, res){
                if (err) throw err;
                    
                menuExit();

            });
        });
    });
};

addRole = function(){
    //Grabbing data
    connection.query("SELECT * FROM department", function (err, department){
        if (err) throw err;
       
        //Gabbing user input
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
            
            //Build query string
            let role = `INSERT INTO role (title, salary, Department_id) VALUES (?, ?, ? )`;
           
            //Make query and insert answers as values
            connection.query(role, [answers.title, answers.salary, answers.branch], function(err, res){
                if (err) throw err;

                menuExit();
                    
            });
        });
    });
};


addDepartment = function(){
    //Grabbing user data
    inquirer.prompt([
        {
            name: "depname",
            type: "input",
            message: "Enter new derpartment's name"
        }   
        
    ]).then(function(answers){
        
        //Build query string
        let employee = `INSERT INTO department (name) VALUES ( ? )`;
        
        //Make query and insert answers as values
        connection.query(employee,[answers.depname], function(err, res){
            if (err) throw err;

                menuExit();
                
        });
    });
    
};

changeRole = function(){
    //Grabbing data
    connection.query("SELECT * FROM employee", function(err, emp){
        if(err) throw err;

        //Grabbing data
        connection.query("SELECT * FROM role", function(err, roles){
            if(err) throw err;

            //Grabbing user data
            inquirer.prompt([
                {
                    name: "who",
                    type: "list",
                    message: "Which employee's role would you like to update?",
                    choices: emp.map(emps => ({ name: emps.first_name + emps.last_name, value: emps.id }))
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is this employee's new role?",
                    choices: roles.map(role => ({name: role.title, value: role.id}))
                }
            ]).then(function(answer){
                //Build query string
                let newRole = `UPDATE employee SET role_id = ? WHERE id = ?`;

                //Make query and update employee table with answers values
                connection.query(newRole, [answer.role, answer.who], function (err, res){
                    if (err) throw err;
                        
                    menuExit();
                })
            })
        })
    })

}

menuExit = function(){
    inquirer.prompt([
        {
            name: "search",
            type: "list",
            message: "Would you like to do something else, or exit?",
            choices: ["menu" ,"quit"]
        }
    ]).then(function(answers){
        if(answers.search === "menu"){
            begin();
        } else{
            connection.end();
        }
    })
};

/////////////////////* TO DO */////////////////////////

//Add manager table
//Add sort by manager function
//Add Delete functions
//View Dept Budget 
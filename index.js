var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "company"
});

connection.connect(function(err) {
  if (err) throw err;
  mainLoop();
});

function mainLoop() {
  console.log("Employee Tracker 2020");
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View departments, roles, and employees",
        "Add departments, roles, or employees",
        "Update employee roles"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View departments, roles, and employees":
        inquirer.prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to view?",
          choices: [
            "Department",
            "Role",
            "Employee"
          ]
        })
        .then(function(answer) {
          console.log(answer.action);
          dataGet(answer.action);
        })
        break;

      case "Add departments, roles, or employees":
        inquirer.prompt({
          name: "action",
          type: "rawlist",
          message: "What would you like to add?",
          choices: [
            "Department",
            "Role",
            "Employee"
          ]
        })
        .then(function(answer) {
          dataAdd(answer.action);
        })
        break;

      case "Update employee roles":
        dataUpdate();
        break;
      }
    });
}

function dataGet(table) {
  //console.log(table);
  connection.query(`SELECT * FROM ${table}`, function(err, res) {
    if (err) throw err;
    console.log(res);
    mainLoop();
  })
}

function dataAdd(table) {
  let questionSet = [];
  switch(table) {
    case "Department":
      questionSet = [
        {
          name:"name",
          type:"input",
          message:"What is the name of this department?"
        }
      ];
      break;
    case "Role":
      questionSet = [
        {
          name:"title",
          type:"input",
          message:"What is the name of this role?"
        },
        {
          name:"salary",
          type:"input",
          message:"What is the salary of this role?"
        },
        {
          name:"department_id",
          type:"input",
          message:"What department ID is this role associated with?"
        }
      ];
      break;
    case "Employee":
      questionSet =  [
        {
          name:"first_name",
          type:"input",
          message:"What is the employee's first name?"
        },
        {
          name:"last_name",
          type:"input",
          message:"What is the employee's last name?"
        },
        {
          name:"role_id",
          type:"input",
          message:"What role ID is the employee associated with?" // Could definitely be improved with a list of roles
        },
        {
          name:"manager_id",
          type:"input",
          message:"What employee ID is their manager?"
        }
      ];
      break;
    }
  inquirer
    .prompt(questionSet)
    .then(function(answer) {
      console.log(table);
      console.log(answer);
      // Note that employees can't have an empty manager ID. this is a fundamental problem.
      connection.query(
        `INSERT INTO ${table} SET ?`,
        answer,
        function(err) {
          if (err) throw err;
          console.log("Created new entry");
          mainLoop();
        }
        
      )
      });
}

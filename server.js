// // import and require dependencies
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const connectToDatabase = () => {
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'employee_manager'
        });

        db.connect((err) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Connected to the employee_manager database.`);
                resolve(db);
            }
        });
    });
};

const main = async () => {
    while (true) {
        console.log(`
        888888888                        888                                          
        888                               888                                          
        888                               888                                          
        8888888    88888b.d88b.  88888b.  888  .d88b.  888  888  .d88b.   .d88b.       
        888        888 "888 "88b 888 "88b 888 d88""88b 888  888 d8P  Y8b d8P  Y8b      
        888        888  888  888 888  888 888 888  888 888  888 88888888 88888888      
        888        888  888  888 888 d88P 888 Y88..88P Y88b 888 Y8b.     Y8b.          
        8888888888 888  888  888 88888P"  888  "Y88P"   "Y88888  "Y8888   "Y8888       
                                 888                        888                        
                                 888                   Y8b d88P                        
                                 888                    "Y88P"                         
        888b     d888                                                                  
        8888b   d8888                                                                  
        88888b.d88888                                                                  
        888Y88888P888  8888b.  88888b.   8888b.   .d88b.   .d88b.  888d888             
        888 Y888P 888     "88b 888 "88b     "88b d88P"88b d8P  Y8b 888P"               
        888  Y8P  888 .d888888 888  888 .d888888 888  888 88888888 888                 
        888   "   888 888  888 888  888 888  888 Y88b 888 Y8b.     888                 
        888       888 "Y888888 888  888 "Y888888  "Y88888  "Y8888  888                 
                                                      888                              
                                                 Y8b d88P                              
                                                  "Y88P"                               

`);


        const answer = await inquirer.prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ],
            },
        ])
        switch (answer.action) {
            case 'View All Employees':

                console.log('Viewing employees...');
                break;

            case 'Add Employee':

                console.log('Adding employee...');
                break;

            case 'Update Employee Role':

                console.log('Updating employee role...');
                break;

            case 'View All Roles':

                console.log('Viewing all roles...');
                break;

            case 'Add Role':

                console.log('Adding role...');
                break;

            case 'View All Departments':

                console.log('Viewing Departments...');
                break;

            case 'Add Department':

                console.log('Adding department...');
                break;

            case 'Quit':

                console.log('Quitting...');
                process.exit();
        }
    }
};
main();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

const getDepartments = async () => {
    const [departments] = await db.promise().query('SELECT * FROM department');
    return departments;
};

const getRoles = async () => {
    const [roles] = await db.promise().query(`SELECT role.title AS job_title, role.id AS role_id, department.name AS department_name, role.salary
    FROM role INNER JOIN department ON role.department_id = department.id;`);
    return roles;
};

const getEmployees = async () => {
    const [employees] = await db.promise().query(`
    SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title AS job_title, 
    department.name AS department, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM 
    employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id;
    `);

    return employees;
};



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

`)
// Prompt the user for action
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit',
            ],
        },
    ]);
};

let rolesList;
// Function to handle each action
const handleAction = async (action) => {
    switch (action) {
        case 'View All Departments':
            const departments = await getDepartments();
            console.table(departments);
            break;
        case 'View All Roles':
            const roles = await getRoles();
            console.table(roles)
            break;
        case 'View All Employees':
            const employees = await getEmployees();
            console.table(employees)
            break;
        case 'Add Department':
            const departmentNamePrompt = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'Enter the name of the new department:',
                    validate: (input) => input.trim() !== '',
                },
            ]);

            const { departmentName } = departmentNamePrompt;

            try {
                await db.promise().query('INSERT INTO department (name) VALUES (?)', [departmentName]);
                console.log(`Department "${departmentName}" added successfully.`);
            } catch (error) {
                console.error('An error occurred while adding the department:', error);
            }
            break;
        case 'Add Role':
            const departmentsList = await getDepartments();

            if (departmentsList.length === 0) {
                console.log('Please add a department before adding a role.');
                break;
            }

            const roleDataPrompt = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the new role:',
                    validate: (input) => input.trim() !== '',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for the new role:',
                    validate: (input) => !isNaN(input) && parseFloat(input) >= 0,
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Select the department for the new role:',
                    choices: departmentsList.map((department) => ({
                        name: department.name,
                        value: department.id,
                    })),
                },
            ]);

            try {
                const { title, salary, departmentId } = roleDataPrompt;

                await db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
                console.log(`Role "${title}" added successfully.`);
            } catch (error) {
                console.error('An error occurred while adding the role:', error);
            }
            break;
        case 'Add Employee':
            rolesList = rolesList || await getRoles();;
            const employeesList = await getEmployees();

            if (rolesList.length === 0) {
                console.log('Please add a role before adding an employee.');
                break;
            }

            const employeeDataPrompt = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the new employee:',
                    validate: (input) => input.trim() !== '',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the new employee:',
                    validate: (input) => input.trim() !== '',
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Select the role for the new employee:',
                    choices: rolesList.map((role) => ({
                        name: role.job_title,
                        value: role.role_id,
                    })),
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Select the manager for the new employee (if applicable):',
                    choices: [
                        { name: 'None', value: null },
                        ...employeesList.map((employee) => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id,
                        })),
                    ],
                },
            ]);

            try {
                const { firstName, lastName, roleId, managerId } = employeeDataPrompt;

                await db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
                console.log(`Employee "${firstName} ${lastName}" added successfully.`);
            } catch (error) {
                console.error('An error occurred while adding the employee:', error);
            }
            break;
        case 'Update Employee Role':
            rolesList = rolesList || await getRoles();
            const employeesForUpdate = await getEmployees();
            
            if (employeesForUpdate.length === 0) {
                console.log('No employees found. Please add an employee before updating roles.');
                break;
            }

            const employeeUpdatePrompt = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Select the employee to update:',
                    choices: employeesForUpdate.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'newRoleId',
                    message: 'Select the new role for the employee:',
                    choices: rolesList.map((role) => ({
                        name: role.job_title,
                        value: role.role_id,
                    })),
                },
            ]);

            try {
                const { employeeId, newRoleId } = employeeUpdatePrompt;

                await db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [newRoleId, employeeId]);
                console.log('Employee role updated successfully.');
            } catch (error) {
                console.error('An error occurred while updating the employee role:', error);
            }
            break;
        case 'Quit':
            console.log('Quitting...');
            process.exit();
    }
};

// Connect to the MySQL database
db.connect((err) => {
    if (err) throw err;

    console.log('Connected to the employee_db database');

    // Call the start app
    startApp();
});

// Function to start the application
const startApp = async () => {
    try {
        const { action } = await promptUser();

        await handleAction(action);

        startApp();
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

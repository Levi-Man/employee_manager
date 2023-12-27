const express = require('express');
const router = express.Router();
const db = require('./db');

// -- Department Query
const departmentQuery = () => `SELECT * FROM department;`;
res.send('Department query executed successfully');

// -- Role Query
    const roleQuery = () => `SELECT role.title AS job_title, role.id AS role_id, department.name AS department_name, role.salary
FROM role INNER JOIN department ON role.department_id = department.id;`;

    // Make this function asynchronous
    const executeRoleQuery = async () => {
        try {
            const results = await db.query(roleQuery());
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Call the asynchronous function
    executeRoleQuery();


// -- Employee Query

    const employeeQuery = () => `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`;

    // Make this function asynchronous
    const executeEmployeeQuery = async () => {
        try {
            const results = await db.query(employeeQuery());
            res.json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    // Call the asynchronous function
    executeEmployeeQuery();


module.exports = {
    departmentQuery,
    roleQuery,
    employeeQuery
};

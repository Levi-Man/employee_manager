const express = require('express');
const router = express.Router();

// -- Department Query
const departmentQuery = () =>
`SELECT * FROM department`;

// -- Role Query
const roleQuery = () => `SELECT role.title AS job_title, role.id AS role_id, department.name AS department_name, role.salary
FROM role INNER JOIN department ON role.department_id = department.id`;

// -- Employee Query
const employeeQuery = () => `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id`; 

router.get('/role', (req,res))

module.exports = router;
-- Department Query
SELECT * FROM department;

-- Role Query
SELECT role.title AS job_title, role.id AS role_id, department.name AS department_name, role.salary
FROM role INNER JOIN department ON role.department_id = department.id;

-- Employee Query
SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
LEFT JOIN employee AS manager ON employee.manager_id = manager.id; 
INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES 
-- Human REsources
       ("HR Manager", 120000, 1),
       ("HR Generalist", 80000, 1),
       ("Training and Development Manager", 100000, 1),
       ("Employee Relations Coordinator", 60000, 1),
       ('Benefits Administrator', 55000, 1),
-- Sales       
       ("Sales Director", 150000, 2), 
       ("Account Executive", 90000, 2), 
       ("Sales Representative", 70000, 2),
       ("Sales Operations Manager", 110000, 2),
-- Engineering       
       ('Chief Technology Officer (CTO)', 150000, 3),
       ('Engineering Manager', 110000, 3),
       ('Software Engineer', 85000, 3),
       ('Hardware Engineer', 90000, 3),
       ('Quality Assurance (QA) Analyst', 70000, 3),
       ('Systems Architect', 125000, 3),
-- Finance       
       ('Chief Financial Officer (CFO)', 180000, 4),
       ('Finance Manager', 120000, 4),
       ('Accountant', 70000, 4),
       ('Financial Analyst', 85000, 4),
       ('Accounts Payable Specialist', 55000, 4),
-- Legal       
       ('General Counsel', 170000, 5),
       ('Corporate Lawyer', 100000, 5),
       ('Legal Assistant', 60000, 5),
       ('Compliance Officer', 85000, 5),
       ('Intellectual Property Specialist', 100000, 5),
-- Marketing       
       ('Chief Marketing Officer (CMO)', 150000, 6),
       ('Marketing Manager', 110000, 6),
       ('Content Marketing Specialist', 70000, 6),
       ('Digital Marketing Analyst', 65000, 6),
       ('Social Media Coordinator', 55000, 6);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    -- Human Resources
    ('Dominic', 'Toretto', 1, NULL),
    ('Letty', 'Ortiz', 2, 1),
    ('Mia', 'Toretto', 3, 1),
    ('Roman', 'Pearce', 4, 1),
    ('Tej', 'Parker', 5, 1),
    -- Sales
    ('Brian', 'OConner', 6, NULL),
    ('Elena', 'Neves', 7, 6),
    ('Han', 'Seoul-Oh', 8, 6),
    ('Gisele', 'Yashar', 9, 6),
        -- Engineering
    ('Luke', 'Hobbs', 10, NULL),
    ('Riley', 'Hicks', 11, 10),
    ('Leo', 'Tego', 12, 10),
    ('Tanner', 'Foust', 13, 10),
    ('Suki', 'Yamamoto', 14, 10),
    ('Twinkie', 'Xiao', 15, 10),
    -- Finance
    ('Monica', 'Fuentes', 16, NULL),
    ('Markham', 'Ron', 17, 16),
    ('Virgil', 'Hu', 18, 16),
    ('Klaus', 'Einstein', 19, 16),
    ('Sal', 'Hobbi', 20, 16),
    
    -- Legal
    ('Arturo', 'Braga', 21, NULL),
    ('Linder', 'Weitzman', 22, 21),
    ('Esteban', 'Ramo', 23, 21),
    ('Buddy', 'Wreck', 24, 21),
    ('Mando', 'Mambo', 25, 21),
    -- Marketing
    ('Deckard', 'Shaw', 26, NULL),
    ('Hattie', 'Shaw', 27, 26),
    ('Owen', 'Shaw', 28, 26),
    ('Jakob', 'Toretto', 29, 26),
    ('Natas', 'Kaupas', 30, 26);
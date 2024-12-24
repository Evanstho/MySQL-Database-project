-- Citation for the following function:
-- Date: 5/3/23
-- Adapted from: Project Step 2 Draft: Normalized Schema + DDL with Sample Data (Group, on Ed Discussions)
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/assignments/9180999?module_item_id=23040579

-- Citation for the following function:
-- Date: 5/3/23
-- Adapted from: Intro to SQL
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/pages/exploration-intro-to-sql?module_item_id=23040551

-- Citation for the following function:
-- Date: 5/3/23
-- Adapted from: Exploration - MySQL Cascade
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/pages/exploration-mysql-cascade?module_item_id=23040578

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
-- ------------------
-- TABLE CREATION --
-- ------------------

-- Terms table: Records the terms that classes are offered --
CREATE OR REPLACE TABLE Terms (
    termID int AUTO_INCREMENT NOT NULL,
    term varchar(50) NOT NULL,
    yr year NOT NULL,
    PRIMARY KEY(termID)
);

-- Department Table: Records the different departments within the university and the names of the departments--
CREATE OR REPLACE TABLE Departments (
    deptID int(10) AUTO_INCREMENT NOT NULL,
    deptName varchar(145) NOT NULL,
    PRIMARY KEY (deptID)
);

-- Majors Table: Records the current majors offered at the university--
CREATE OR REPLACE TABLE Majors (
    majorID int AUTO_INCREMENT NOT NULL,
    majorName varchar(255) NOT NULL,
    deptID int,
    PRIMARY KEY (majorID),
    FOREIGN KEY (deptID) REFERENCES Departments(deptID)
);


-- Student table: Records the relevant details of a student that attends "Online Fake University"--
CREATE OR REPLACE TABLE Students (
    studentID bigint AUTO_INCREMENT NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    userName varchar(255) NOT NULL,
    email varchar(320) unique NOT NULL,
    majorID int,
    PRIMARY KEY (studentID),
    FOREIGN KEY(majorID) REFERENCES Majors(majorID)
    ON DELETE CASCADE 
);

-- Professors table: Records the relevant details of a professor that teaches at the university--
CREATE OR REPLACE TABLE Professors (
    professorID bigint AUTO_INCREMENT NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    userName varchar(255),
    email varchar(320) unique NOT NULL,
    deptID int,
    PRIMARY KEY(professorID),
    FOREIGN KEY(deptID) REFERENCES Departments(deptID)
    ON DELETE SET NULL
);

-- Classes table: Records the classes offered at the university-- 
CREATE OR REPLACE TABLE Classes (
    classID bigint AUTO_INCREMENT NOT NULL,
    className varchar(145) NOT NULL,
    classCredits int(10) NOT NULL,
    professorID bigint DEFAULT NULL,
    deptID int DEFAULT NULL,
    PRIMARY KEY (classID),
    -- DELETE REMOVED M:M RELATIONSHIP FOR PROFESSOR AND STUDENT IN CLASSES ENTITY
    -- ON DELETE SET NULL with professors and departments so that the class isn't deleted if a professor or department is
    FOREIGN KEY (professorID) REFERENCES Professors(professorID)
    -- Setting foreign key values to NULL using update, which removes the relationship
    ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (deptID) REFERENCES Departments(deptID)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- --------------------------------
-- CREATING INTERSECTION TABLES --
-- --------------------------------

-- EnrollmentDetails table: Intersection table for the M:M relationship between Students and Classes --
CREATE OR REPLACE TABLE EnrollmentDetails (
    enrollmentID bigint AUTO_INCREMENT NOT NULL,
    studentID bigint,
    classID bigint,
    PRIMARY KEY(enrollmentID),
    FOREIGN KEY(studentID) REFERENCES Students(studentID)
    ON DELETE CASCADE,
    FOREIGN KEY(classID) REFERENCES Classes(classID)
    ON DELETE CASCADE
);

-- TermClassDetails table: Intersection table for the M:M relationshp between Terms and Classes; ON DELETE CASCADE--
CREATE OR REPLACE TABLE TermClassDetails (
    termclassdetailsID int AUTO_INCREMENT NOT NULL,
    termID int NOT NULL, 
    classID bigint NOT NULL,
    PRIMARY KEY(termclassdetailsID),
    -- DELETE FROM M:N AT INTERSECTION TABLE WITH ON DELETE CASCADE--
    FOREIGN KEY(termID) REFERENCES Terms(termID)
    ON DELETE CASCADE,
    -- DELETE FROM M:N AT INTERSECTION TABLE WITH ON DELETE CASCADE--
    FOREIGN KEY(classID) REFERENCES Classes(classID)
    ON DELETE CASCADE
);

-- -----------------------
-- Sample Data inserts -- 
-- -----------------------


-- insert departments data--
INSERT INTO Departments (deptName)
VALUES ('Chemistry'),
    ('Physics'),
    ('English'),
    ('Art History'),
    ('Electrical Engineering and Computer Science'),
    ('Music');

-- Insert Majors data --
INSERT INTO Majors (majorName, deptID)
VALUES ('Chemical Engineering', (SELECT deptID FROM Departments WHERE deptName = 'Chemistry')),
    ('Chemistry', (SELECT deptID FROM Departments WHERE deptName = 'Chemistry')),
    ('English Literature', (SELECT deptID FROM Departments WHERE deptName = 'English')),
    ('Creative Writing', (SELECT deptID FROM Departments WHERE deptName = 'English')),
    ('Computer Science', (SELECT deptID FROM Departments WHERE deptName = 'Electrical Engineering and Computer Science')),
    ('Electrical Engineering', (SELECT deptID FROM Departments WHERE deptName = 'Electrical Engineering and Computer Science'));



-- Insert terms data --
INSERT INTO Terms (term, yr)
VALUES ('Winter', '2023'),
('Spring', '2023'),
('Summer', '2023'),
('Fall', '2023'),
('Winter', '2024'),
('Spring', '2024');


-- Insert Students data -- 
INSERT INTO Students (firstName, lastName, userName, email, majorID)
VALUES ('Marilyn', 'Monroe', 'monroem', 'Marilyn.Monroe@TOFU.edu', (SELECT majorID from Majors WHERE majorName = 'Chemical Engineering')),
    ('Natalie', 'Portman', 'portman', 'Natalie.Portman@TOFU.edu', (SELECT majorID from Majors WHERE majorName = 'English Literature')),
    ('Arnold', 'Schwarzenegger', 'schwara', 'Arnold.Schwarzenegger@TOFU.edu', (SELECT majorID from Majors WHERE majorName = 'Computer Science')),
    ('Christiano', 'Ronaldo', 'ronaldc', 'Christiano.Ronaldo@TOFU.edu', (SELECT majorID from Majors WHERE majorName = 'Computer Science')),
    ('Mia', 'Ham', 'hammia', 'Mia.Ham@TOFU.edu', (SELECT majorID from Majors WHERE majorName = 'Chemical Engineering')),
    ('Lionel', 'Messi', 'lionelm', 'Lionel.Messi@TOFU.edu', (SELECT majorID from Majors WHERE majorName = 'Chemical Engineering'));

-- Insert Professors data -- 
INSERT INTO Professors (firstName, lastName, userName, email, deptID)
VALUES ('Mike', 'Tyson', 'tysonm', 'Mike.Tyson@TOFU.edu', (SELECT deptID from Departments WHERE deptName = 'Physics')),
    ('Hermione', 'Granger', 'grangeh', 'Hermione.Granger@TOFU.edu', (SELECT deptID from Departments WHERE deptName = 'English')),
    ('Thomas', 'Evans', 'evanstho', 'thomas.evans@TOFU.edu', (SELECT deptID from Departments WHERE deptName = 'Electrical Engineering and Computer Science')),
    ('Lana', 'Del Rey', 'delreyl', 'Lana.Del.Rey@TOFU.edu', (SELECT deptID from Departments WHERE deptName = 'Music')),
    ('Rodtang', 'Jitmuangnon', 'jitmuar', 'Rodtang.Jitmuangnon@TOFU.edu', (SELECT deptID from Departments WHERE deptName = 'Chemistry')),
    ('Tiger', 'Woods', 'woodsti', 'Tiger.Woods@TOFU.edu', (SELECT deptID from Departments WHERE deptName = 'Art History'));

-- Insert Classes data --
INSERT INTO Classes (className, classCredits, professorID, deptID)
VALUES ('Organic Chemistry I', 4, (SELECT professorID FROM Professors WHERE userName = 'jitmuar'), (SELECT deptID FROM Departments WHERE deptName = 'Chemistry')),
    ('Quantum Mechanics', 4, (SELECT professorID FROM Professors WHERE userName = 'tysonm'), (SELECT deptID FROM Departments WHERE deptName = 'Physics')),
    ('Poets: Poetry and Everything', 3, (SELECT professorID FROM Professors WHERE userName = 'grangeh'), (SELECT deptID FROM Departments WHERE deptName = 'English')),
    ('Contemporary Art History', 3, (SELECT professorID FROM Professors WHERE userName = 'woodsti'), (SELECT deptID FROM Departments WHERE deptName = 'Art History')),
    ('Intro to Computer Science', 4, (SELECT professorID FROM Professors WHERE userName = 'evanstho'), (SELECT deptID FROM Departments WHERE deptName = 'Electrical Engineering and Computer Science')),
    ('History of Jazz', 2, (SELECT professorID FROM Professors WHERE userName = 'delreyl'), (SELECT deptID FROM Departments WHERE deptName = 'Music'));

-- Insert Enrollments data--
INSERT INTO EnrollmentDetails (studentID, classID)
VALUES ((Select studentID from Students WHERE userName = 'lionelm'), (Select classID from Classes where className = 'Organic Chemistry I')),
    ((Select studentID from Students WHERE userName = 'hammia'), (Select classID from Classes where className = 'Organic Chemistry I')),
    ((Select studentID from Students WHERE userName = 'schwara'), (Select classID from Classes where className = 'Intro to Computer Science')),
    ((Select studentID from Students WHERE userName = 'ronaldc'), (Select classID from Classes where className = 'Intro to Computer Science')),
    ((Select studentID from Students WHERE userName = 'portman'), (Select classID from Classes where className = 'Contemporary Art History')),
    ((Select studentID from Students WHERE userName = 'monroem'), (Select classID from Classes where className = 'Quantum Mechanics')),
    ((Select studentID from Students WHERE userName = 'monroem'), (Select classID from Classes where className = 'Organic Chemistry I'));

-- Insert TermClassDetails data--
INSERT INTO TermClassDetails (termID, classID)
VALUES ((select termID from Terms where term = 'Winter' and yr = '2023'), (Select classID FROM Classes WHERE className = 'Organic Chemistry I')),
((select termID from Terms where term = 'Winter' and yr = '2023'), (Select classID from Classes where className = 'Quantum Mechanics')),
((select termID from Terms where term = 'Spring' and yr = '2023'), (Select classID from Classes where className = 'Poets: Poetry and Everything')),
((select termID from Terms where term = 'Spring' and yr = '2023'), (Select classID from Classes where className = 'Contemporary Art History')),
((select termID from Terms where term = 'Summer' and yr = '2023'), (Select classID from Classes where className = 'Intro to Computer Science')),
((select termID from Terms where term = 'Summer' and yr = '2023'), (Select classID from Classes where className = 'History of Jazz'));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;

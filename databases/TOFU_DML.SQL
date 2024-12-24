-- Citation for the following function:
-- Date: 5/10/23
-- Adapted from: Canvas Exploration Database application design (module 6)
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/pages/exploration-database-application-design?module_item_id=23040585

-- Citation for the following function:
-- Date: 5/17/23
-- Adapted from: Canvas Exploration Database application design (module 6)
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/assignments/9181002

-- ID NUMBERS to populate--

-- Get all students ID
select studentID from Students;

-- get all professors ID
select professorID from Professors;

-- get all classes ID
select classID from Classes;

-- get all terms ID
select termID From Terms;

-- get all departments ID
select deptID from Departments;

-- get all majors ID
select majorID from Majors;

-- Get single professors name from ID
select CONCAT(Professors.firstName, " ", Professors.lastName) AS Professor from Professors WHERE professorID = :professorIDInputFromBrowser

-- Get single student name from ID
select CONCAT(Students.firstName, " ", Students.lastName) AS Student from Students WHERE studentID = :studentIDInputFromBrowser

-- get single class name from ID
select className from Classes WHERE classID = :classIDInputFromBrowser

-- get single department name from ID
select deptName from Departments WHERE deptID = :deptIDInputFromBrowser

-- -------------------
-- STUDENTS ENTITY --
-- -------------------

-- Get student for students table --
SELECT studentID, firstName AS FirstName, lastName AS LastName, userName AS Username, email AS Email, Majors.majorName as Major FROM Students
    INNER JOIN Majors ON Students.majorID = Majors.majorID;
    
-- Get single students info for update -- 
SELECT studentID, firstName, lastName, userName, email, Majors.majorName as Major from Students
    INNER JOIN Majors ON Students.majorID = Majors.majorID
    WHERE studentID = :studentIDInputOnStudentsPage

-- ADD Student --
INSERT INTO Students (firstName, lastName, userName, email, majorID)
VALUES(:firstNameInput, :lastNameInput, :userNameInput, :emailInput, :majorID)

-- UPDATE STUDENT --
UPDATE Students
SET firstName = :firstNameInput, lastName = :lastNameInput, userName = :userNameInput, email = :emailInput, majorID = :majorID
WHERE studentID = :studentIDInputOnStudentsPage

-- DELETE STUDENT --
DELETE FROM Students WHERE studentID = :studentIDInputOnStudentsPage

-- ---------------------
-- PROFESSORs ENTITY --
-- ---------------------

-- get professors info for update ---
SELECT professorID, firstName AS FirstName, lastName AS LastName, userName AS Username, email AS Email, Departments.deptName as department FROM Professors 
    LEFT JOIN Departments ON Professors.deptID = Departments.deptID;

-- Get single professors info for update -- 
SELECT professorID, firstName, lastName, userName, email, Departments.deptName FROM Professors
    INNER JOIN Departments ON Professors.deptID = Departments.deptID
    WHERE professorID = :professorIDInputOnProfessorsPage

-- ADD PROFESSOR --
INSERT INTO Professors (firstName, lastName, userName, email, deptID)
VALUES (:firstNameInput, :lastNameInput, :userNameInput, :emailInput, :deptID)

-- UPDATE PROFFESSOR --
Update Professors
SET firstName = :firstNameInput, lastName = :lastNameInput, userName = :userNameInput, email = :emailInput, deptID = :deptID
WHERE professorID = :professorIDInputOnProfessorsPage

-- DELETE PROFESSOR --
DELETE FROM Professors WHERE professorID = :professorIDInputOnProfessorsPage


-- ----------------------
-- Enrollments ENTITY --
-- ----------------------

-- get information for EnrollmentDetails --
Select enrollmentID, enrollmentDate AS EnrollmentDate, CONCAT(Students.firstName, ' ', Students.lastName) AS Student, Classes.className as Class 
FROM EnrollmentDetails
    INNER JOIN Students ON EnrollmentDetails.studentID = Students.studentID
    Inner JOIN Classes ON EnrollmentDetails.classID = Classes.classID;

-- Enroll a student in class
INSERT INTO EnrollmentDetails (studentID, enrollmentDate, classID)
VALUES (:studentID, :enrollmentDate, :classID)

-- DELETE enrollment
DELETE FROM EnrollmentDetails WHERE enrollmentID = :enrollmentIDInputOnEnrollmentDetailsPage

-- Add for M:M relationship: associate a student with a class--
-- !!Requirement to add a corresponding FK attribute for one M:M relationship M:M relationship b/w student and class where a new student--
-- and a new class are inserted into the intersection table, enrollments!!--
INSERT INTO EnrollmentDetails(enrollmentDate, studentID, classID)
VALUES (:enrollmentDateInput, :studentIDFromInput, :classIDFromInput)

-- Delete for M:M relationship: dis-associate a class from a student (delete M:M relationship)--
-- !!Requirement for project to be able to delete from the M:M relationship from the intersection table (enrollmentsDetails) without deleting the class or student!!--
-- DELETE FROM EnrollmentDetails WHERE studentID = :studentIDSelectedFromEnrollmentsList 
-- AND classID = :classIDSelectedFromEnrollments List
-- Happens with CASCADE

-- ----------------
--CLASSES ENTITY--
-- ----------------

-- Get all classes and their professors and departments for the browse Classes page with FKs user friendly (Read)
SELECT classID, className, classCredits, CONCAT(Professors.firstName,' ', Professors.lastName) AS professorID, Departments.deptName AS deptID 
	FROM Classes 
    	LEFT JOIN Professors ON Classes.professorID = Professors.professorID 
        LEFT JOIN Departments ON Classes.deptID = Departments.deptID
        	ORDER BY classID; 

-- Add classes -- (Create)
INSERT INTO Classes (className, classCredits, professorID, deptID)
VALUES (:classNameInput, :classCreditsInput, :professorIDInput, :deptIDInput)

-- Get a single professors data for the update classes form so knows whwich professor needs to be updated (Update part 1)--
 SELECT * FROM Professors WHERE professorID = ?
    WHERE  classID = :classIDFromUpdateForm

-- Get a single departments data for the update classes form so knows whwich department needs to be updated (Update part 1)--
 SELECT * FROM Departments WHERE deptID = ?
    WHERE  classID = :classIDFromUpdateForm

-- Update classes based on the above mentioned submission of the update classes form (Update part 2)--
UPDATE Classes
    SET className = :classNameInput, classCredits = :classCreditsInput, professor = :professorIDInput, deptID = :deptIDInput
    WHERE classID = :classIDFromUpdateForm

-- Delete classes (Delete)--
DELETE FROM Classes WHERE classID = :classIDSelectedFromBrowseClassesPage

--- Set department to null in classes entity if null value entered
UPDATE Classes
    SET deptID = NULL
    WHERE classID = :classIDFromUpdateForm

--- Set professor to null in classes entity if null value entered
UPDATE Classes
    SET professorID = NULL
    WHERE classID = :classIDFromUpdateForm

-- --------------
-- TERMS ENTITY--
-- --------------

-- Get all terms to display for the browse terms page (Read)
SELECT termID, term, yr FROM Terms

-- Add term (Create)--
INSERT INTO Terms (term, yr)
VALUES (:termInput, :yrInput)

-- Add for M:M relationship: associate a student with a class--
-- WE USED UPDATE AND DELETE CASCADE FOR THIS, BUT THIS WAS THE CODE THAT WE HAD BEEN PLANNING ON USING BEFORE USING CASCADE---
-- !!Requirement to add a corresponding FK attribute for one M:M relationship M:M relationship b/w term and class where a new term--
-- and a new class are inserted into the intersection table, termClassDetails!!--
INSERT INTO TermClassDetails(termID, classID)
VALUES (:termIDFromDropDownInput, :classIDFromDropDownInput)

-- Delete for M:M relationship: dis-associate a class from a student (delete M:M relationship)--
-- WE USED UPDATE AND DELETE CASCADE FOR THIS, BUT THIS WAS THE CODE THAT WE HAD BEEN PLANNING ON USING BEFORE USING CASCADE---
-- !!Requirement for project to be able to delete from the M:M relationship from the intersection table (enrollments) without deleting the class or student!!--
DELETE FROM TermClassDetails WHERE termID = :termIDSelectedFromTermClassDetailsList 
AND classID = :classIDSelectedFromTermClassDetailsList


-----------------------
-- DEPARTMENTS ENTITY--
-----------------------

--Get all departments to display for the browse departments page (Read)--
SELECT deptID, deptName FROM Departments

-- ADD departments (Create) --
INSERT INTO Departments (deptName)
VALUES (:deptNameInput)

-- ---------------
-- MAJORS ENTITY--
-- ---------------
-- Get all majors to display for the browse majors page (Read)--
SELECT majorID, majorName, Departments.deptName AS department 
	FROM Majors 
    	LEFT JOIN Departments ON Majors.deptID = Departments.deptID; 

-- Add Major (Create)
INSERT INTO Majors (majorName, deptID)
VALUES (:majorNameInput, :deptIDInput)

-- -------------------------
-- TERMCLASSDETAILS ENTITY--
-- -------------------------

-- Get all term class details intersection table information to display in a user friendly way(Read)--
SELECT termclassdetailsID, CONCAT(Terms.term, ' ',Terms.yr) AS term, Classes.className AS class
    FROM TermClassDetails
        LEFT JOIN Terms
        ON TermClassDetails.termID = Terms.termID
        LEFT JOIN Classes
        ON TermClassDetails.classID = Classes.classID
        ORDER BY termclassdetailsID 
        
-- Add TermClassDetails (Create)--
INSERT INTO TermClassDetails (termID, classID)
VALUES (:termclassdetailsIDInput, :termIDInput, :classIDInput)

-- ------------------------------------------------------------------------
-- NULLABLE Relationship between Student and Major (Student with no major)
-- ------------------------------------------------------------------------

-- set students major to Null
-- UPDATE Students
-- SET majorID = NULL
-- WHERE studentID = :studentIDInput
-- Implemented else where



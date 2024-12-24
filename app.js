// -- Citation for the following function:--
// -- Date: 5/10/2023 --
// -- Adapted from: nodejs-starter app on github step 0: setting up Node--
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js}

// -- Citation for the following function:--
// -- Date: 5/10/2023 --
// -- Adapted from: nodejs-starter app on github step 1: Connecting to a MySQL Database--
// {{https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database}

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: nodejs-starter app on github step 2: Loading Data into database--
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%202%20-%20Loading%20Data%20into%20the%20Database}

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: nodejs-starter app on github step 3: Integrating a Templating Engine (handelbars)--
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)}

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: nodejs-starter app on github step 4: Dynamically Displaying Data--
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data)}

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: nodejs starter app on github step 5: Adding New Data--
// --https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: nodejs starter app on github step 6: Dynamically Filling Dropdowns and Adding a Search Box--
// --https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: nodejs starter app on github step 7: Dynamically Deleting data--
// --https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

// -- Citation for the following function:--
// -- Date: 6/9/2023 --
// -- Adapted from: nodejs starter app on github step 8: Dynamically Updating Data--
// --https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// -- Citation for the following function:--
// -- Date: 6/11/23 --
// -- Adapted from: mdn web docs --
// // --Used this to determine when to use parseInt and why)
// --https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt --

/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 6453;                 // Set a port number

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: '.hbs'}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it enco

// Database
var db = require('./databases/db-connector')

/*
    ROUTES
*/
// ------------------
// ---get requests---
// ------------------

app.get('/', function(req, res)
    {  
        let query1 = 'SELECT * FROM Classes;';   
        // This populates the Department Dropdown
        let query2 = 'SELECT * FROM Departments;';

        db.pool.query(query1, function(error, rows, fields){ 
            
            let classes = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                let departments = rows;
                
                return res.render('index', {data: classes, departments: departments})});              
        })                                                    
    });

app.get('/students', function(req, res)
    {  
        // Populates the read with NULL majors
        let query1 = 'SELECT studentID, firstName AS FirstName, lastName AS LastName, userName AS Username, email AS Email, Majors.majorName as Major FROM Students LEFT JOIN Majors ON Students.majorID = Majors.majorID;';
        // This populates the Majors dropdown menu
        let query2 = 'SELECT * FROM Majors;';

        db.pool.query(query1, function(error, rows, fields){
            
            let students = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let majors = rows;

                return res.render('students', {data: students, majors: majors})});                  
        })                                                      
    });

app.get('/professors', function(req, res)
    {  
        //Populates the read with NULL departments 
        let query1 = 'SELECT professorID, firstName AS FirstName, lastName AS LastName, userName AS Username, email AS Email, Departments.deptName AS Department FROM Professors LEFT JOIN Departments ON Professors.deptID = Departments.deptID;';
        
        let query2 = 'SELECT * FROM Departments;';
        

        db.pool.query(query1, function(error, rows, fields){    

            let professors = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let departments = rows;
            
                return res.render('professors', {data: professors, departments: departments})});                  
        })                                                      
    });

app.get('/classes', function(req, res)
    {  
        let query1 = "SELECT classID , className, classCredits, CONCAT(Professors.firstName,' ', Professors.lastName) AS professorID, Departments.deptName AS deptID FROM Classes LEFT JOIN Professors ON Classes.professorID = Professors.professorID LEFT JOIN Departments ON Classes.deptID = Departments.deptID ORDER BY classID;";          
        // This populates the Department Dropdown
        let query2 = 'SELECT * FROM Departments;';
        // This populates the Professor Dropdown
        let query3 = 'SELECT * FROM Professors;';
        // This populates the classID dropdown
    let query4 = 'SELECT classID FROM Classes;';

        db.pool.query(query1, function(error, rows, fields){ 
            
            let classes = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                let departments = rows;

                db.pool.query(query3, (error, rows, fields) => {
                    
                    let professors = rows;

                    db.pool.query(query4, (error, rows, fields) => {
                        
                        let classID = rows

                        return res.render('classes', {data: classes, classID: classID, departments: departments, professors: professors})})})})});              
    });

app.get('/enrollmentdetails', function(req, res)
    {  
        let query1 = "SELECT enrollmentID, CONCAT(Students.firstName,' ', Students.lastName) AS Student, Classes.className as Class FROM EnrollmentDetails INNER JOIN Students ON EnrollmentDetails.studentID = Students.studentID Inner JOIN Classes ON EnrollmentDetails.classID = Classes.classID ORDER BY enrollmentID;";
        
        let query2 = 'SELECT * FROM Students;';

        let query3 = 'SELECT * FROM Classes;';

        db.pool.query(query1, function(error, rows, fields){ 
            
            let enrollmentdetails = rows;

            db.pool.query(query2, (error, rows, fields) => {
                
                let students = rows;
                
                db.pool.query(query3, (error, rows, fields) => {
                    
                    let classes = rows;
                
                    return res.render('enrollmentdetails', {data: enrollmentdetails, students: students, classes: classes})})});                  
        })                                                      
    }); 
    
                             

app.get('/termclassdetails', function(req, res)
    {  
        let query1 = "SELECT termclassdetailsID, CONCAT(Terms.term, ' ',Terms.yr) AS term, Classes.className AS class FROM TermClassDetails LEFT JOIN Terms ON TermClassDetails.termID = Terms.termID LEFT JOIN Classes ON TermClassDetails.classID = Classes.classID ORDER BY termclassdetailsID;";   
        // This populates the Terms Dropdown
        let query2 = 'SELECT * FROM Terms;';
        // This populates the Classes Dropdown
        let query3 = 'SELECT * FROM Classes;';

        db.pool.query(query1, function(error, rows, fields){ 
            
            let termclassdetails = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                let terms = rows;

                db.pool.query(query3, (error, rows, fields) => {
                    
                    let classes = rows;
                    
                    return res.render('termclassdetails', { data: termclassdetails, terms: terms, classes: classes })
                })
            });              
        })                                                    
    });

app.get('/terms', function(req, res)
    {  
        let query1 = 'SELECT termID, term, yr FROM Terms;';               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('terms', {data: rows});                  
        })                                                      
    });

app.get('/departments', function(req, res)
    {  
        let query1 = 'SELECT deptID, deptName FROM Departments;'; 
                      

        db.pool.query(query1, function(error, rows, fields){   

            res.render('departments', {data: rows});                  
        })                                                      
    });

app.get('/majors', function(req, res)
    {  
        let query1 = 'SELECT majorID, majorName, Departments.deptName AS department FROM Majors LEFT JOIN Departments ON Majors.deptID = Departments.deptID;';   
        // This populates the Department Dropdown
        let query2 = 'SELECT * FROM Departments;';

        db.pool.query(query1, function(error, rows, fields){ 
            
            let majors = rows;

            db.pool.query(query2, (error, rows, fields) => {
            
                let departments = rows;

                return res.render('majors', {data: majors, departments: departments})});              
        })                                                    
    });

// ---------------------
// ---classes functions---
// ---------------------

// Add Class 
app.post('/add-class-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // returns class credits as an integer using parseInt
    let classCredits = parseInt(data.classCredits);
    
    // Capture NULL values for professor and dept ID. This allows us to still add a class even if professor ID and dept ID are null 
    let professorID = parseInt(data.professorID);
    if (isNaN(professorID))
    {
        professorID = "";
    }

    let deptID = parseInt(data.deptID);
    if (isNaN(deptID))
    {
        deptID = "";
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Classes (className, classCredits, professorID, deptID) VALUES ('${data.className}', '${classCredits}', ${professorID}, ${deptID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT on Classes
            query2 = "SELECT classID, className, classCredits, CONCAT(Professors.firstName,' ', Professors.lastName) AS professorID, Departments.deptName AS deptID FROM Classes LEFT JOIN Professors ON Classes.professorID = Professors.professorID LEFT JOIN Departments ON Classes.deptID = Departments.deptID ORDER BY classID;";          
            
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Class 
app.delete('/delete-class-ajax/', function(req,res,next){
    let data = req.body;
    let classID = parseInt(data.id);
    let deleteClasses= `DELETE FROM Classes WHERE classID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteClasses, [classID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                  // Run the second query
                  db.pool.query(deleteClasses, [classID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      }
                      else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});


// Update Class
app.put('/put-class-ajax', function(req,res,next){
    let data = req.body;
    
    let classID = parseInt(data.classID);
    let classCredits = parseInt(data.classCredits);
    let department = parseInt(data.department);
    let className = (data.className);
    let professor = parseInt(data.professor)
  
    let queryUpdateDepartment = `UPDATE Classes SET deptID = ? WHERE Classes.ClassID = ?`;
    let selectDepartment = `SELECT * FROM Departments WHERE deptID = ?`;
    let queryUpdateProfessor = 'UPDATE Classes SET professorID = ? WHERE Classes.ClassID = ?';
    let selectProfessor = 'SELECT * FROM Professors WHERE professorID = ?';
    let queryUpdateClass = 'UPDATE Classes SET classCredits = ?, className = ? WHERE Classes.ClassID = ?';

    // THIS MAKES PROFESSOR AND DEPARTMENT NULLABLE IN A RELATIONSHIP WITH CLASSES
    // *** this enables NULLABLE relationship for professor and student foriegn key *****
    if (isNaN(professor))
    {
        professor = "";
    }

    if (isNaN(department))
    {
        department = "";
    }

    
          db.pool.query(queryUpdateDepartment, [department, classID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                  db.pool.query(selectDepartment, [department], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      }
                      else {
                            db.pool.query(queryUpdateProfessor, [professor, classID], function (error, rows, fields) {
                                if (error)  {
                                    console.log(error);
                                    res.sendStatus(400);   
                                }
                                else {
                                    db.pool.query(selectProfessor, [professor], function(error, rows, fields){
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(400);
                                        }
                                        else { 
                                            db.pool.query(queryUpdateClass, [classCredits, className, classID], function (error, rows, fields){
                                                if (error) {
                                                    console.log(error);
                                                    res.sendStatus(400);
                                                }
                                                else {
                                                    res.send(rows);
                                                }
                                            })                                          
                                        }
                                    })
                                }

                            })
                      }
                  })
              }
  })});

// --------------------------------
// ---Department functions---
// --------------------------------

// add department 
app.post('/add-department-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Departments (deptName) VALUES ('${data.deptName}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Classes
            query2 = `SELECT * FROM Departments;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// --------------------------------
// ---Major functions---
// --------------------------------
app.post('/add-major-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

        // Capture NULL values for dept ID. DeptID can be a null value, so this allows us to still make an entry even if it is null. 

    let deptID = parseInt(data.deptID);
    if (isNaN(deptID)) 
    {
        deptID = "";
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Majors (majorName, deptID) VALUES ('${data.majorName}', ${deptID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Classes
            query2 = 'SELECT majorID, majorName, Departments.deptName AS department FROM Majors LEFT JOIN Departments ON Majors.deptID = Departments.deptID;';   
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});
// --------------------------------
// ---Term functions---
// --------------------------------

app.post('/add-term-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let yr = parseInt(data.yr);
    if (isNaN(yr))
    {
        yr = "";
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Terms (term, yr) VALUES ('${data.term}', '${yr}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Terms;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// --------------------------------
// ---Term Class Details functions---
// --------------------------------

app.post('/add-termclassdetails-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values for termID and classID; can be inserted even if both values are null
    let termID = parseInt(data.termID);
    if (isNaN(termID))
    {
        termID = "";
    }

    let classID = parseInt(data.classID);
    if (isNaN(classID))
    {
        classID = "";
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO TermClassDetails (termID, classID) VALUES (${termID}, ${classID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = "SELECT termclassdetailsID, CONCAT(Terms.term, ' ',Terms.yr) AS term, Classes.className AS class FROM TermClassDetails LEFT JOIN Terms ON TermClassDetails.termID = Terms.termID LEFT JOIN Classes ON TermClassDetails.classID = Classes.classID ORDER BY termclassdetailsID;";   
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// ---------------------
// ---Enrollment Details functions---
// ---------------------

// Enrollment Details ADD 
app.post('/add-enrollmentdetails-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let studentID = parseInt(data.studentID);
    if (isNaN(studentID))
    {
        return;
    }
    
    let classID = parseInt(data.classID);
    if (isNaN(classID))
    {
        return;
    }
    
// Create the enrollmentDetails query and run it on the database
    query1 = `INSERT INTO EnrollmentDetails (studentID, classID) VALUES ('${data.studentID}', '${data.classID}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = 'SELECT * FROM EnrollmentDetails;';
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// -- Citation for the following function:--
// -- Date: 5/25/2023 --
// -- Adapted from: --
// -- nodejs-starter-app/Step 7 - Dynamically Deleting Data

// Enrollmentdetails delete
app.delete('/delete-enrollmentdetail-ajax', function(req,res,next){
    let data = req.body;
    let enrollmentdetailsID = parseInt(data.id);
    let deleteEnrollmentDetails = `DELETE FROM EnrollmentDetails WHERE enrollmentID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteEnrollmentDetails, [enrollmentdetailsID], function(error, rows, fields){
            if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                  // Run the second query
                  db.pool.query(deleteEnrollmentDetails, [enrollmentdetailsID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      }
                      else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

  // Update enrollmentdetails 

  app.put('/put-enrollmentdetails-ajax', function(req,res,next){
    let data = req.body;
  
    let enrollmentID = parseInt(data.enrollmentID);
    //let enrollmentDate = parseInt(data.enrollmentDate);
    let studentID = parseInt(data.studentID);
    let classID = parseInt(data.classID);
  
    let queryUpdateEnrollment = `UPDATE EnrollmentDetails SET studentID = '${data.studentID}', classID = '${data.classID}' WHERE EnrollmentDetails.enrollmentID = '${data.enrollmentID}`;
    let selectStudent = `SELECT * FROM Students WHERE studentID = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateEnrollment, [], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectStudent, [studentID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// --------------------------------
// ---Students functions---
// --------------------------------
app.post('/add-student-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let majorID = parseInt(data.majorID);
    if (isNaN(majorID))
    {
        majorID = "";
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Students (firstName, lastName, userName, email, majorID) VALUES ('${data.firstName}', '${data.lastName}', '${data.userName}', '${data.email}', ${majorID})`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT
            query2 = 'SELECT * FROM Students;';
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});
// Student Delete 
app.delete('/delete-student-ajax', function(req,res,next){
    let data = req.body;
    let studentID = parseInt(data.id);
    let deleteStudent = `DELETE FROM Students WHERE studentID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteStudent, [studentID], function(error, rows, fields){
              if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
              else {
                    res.sendStatus(204);
                
              }
        })
});

// Student update -- unfunctional
app.put('/put-student-ajax', function(req,res,next){
    let data = req.body;
    console.log('submit')
    let studentID = parseInt(data.studentID)
    let firstName = data.firstName;
    let lastName = data.lastName;
    let userName = data.userName;
    let email = data.email;
    let majorID = parseInt(data.majorID);
  
    let queryUpdateStudent = `UPDATE Students SET studentID = ?, firstName = ?, lastName = ?, userName = ?, email = ?, majorID = ? WHERE Students.studentID = ?`;
    let selectMajor = 'SELECT * FROM Majors WHERE majorID = ?';
    // TODO: Update Majors
  
          db.pool.query(queryUpdateStudent, [studentID, firstName, lastName, userName, email, majorID], function(error, rows, fields){
            console.log(req.data)
            if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else
              {
                  db.pool.query(selectMajor, [majorID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

// --------------------------------
// ---Professors functions---
// --------------------------------

// Add professor 
app.post('/add-professor-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let deptID = parseInt(data.deptID);
    if (isNaN(deptID))
    {
        deptID = "";
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Professors (firstName, lastName, userName, email, deptID) VALUES ('${data.firstName}', '${data.lastName}', '${data.userName}', '${data.email}', ${deptID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT
            query2 = `SELECT * FROM Professors;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Professor
app.delete('/delete-professor-ajax', function(req,res,next){
    let data = req.body;
    let professorID = parseInt(data.id);
    let deleteProfessor = `DELETE FROM Professors WHERE professorID = ?`;
    // Note: professor can be deleted without deleting class
  
          // Run the 1st query
          db.pool.query(deleteProfessor, [professorID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
                
              }
            })
});
    

/*
    LISTENER
*/
// Note: This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

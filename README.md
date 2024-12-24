## The Online Fake University (TOFU) Database
The Online Fake University (TOFU) is an online university that serves 10,000 students across the world. TOFU has a 5:1 students to professor ratio, 2,000 professors in 10 departments teaching 4000 classes offering 100 different majors. Our web-based database management system tracks the number of students enrolled in each class by storing this information in an enrollment table. In addition, student’s majors are tracked within the student table and the professor table tracks information about the department they are associated with. This allows TOFU to have the most up-to-date information on classes, students, professors, departments and enrollments. This allows for TOFU to make informed decisions surrounding classes, which majors to offer and which professors work for which departments. This gives TOFU the required business intelligence to expand on popular classes, remove classes that are least popular, which majors have the most students and which departments need to hire professors.

## Description
Full stack web-based relational database app created for a fictional university as part of a collaborative two-person team for a class project. Developed front-end user interface using handlebars.js templating engine with HTML/CSS, ensuring a smooth interface for administrators. Implemented a Rest API using Node.js and Express, integrating front-end with an SQL-driven database back-end powered by MySQL/MariaDB. Designed and normalized a schema for a relational database, which was used to implement a website with CRUD functionality.

## Created By: 
Thomas Evans And Vanessa Dowd
Copyright © 2023. All rights reserved.

## Main Technologies
- JavaScript
- SQL
- Node.js
- Express
- Handlebars.js
- HTML5
- CSS

## Sources
Note: All code is based on the CS340 starter code, with the exception of: 

-- Citation for the following boilerplate:-- 
-- Date: 5/16/2023 -- 
-- Adapated from: https:replit.com/@PamVanLonden/a-Global-Stylesheet 

-- Citation for the following document:-- 
-- Date: 5/16/2023 -- 
-- Adapated from: https:www.w3schools.com/w3css/default.asp 

-- Citation for the following function in update_class.js and add_class.js:--
-- Date: 6/11/23 --
-- StackOverflow: Javascript checking for null vs. undefined and difference between--
-- Used this code to determine the best way to check is these two attributes were not entered. isNaN, === undefined, === null did not work.--
-- https:stackoverflow.com/questions/5101948/javascript-checking-for-null-vs-undefined-and-difference-between-and --

-- Citation for the following function in update_class.js and add_class.js:--
-- Date: 6/11/23 --
-- free code camp: Falsy Values in JavaScript--
-- Used this code to determine the best way to check is these two attributes were not entered. isNaN, === undefined, === null did not work.--
-- https:www.freecodecamp.org/news/falsy-values-in-javascript/ --

-- Citation for the location.reload() function:--
-- Date: 6/7/23 --
-- Window location.reload()--
-- Use this to reload a page after the information is entered (if it doesn't already automatically)
-- https:www.w3schools.com/jsref/met_loc_reload.asp --

-- Citation for the following function:--
-- Date: 5/23/2023 --
-- Adapted from: w3 docs --
-- Used this to set a min and/or a max for numbers that could be entered
-- https:www.w3docs.com/snippets/html/how-to-allow-only-positive-numbers-in-the-input-number-type.html --

-- Citation for the following function:--
-- Date: 6/11/23 --
-- Adapted from: mdn web docs --
-- Used this to determine when to use parseInt and why
-- https:developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt --

-- Citation for the following function:--
-- Date: 6/11/23 --
-- Adapted from: stack overflow:  Change text from "Submit" on input tag--
-- Used this to change the name on the submit button to more accurately reflect it's purpose. For example, changed "submit" to "add class" and "update class"
-- https:www.w3docs.com/snippets/html/how-to-allow-only-positive-numbers-in-the-input-number-type.html --

**OSU starter code (nodejs): **

 -- Citation for the following function:--
 -- Date: 5/10/2023 --
 -- Adapted from: nodejs-starter app on github step 0: setting up Node--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%200%20-%20Setting%20Up%20Node.js

 -- Citation for the following function:--
 -- Date: 5/10/2023 --
 -- Adapted from: nodejs-starter app on github step 1: Connecting to a MySQL Database--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database

 -- Citation for the following function:--
 -- Date: 5/23/2023 --
 -- Adapted from: nodejs-starter app on github step 2: Loading Data into database--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%202%20-%20Loading%20Data%20into%20the%20Database

 -- Citation for the following function:--
 -- Date: 5/23/2023 --
 -- Adapted from: nodejs-starter app on github step 3: Integrating a Templating Engine (handelbars)--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%203%20-%20Integrating%20a%20Templating%20Engine%20(Handlebars)

 -- Citation for the following function:--
 -- Date: 5/23/2023 --
 -- Adapted from: nodejs-starter app on github step 4: Dynamically Displaying Data--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data

 -- Citation for the following function:--
 -- Date: 5/23/2023 --
 -- Adapted from: nodejs starter app on github step 5: Adding New Data--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

 -- Citation for the following function:--
 -- Date: 5/23/2023 --
 -- Adapted from: nodejs starter app on github step 6: Dynamically Filling Dropdowns and Adding a Search Box--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box

 -- Citation for the following function:--
 -- Date: 5/23/2023 --
 -- Adapted from: nodejs starter app on github step 7: Dynamically Deleting data--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

 -- Citation for the following function:--
 -- Date: 6/9/2023 --
 -- Adapted from: nodejs starter app on github step 8: Dynamically Updating Data--
 -- https:github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

 ## Copyright © 2023
 The Online Fake University(TOFU) Database project was developed by Thomas Evans and Vanessa Dowd in Spring 2023. All Rights Reserved.

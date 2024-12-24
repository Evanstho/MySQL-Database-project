// -- Citation for the following function:--
// -- Date: 5/30/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 5 / adding new data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data --


// Get the objects we need to modify
let addDepartmentForm = document.getElementById('add-department-form-ajax');

// Modify the objects we need
addDepartmentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDeptName = document.getElementById("input-deptName");

    // Get the values from the form fields
    let deptNameValue = inputDeptName.value;

// -- Citation for the following: --
// -- Date: 6/11/23 --
// -- StackOverflow: Javascript checking for null vs. undefined and difference between --
// -- Used this code to determine the best way to check is these two attributes were not entered. isNaN, === undefined, === null did not work.
// --https://stackoverflow.com/questions/5101948/javascript-checking-for-null-vs-undefined-and-difference-between-and --

// -- Citation for the following: --
// -- Date: 6/11/23 --
// -- free code camp: Falsy Values in JavaScript--
// -- Used this code to determine the best way to check if these two attributes were not entered. isNaN, === undefined, === null did not work.
// --https://www.freecodecamp.org/news/falsy-values-in-javascript/ --
    
// check if deptNameValue value is falsy, returns if it is (since deptNameValue cannot be null)
    if (!deptNameValue) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        deptName: deptNameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-department-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputDeptName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("departments-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let deptIDCell = document.createElement("TD");
    let deptNameCell = document.createElement("TD");

    // Fill the cells with correct data
    deptIDCell.innerText = newRow.deptID;
    deptNameCell.innerText = newRow.deptName;

    // Add the cells to the row 
    row.appendChild(deptIDCell);
    row.appendChild(deptNameCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
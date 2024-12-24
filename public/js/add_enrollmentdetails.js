// // -- Citation for the following function:--
// -- Date: 5/25/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 5 / adding new data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data --

// -- Citation for the following function:--
// -- Date: 5/25/2023 --
// -- Adapted from: --
// -- nodejs-starter-app/Step 7 - Dynamically Deleting Data

// -- Citation for the following function:--
// -- Date: 5/25/2023 --
// -- Adapted from: nodejs-starter-app Step 8: Dynamically Updating Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data --

// -- Citation for the location.reload() function:--
// -- Date: 6/7/23 --
// --Window location.reload()--
// --Use this to reload a page after the information is entered (if it doesn't already automatically)
// --(https://www.w3schools.com/jsref/met_loc_reload.asp) --

// Get the objects we need to modify
let addenrollmentdetailsForm = document.getElementById("add-enrollmentdetails-form-ajax");

// Modify the objects we need
addenrollmentdetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    //let inputEnrollmentdetailsDate = document.getElementById("input-enrollmentdetailsDate");
    let inputStudentID = document.getElementById("input-studentName");
    let inputClassID = document.getElementById("input-className");
 
    // Get the values from the form fields
    //let enrollmentdetailsDateValue = inputEnrollmentdetailsDate.value;
    let studentIDValue = inputStudentID.value;
    let classIDValue = inputClassID.value;

    // Put our data we want to send in a javascript object
    let data = {
        //enrollmentdetailsDate: enrollmentdetailsDateValue,
        studentID: studentIDValue,
        classID: classIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-enrollmentdetails-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();

            // Clear the input fields for another transaction
            //inputEnrollmentdetailsDate.value = '';
            inputStudentID.value = '';
            inputClassID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("enrollmentdetails-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let enrollmentdetailsIDCell = document.createElement("TD");
    //let enrollmentDateCell = document.createElement("TD");
    let studentIDCell = document.createElement("TD");
    let classIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    enrollmentdetailsIDCell.innerText = newRow.enrollmentdetailsID;
    //enrollmentDateCell.innerText = newRow.EnrollmentDate;
    studentIDCell.innerText = newRow.StudentID;
    classIDCell.innerText = newRow.ClassID;

    // Delete Cells
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEnrollmentDetails(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(enrollmentdetailsIDCell);
    //row.appendChild(enrollmentDateCell);
    row.appendChild(studentIDCell);
    row.appendChild(classIDCell);

    // add a custom row attribute so the deleteROW
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

}

// -- Citation for the following functions:--
// --Date:6/1/2023 --
// -- Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data --
// -- nodejs-starter-app/Step 7 - Dynamically Deleting Data/ --

// -- Citation for the following function:--
// -- Date: 6/1/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 5 / adding new data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data --

// -- Citation for the following function:--
// -- Date: 6/1/2023 --
// -- Adapted from: nodejs-starter-app Step 8: Dynamically Updating Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data --

// -- Citation for the location.reload() function:--
// -- Date: 6/7/23 --
// --Window location.reload()--
// --Use this to reload a page after the information is entered (if it doesn't already automatically)
// --(https://www.w3schools.com/jsref/met_loc_reload.asp) --

// Get the objects we need to modify
let addProfessorForm = document.getElementById('add-professor-form-ajax');

// Modify the objects we need
addProfessorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-firstName");
    let inputLastName = document.getElementById("input-lastName");
    let inputUserName = document.getElementById("input-userName");
    let inputEmail = document.getElementById("input-email");
    let inputDeptID = document.getElementById("input-deptID");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let userNameValue = inputUserName.value;
    let emailValue = inputEmail.value;
    let deptIDValue = inputDeptID.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        userName: userNameValue,
        email: emailValue,
        deptID: deptIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-professor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputUserName.value = '';
            inputEmail.value = '';
            inputDeptID.value = '';
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
    let currentTable = document.getElementById("professors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let studentIDCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let userNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let deptIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    studentIDCell.innerText = newRow.studentID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    userNameCell.innerText = newRow.userName;
    emailCell.innerText = newRow.email;
    deptIDCell.innerText = newRow.deptID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteStudent(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(studentIDCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(userNameCell);
    row.appendChild(emailCell);
    row.appendChild(deptIDCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    // Add the row to the table
    currentTable.appendChild(row);
}
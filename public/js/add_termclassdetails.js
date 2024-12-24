// -- Citation for the following function:--
// -- Date: 6/1/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 5 / adding new data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data --

// -- Citation for the location.reload() function:--
// -- Date: 6/7/23 --
// --Window location.reload()--
// --Use this to reload a page after the information is entered (if it doesn't already automatically)
// --(https://www.w3schools.com/jsref/met_loc_reload.asp) --


// Get the objects we need to modify
let addTermClassDetailsForm = document.getElementById('add-termclassdetails-form-ajax');

// Modify the objects we need
addTermClassDetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTermID = document.getElementById("input-termID");
    let inputClassID = document.getElementById("input-classID");

    // Get the values from the form fields
    let termIDValue = inputTermID.value;
    let classIDValue = inputClassID.value;

    // check is termID and classID values are falsy, returns if it is (since termID and classID cannot be Null)
    if (!termIDValue) 
    {
        return;
    }

    if (!classIDValue) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        termID: termIDValue,
        classID: classIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-termclassdetails-ajax", true);
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
            inputHomeworld.value = '';
            inputAge.value = '';
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
    let currentTable = document.getElementById("termclassdetails-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let termclassdetailsIDCell = document.createElement("TD");
    let termIDCell = document.createElement("TD");
    let classIDCell = document.createElement("TD");

    // Fill the cells with correct data
    termclassdetailsIDCell.innerText = newRow.termclassdetailsID;
    termIDCell.innerText = newRow.termID;
    classIDCell.innerText = newRow.classID;

    // Add the cells to the row 
    row.appendChild(termclassdetailsIDCell);
    row.appendChild(termIDCell);
    row.appendChild(classIDCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
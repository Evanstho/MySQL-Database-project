// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 5 / adding new data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data --

// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 7 Dynamically Deleting Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data --

// -- Citation for the following function:--
// -- Date: 5/24/2023 --
// -- Adapted from: nodejs-starter-app Step 8: Dynamically Updating Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data --

// -- Citation for the location.reload() function:--
// -- Date: 6/7/23 --
// --Window location.reload()--
// --Use this to reload a page after the information is entered (if it doesn't already automatically)
// --(https://www.w3schools.com/jsref/met_loc_reload.asp) --

// Get the objects we need to modify; matches the id from classes.hbs
let addClassForm = document.getElementById('add-class-form-ajax');

addClassForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from; input matches the classes.hbs inputs
    let inputClassName = document.getElementById("input-className");
    let inputClassCredits = document.getElementById("input-classCredits");
    let inputProfessorID = document.getElementById("input-professorID");
    let inputDeptID = document.getElementById("input-deptID");

    // Get the values from the form fields and set them equal to new variable names to be used in the next step
    let classNameValue = inputClassName.value;
    let classCreditsValue = inputClassCredits.value;
    let professorIDValue = inputProfessorID.value;
    let deptIDValue = inputDeptID.value;

// -- Citation for the following: --
// -- Date: 6/11/23 --
// -- StackOverflow: Javascript checking for null vs. undefined and difference between--
// Used this code to determine the best way to check is these two attributes were not entered. isNaN, === undefined, === null did not work.
// --https://stackoverflow.com/questions/5101948/javascript-checking-for-null-vs-undefined-and-difference-between-and --

// -- Citation for the following: --
// -- Date: 6/11/23 --
// -- free code camp: Falsy Values in JavaScript--
// Used this code to determine the best way to check is these two attributes were not entered. isNaN, === undefined, === null did not work.
// --https://www.freecodecamp.org/news/falsy-values-in-javascript/ --
    
// check is class credits and class name values are falsy, returns if it is (since classCredits and className cannot be Null)
    if (!classCreditsValue) 
    {
        return;
    }

    if (!classNameValue) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        className: classNameValue,
        classCredits: classCreditsValue,
        professorID: professorIDValue,
        deptID: deptIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-class-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            location.reload();

            // Clear the input fields for another transaction
            inputClassName.value = '';
            inputClassCredits.value = '';
            inputProfessorID.value = '';
            inputDeptID.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from classes
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("classes-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let classIDCell = document.createElement("TD");
    let classNameCell = document.createElement("TD");
    let classCreditsCell = document.createElement("TD");
    let professorIDCell = document.createElement("TD");
    let deptIDCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    classIDCell.innerText = newRow.classID;
    classNameCell.innerText = newRow.className;
    classCreditsCell.innerText = newRow.classCredits;
    professorIDCell.innerText = newRow.professorID;
    deptIDCell.innerText = newRow.deptID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePerson(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(classIDCell);
    row.appendChild(classNameCell);
    row.appendChild(classCreditsCell);
    row.appendChild(professorIDCell);
    row.appendChild(deptIDCell);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (classID),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.value = newRow.classID;
    option.text = newRow.classID;
    selectMenu.add(option);
}

// -- Citation for the following function:--
// -- Date: 5/24/2023 --
// -- Adapted from: nodejs-starter-app Step 8: Dynamically Updating Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data --



// Get the objects we need to modify
let updateClassForm = document.getElementById('update-class-form-ajax');

// Modify the objects we need
updateClassForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputClassID = document.getElementById("mySelect");
    let inputClassName = document.getElementById("input-className-update");
    let inputClassCredits = document.getElementById('input-classCredits-update');
    let inputProfessor = document.getElementById("input-professor-update");
    let inputDepartment = document.getElementById("input-department-update");

    // Get the values from the form fields
    let classIDValue = inputClassID.value;
    let classNameValue = inputClassName.value;
    let classCreditsValue = inputClassCredits.value;
    let professorValue = inputProfessor.value;
    let departmentValue = inputDepartment.value;

// -- Citation for the following:--
// -- Date: 6/11/23 --
// -- StackOverflow: Javascript checking for null vs. undefined and difference between--
// --https://stackoverflow.com/questions/5101948/javascript-checking-for-null-vs-undefined-and-difference-between-and --

// -- Citation for the following:--
// -- Date: 6/11/23 --
// -- free code camp: Falsy Values in JavaScript--
// --https://www.freecodecamp.org/news/falsy-values-in-javascript/ --
    
// check is class credits and class name values are falsy
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
        classID: classIDValue,
        className: classNameValue,
        classCredits: classCreditsValue,
        professor: professorValue,
        department: departmentValue,
    }
        
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-class-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, classIDValue);
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("classes-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == classID) {

            // Get the location of the row where we found the matching class ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of department value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign department to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
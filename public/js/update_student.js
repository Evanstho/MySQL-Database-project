// -- Citation for the following function:--
// -- Date: 6/1/2023 --
// -- Adapted from: nodejs-starter-app Step 8: Dynamically Updating Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%204%20-%20Dynamically%20Displaying%20Data --

// Get the objects we need to modify
let updateStudentForm = document.getElementById("update-student-form-ajax");

// Modify the objects we need
updateStudentForm.addEventListener("submit", function (e) {
    console.log("click")
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputStudentID = document.getElementById("input-studentID-update");
    let inputFirstName = document.getElementById("input-firstName-update");
    let inputLastName = document.getElementById("input-lastName-update");
    let inputUserName = document.getElementById("input-userName-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputMajorID = document.getElementById("input-majorID-update");

    // Get the values from the form fields
    let studentIDValue = inputStudentID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let userNameValue = inputUserName.value;
    let emailValue = inputEmail.value;
    let majorIDValue = inputMajorID.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        studentID: studentIDValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        userName: userNameValue,
        email: emailValue,
        majorID: majorIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-student-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, studentIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, studentID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("students-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == studentID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].studentID;
            td.innerHTML = parsedData[0].firstName;
            td.innerHTML = parsedData[0].lastName;
            td.innerHTML = parsedData[0].userName;
            td.innerHTML = parsedData[0].email;
            td.innerHTML = parsedData[0].majorID; 
       }
    }
}
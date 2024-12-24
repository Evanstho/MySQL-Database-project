// -- Citation for the following functions: --
// -- Date: 5/25/2023 --
// -- Adapted from: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data --
// -- nodejs-starter-app/Step 8 - Dynamically Updating Data --

// Get the objects we need to modify
let updateEnrollmentDetailsForm = document.getElementById("update-enrollmentdetails-form-ajax");

// Modify the objects we need
updateEnrollmentDetailsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEnrollmentID = document.getElementById("input-enrollmentID-update");
    //let inputEnrollmentDate = document.getElementById("input-enrollmentdetailsDate-update");
    let inputStudentID = document.getElementById("input-studentID-update");
    let inputClassID = document.getElementById("input-classID-update");

    // Get the values from the form fields
    let EnrollmentIDValue = inputEnrollmentID.value;
    //let EnrollmentDateValue = inputEnrollmentDate;
    let StudentIDValue = inputStudentID.value;
    let ClassIDValue = inputClassID.value;

    // Put our data we want to send in a javascript object
    let data = {
        EnrollmentID: EnrollmentIDValue,
        //EnrollmentDate: EnrollmentDateValue,
        studentID: StudentIDValue,
        ClassID: ClassIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-enrollmentdetails-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, EnrollmentIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, enrollmentdetailsID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("enrollmentdetails-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       // Iterate through rows
       // Rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == enrollmentdetailsID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}
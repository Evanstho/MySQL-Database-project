// -- Citation for the following function:--
// -- Date: 6/1/2023 --
// -- Adapted from: --
// -- nodejs-starter-app/Step 7 - Dynamically Deleting Data

// -- Citation for the location.reload() function:--
// -- Date: 6/7/23 --
// --Window location.reload()--
// --Use this to reload a page after the information is entered (if it doesn't already automatically)
// --(https://www.w3schools.com/jsref/met_loc_reload.asp) --

function deleteProfessor(professorID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: professorID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-professor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
            // Add the new data to the table
            deleteRow(professorID);
            location.reload();                  //allows page to actively reload
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(professorID){
  
    let table = document.getElementById("professors-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       // Iterate through rows
       // Rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == professorID) {
            table.deleteRow(i);
            break;
       }
    }
  }
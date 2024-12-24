// -- Citation for the following function:--
// -- Date: 5/23/2023 --
// -- Adapted from: OSUC-CS 340 ecampus node js starter app instructions: step 7 Dynamically Deleting Data--
// -- https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data --

// -- Citation for the location.reload() function:--
// -- Date: 6/7/23 --
// --Window location.reload()--
// --Use this to reload a page after the information is entered (if it doesn't already automatically)
// --(https://www.w3schools.com/jsref/met_loc_reload.asp) --



function deleteClass(classID) {
    let link = '/delete-class-ajax/';
    let data = {
      id: classID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(classID);
        location.reload();
      }
    });
  }
  
  function deleteRow(classID){
      let table = document.getElementById("classes-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == classID) {
              table.deleteRow(i);
              break;
         }
      }
  }
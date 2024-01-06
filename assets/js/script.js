// Requirements
// ------------

// !Display the current day at the top of the calender when a user opens the planner.

// !Present time blocks for standard business hours when the user scrolls down.

// !Color-code each time block based on past, present, and future when the time block is viewed.

// Allow a user to enter an event when they click a time block

// Save the event in local storage when the save button is clicked in that time block.

// Persist events between refreshes of a page


// Pseudocode
// ----------

// function to get data from localStorage and save in a variable for populating time-blocks

// function to render time blocks during work hours, add descriptions and appropriate past/present/future classes for each row

// Add event listener to save button clicks for saving hour and description data to localStorage

// Set start and end work hours as integers (9 = 9am, 17 = 5pm)
const intStartTime = 0;
const intEndTime = 23;

// Get date/time now
const now = dayjs();

// Render time block work hours
function renderTimeBlocks() {

  for (i = intStartTime; i <= intEndTime; i++){
    
    // Get formatted hours
    const padHour = String(i).padStart(2, '0');
    const textHour = now.hour(i).format('hA');
    const currentHour = now.hour();
    
    let classHour = "";

    // Get time block class
    if (currentHour === i){
      classHour = "present";
    }else if (currentHour > i) {
      classHour = "past";
    } else {
      classHour = "future";
    }

    // Append time block 
    $("#time-blocks").append(`    
      <div id="hour-${padHour}" class="row time-block ${classHour}">
        <div class="col-2 col-md-1 hour">${textHour}</div>
        <textarea class="col-8 col-md-10 description"></textarea>
        <div class="col-2 col-md-1 saveBtn">
          <i class="bi bi-save"></i>
        </div>
      </div>
    `);
  }
}

// Run once DOM is loaded
$(function() {

  // Add today's date in the currentDay tag
  $("#currentDay").text(now.format('dddd, MMMM D'));

  // Render time block work hours
  renderTimeBlocks();

});


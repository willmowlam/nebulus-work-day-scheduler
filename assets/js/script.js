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

// Add event listener to save button clicks for saving hour and description data to localStorage

// Set start and end work hours as integers (9 = 9am, 17 = 5pm)
const intStartTime = 0;
const intEndTime = 23;

// Get date/time now
const now = dayjs();

// Array to hold all event data
let eventData = [];

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
        <textarea class="col-8 col-md-10 description">${getEvent(i)}</textarea>
        <div class="col-2 col-md-1 saveBtn">
          <i class="bi bi-save"></i>
        </div>
      </div>
    `);
  }
}

// Save event to local storage
function setEvent(hour, description) {

  getEvents();

  // Save event data to the array
  description = description.trim();
 
  // Track if found in array
  let found = false;
  for (let i = 0; i < eventData.length; i++) {
    const el = eventData[i];
    if (el.h = hour) {
      found = true;
      el.d = description;
    }    
  }
  // If there was no hour found then push a new value to the array
  if (!found) {
    // Create an event object
    const event = { h: hour, d: description };
    eventData.push(event);
  }

  // Save the object array to local storage
  localStorage.setItem('event-schedule', JSON.stringify(eventData));
   
}

// Return a single event read from the event array
function getEvent(hour){
  
  // Find the hour key in the event array
  const event = eventData.find(function(event){ 
    return event.h === hour;
  });

  // Return the description if the event was found
  return event ? event.d : "";

}

// Read events from local storage
function getEvents() {
  
  // Read and save all event data from local storage to an object array (or an empty array if none exists)
  eventData = JSON.parse(localStorage.getItem('event-schedule')) || [];

}

// Run once DOM is loaded
$(function() {

  // Add today's date in the currentDay tag
  $("#currentDay").text(now.format('dddd, MMMM D'));
  setEvent(1,"test");
  setEvent(1,"new value");
  // Render time block work hours
  renderTimeBlocks();

});


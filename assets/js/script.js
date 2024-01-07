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
        <span class="col-2 col-md-1 hour">${textHour}</span>
        <textarea class="col-8 col-md-10 description">${getEvent(i)}</textarea>
        <div class="col-2 col-md-1 saveBtn" title="Save">
          <i class="bi bi-check-square"></i>
        </div>
      </div>
    `);
  }
}

// Save event to local storage
function setEvent(hour, description) {

  // Convert hour to numeric
  hour = parseInt(hour, 10);

  // Tidy up the description
  description = description.trim();
 
  // Track if found in array
  let found = false;
  for (let i = 0; i < eventData.length; i++) {
    const el = eventData[i];
    const h = parseInt(el.h, 10);
    if (h === hour) {
      found = true;

      // Save description (if not en empty string)
      if ("" === description) {
        eventData.splice(i, 1);
      } else {
        el.d = description;
      }
    }    
  }

  // If there was no hour found then add a new event to the event array
  if ((!found) && (description)) {
    // Create an event object
    const event = { h: hour, d: description };
    eventData.push(event);
  }

  // Save the event object array to local storage
  localStorage.setItem('event-schedule', JSON.stringify(eventData));
   
}

// Return a single event read from the event array
function getEvent(hour){

  // Find the hour key in the event array
  let event = eventData.find(function(e) { 
    return e.h == hour;
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

  // Read events from local storage
  getEvents();

  // Render time block work hours
  renderTimeBlocks();

  // Listen for save button click
  $("#time-blocks").on("click", ".saveBtn", function() {

    // Get hour from parent id eg "hour-12"
    let h = $(this).parent().attr("id");

    // Get the value of the textarea in the row
    let d = $(this).siblings(".description").val();

    // Extract the numerical part from the hour using regex
    h = h.replace(/\D/g, '');

    // Save event
    setEvent(h, d);
  });

});


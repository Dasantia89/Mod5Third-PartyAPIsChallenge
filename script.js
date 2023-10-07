// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var schedule;
var now;
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // A Save button has been clicked 
  $('.container-lg').on('click', '.saveBtn', saveSchedule);



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //


  // TODO: Add code to display the current date in the header of the page.
});

// On save button click, save entry to local storage
function saveSchedule(event) {
  
  var entry = {
    val: $(this).siblings('.description').val(),
    hour: $(this).parent().attr('id'),
    amPm: $(this).siblings('.hour').text()
  }

  if(entry.val.length >1){
  getSchedule();
  for(var x=0; x<schedule.length; x++){
    if(schedule[x].hour === entry.hour){
      schedule[x].val = entry.val;
    }
  }
  localStorage.setItem('schedule',JSON.stringify(schedule));
  }
  else{
    alert('You didn\'t enter anything.');
  }
}

function getSchedule (){
  schedule = JSON.parse(localStorage.getItem("schedule")) || [
    {val: '', hour: 9, amPm : '9AM'},
    {val: '', hour: 10, amPm : '10AM'},
    {val: '', hour: 11, amPm : '11AM'},
    {val: '', hour: 12, amPm : '12AM'},
    {val: '', hour: 1, amPm : '1PM'},
    {val: '', hour: 2, amPm : '2PM'},
    {val: '', hour: 3, amPm : '3PM'},
    {val: '', hour: 4, amPm : '4PM'},
    {val: '', hour: 5, amPm : '5PM'}
  ];
}
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var schedule;
var now;

$(function () {

now = dayjs().hour();
getSchedule ();
displaySchedule();
  // A Save button has been clicked 
  $('.container-lg').on('click', '.saveBtn', saveSchedule);

  // Display the current date in the header of the page.
  $('#currentDay').text(dayjs().format('dddd, MMMM DD'));
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
    if(schedule[x].hour == entry.hour){
      schedule[x].val = entry.val;
    }
  }
  console.log(schedule);
  localStorage.setItem('schedule',JSON.stringify(schedule));
  }
  else{
    alert('You didn\'t enter anything.');
  }
}

// Retrieve schedule from localstorage or create one with default values if non stored
function getSchedule (){
  schedule = JSON.parse(localStorage.getItem("schedule")) || [
    {val: '', hour: 9, amPm : '9AM'},
    {val: '', hour: 10, amPm : '10AM'},
    {val: '', hour: 11, amPm : '11AM'},
    {val: '', hour: 12, amPm : '12AM'},
    {val: '', hour: 13, amPm : '1PM'},
    {val: '', hour: 14, amPm : '2PM'},
    {val: '', hour: 15, amPm : '3PM'},
    {val: '', hour: 16, amPm : '4PM'},
    {val: '', hour: 17, amPm : '5PM'}
  ];
}

// Create Elements to display the schedule and append them to the document
function displaySchedule(){
  var time; 
  for(var x = 0; x<schedule.length; x++){
    if(schedule[x].hour > now){
      time = 'future';
    }else if(schedule[x].hour == now){
      time = 'present';
    }else{
      time = 'past';
    }
    $(`<div id='${schedule[x].hour}' class = 'row time-block ${time}'>`).appendTo('#holder');
    $(`<div class="col-2 col-md-1 hour text-center py-3">${schedule[x].amPm}</div>`).appendTo(`#${schedule[x].hour}`);
    $(`<textarea class="col-8 col-md-10 description" rows="3">${schedule[x].val}</textarea>`).appendTo(`#${schedule[x].hour}`);
    $('<button class="btn saveBtn col-2 col-md-1" aria-label="save"> <i class="fas fa-save" aria-hidden="true"></i></button>').appendTo(`#${schedule[x].hour}`);
  
  }
}
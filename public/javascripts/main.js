// stuff

/*
 * @TODO:
 * 1) Add proper namespacing
 * 2)

*/

//add handlers to the selected elements
function addHandlers() {
  var email_inputs = document.querySelectorAll('.validate_email');
  var currency_inputs = document.querySelectorAll('.format_currency');
  var nav_buttons = document.querySelectorAll('.nav-btn');

  //attach keyup handlers for e-mail validation
  for (var i=0; i < email_inputs.length; i++) {
    email_inputs[i].addEventListener('keyup', validateEmail);
  }

  //attach keyup handlers for currency formatting
  for (var j=0; j < currency_inputs.length; j++) {
    currency_inputs[j].addEventListener('keyup', formatCurrency);
  }

  //attach click listeneners for nav butons
  for (var k=0; k < nav_buttons.length; k++) {
    nav_buttons[k].addEventListener('click', switchScreenHandle);
  }


}

//form validation handlers

//desc:
function validateEmail(e) {
  //if it passes
  var val = e.target.value;

  //valid e-mail address?
  if ( val.match(/\w+@\w+\..+/g) ) {
    e.target.classList.add('valid');
    e.target.classList.remove('invalid');
  } else {
    e.target.classList.add('invalid');
    e.target.classList.remove('valid');
  }

}

//desc:
function formatCurrency(e) {
  var val = e.target.value;

  //strip out the commas
  val = val.replace(/(,|\$)/g, "");
  //TODO: figure out what this regex actually does.
  e.target.value = "$" + val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

  //FIXME: the replace shouldn't happen if you simply cursor over something...


  // console.log("result", result);
}

//navigation
function switchScreenHandle(e) {
  var dest_screen = e.target.dataset.target;
  var screen_array = [];

  //convert them to array
  screen_array = dest_screen.split(",");



  //loop through and chain these
  for (var i = 0; i < screen_array.length; i++) {
    var target_screen = screen_array[i];
    var delay = null;

    if (i > 0) delay = 700; //add a delay if not first one, so it's chained

    switchScreen(target_screen, delay);
  }






  //chain them, after .5 sec delay
}

function switchScreen(el, delay) {
  //hide the current screen

  //delay until the first one is done...FIXME: This would be cleaner with events
  //hide all screens that are visible

  if (delay) {
    setTimeout(showScreen, delay);
  } else {
    showScreen();
  }



  //hides all visible screens
  function hideOtherScreens() {
    var els = document.querySelectorAll('.screen:not(.hidden)'); //get all screens that are not hidden
    for (var i = 0; i < els.length; i++) {
      if (el ===  els[i].id) continue; //don't hide the one that's active right now
      els[i].classList.add('hidden');
    }
  }

  //shows a specific screen
  function showScreen(){
    setTimeout(hideOtherScreens, 500);
    var screen_node = document.getElementById(el);
    screen_node.classList.remove('hidden');
  }
} //switchScreen

function chainScreenTransitions() {

}


//init
addHandlers();

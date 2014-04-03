// stuff

/*
 * @TODO:
 * 1) Add proper namespacing
 * 2) consider splitting this up as it serves 3 purposes. Validation, navigation, infinite scroll

*/


/**
 * LOAD HISTORY
 *
 **/
function addHistoryHandlers() {
  //add infinite scroll on history
  var scrollEl = document.querySelector('.screen.send_history .body');
  // var loadMsg = document.querySelector('.screen.send_history .body .load_more_msg');
  scrollEl.addEventListener('scroll', function (e) {

    var el = e.target;
    var scrollPercentage = 100 * el.scrollTop / (el.scrollHeight-el.clientHeight);

    //if we're scrolled all the way, load more content
    if (scrollPercentage > 99) {
      //delay for visual effect
      setTimeout(loadMoreHistory, 500);
    }
  });
}

//TODO: fetch the starting point
function loadMoreHistory(e) {

  var start_num = parseInt(document.getElementById('transaction_container').dataset.count);
  console.log('FIRING ONE', start_num);
  // console.log('loadMoreHistroy');
  //fetch the data via ajax call
  makeAjaxCall('/history/' + start_num, function(resp) {
    if (resp.status !== 200) return console.log('Error fetching history data.');
    resp = JSON.parse(resp.response);
    console.log("length", resp.length);
    injectIntoDom(resp);
  });

}

//prep for dom insertion
//inject into dom
function injectIntoDom(data) {
  // console.log('data', data);
  var history_table = document.getElementById('transaction_container');
  var templ = document.getElementById("history_template").innerHTML;
  var output = "";

  for (var i=0; i < data.length; i++) {
    // console.log('data[i]', data[i]);
    var row = templ;
    row = row.replace('$$date$$', data[i].date);
    row = row.replace('$$title$$', data[i].title);

    if(data[i].currency === "USD") data[i].amount = "$" + data[i].amount; //currency prefix
    row = row.replace('$$amount$$', data[i].amount);

    output += row;
  }

  //
  if (data.length === 0) {
    document.getElementById('load_more').innerHTML = "All out. No more history.";
    return;
  }

  //inject into dom
  var curr_data = history_table.innerHTML;
  history_table.innerHTML = curr_data + output;
  //update the row count
  history_table.dataset.count = parseInt(history_table.dataset.count) + data.length; //since i number of new rows were inserted
}

function makeAjaxCall(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if(xhr.readyState < 4) return;

    if(xhr.status !== 200) return;


    // all is well
    if(xhr.readyState === 4) cb(xhr);
  };

  xhr.open('GET', url, true);
  xhr.send('');
}

/**
 * VALIDATION HANDLERS
 *
 **/

//add handlers to the selected elements
function addValidationHandlers() {
  var email_inputs = document.querySelectorAll('.validate_email');
  var currency_inputs = document.querySelectorAll('.format_currency');
  var currency_selection = document.querySelector('.send_curr');
  var clear_form_button = document.querySelector('.btn-clear-form');


  //attach keyup handlers for e-mail validation
  for (var i=0; i < email_inputs.length; i++) {
    email_inputs[i].addEventListener('keyup', validateEmail);
  }

  //attach keyup handlers for currency formatting
  for (var j=0; j < currency_inputs.length; j++) {
    currency_inputs[j].addEventListener('keyup', formatCurrency);
  }

  currency_selection.addEventListener('change', changeCurrency);

  clear_form_button.addEventListener('click', clearForm);


}

//form validation handlers
function clearForm(e) {
  document.getElementById('send_form').reset();
  var e_mail_input = document.querySelector('.send_to_container .send_to');
  e_mail_input.classList.remove('valid');
  e_mail_input.classList.remove('invalid');
}


//desc:
function validateEmail(e) {
  //if it passes
  var val = e.target.value;

  //if value is blank, remove all indicators
  if (val === "") {
    e.target.classList.remove('valid');
    e.target.classList.remove('invalid');
    return;
  }

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
function formatCurrency() {
  var el = document.getElementById('send_amt');
  var val = el.value;
  var currency = document.getElementById('send_curr_selector').value;

  val = val.replace(/([^\.\d])/g, ""); //take out everything EXCEPT digits, and dots

  el.value = currency + val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  //FIXME: the replace shouldn't happen if you simply cursor over something...
}


function changeCurrency(e) {
  formatCurrency();
}

/**
 * NAVIGATION HANDLERS
 *
 **/
function addNavHandlers() {
    var nav_buttons = document.querySelectorAll('.nav-btn');
    //attach click listeneners for nav butons
    for (var k=0; k < nav_buttons.length; k++) {
      nav_buttons[k].addEventListener('click', switchScreenHandle);
    }
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




//init
addValidationHandlers();
addNavHandlers();
addHistoryHandlers();

//load the first history dataset in
loadMoreHistory(0);

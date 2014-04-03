
/**
 * VALIDATION HANDLERS
 *
 **/
;(function(){
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


  //Validates an e-mail form
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

  //Validates a currency form
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

  //init
  addValidationHandlers();
}());

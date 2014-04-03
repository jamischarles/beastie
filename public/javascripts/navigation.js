
/**
 * NAVIGATION HANDLERS. This handles screen navigation (slide in & out)
 *
 **/
;(function(){
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
    //FIXME: This would be cleaner with events
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
  addNavHandlers();
}());

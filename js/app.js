  // js/app.js

  var app = app || {};
  var ENTER_KEY = 13;

  $(function() {

  	localStorage.removeItem('results-backbone');

    // Kick things off by creating the **App**.
    new app.AppView();

  });
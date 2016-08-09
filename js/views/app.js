
var app = app || {};

// Create a view for the application.
app.AppView = Backbone.View.extend({

	// Bind this view to the element with an id of `tracker-app`.
	el: '#tracker-app',

	// Declare and initialize a set of events.
	events: {
		'keypress #new-food-item': 'retrieveSearchResults'
	},

	// A function that initializes the main view of the application when a new app.AppView object is created.
	initialize: function() {

		// Use jQuery to grab the elements that are of interest and store them in variables.
		this.$input = this.$('#new-food-item');
		this.$results = this.$('#search-results');
		this.$main = this.$('#main');
		this.$calories = this.$('#total-calories');

		// Add listeners to the view to perform functions and to re-render the view when necessary.
		this.listenTo(app.Results, 'add', this.addOneResult);
		this.listenTo(app.Foods, 'add', this.addOneFood);

		this.listenTo(app.Foods, 'remove', this.recalculateCalories);

		this.listenTo(app.Results, 'all', this.render);
		this.listenTo(app.Foods, 'all', this.render);

		// Grab the food models that have persisted from the last page load.
		app.Foods.fetch();
	},

	// A function to render the view of the application.
	render: function() {

	  // If there are food items from the last page load, show them and the total calories;
	  // otherwise, they will contain no content, so hide them.
      if ( app.Foods.length > 0 ) {
        this.$main.show();
        this.$calories.show();
      } else {
        this.$main.hide();
        this.$calories.hide();
      }
    },

    // A function to create a view for an individual result.
    addOneResult: function(result) {
    	
    	// Create the view for the result and append it to the application view.
    	var resultView = new app.ResultView({model: result});
    	$('#search-results').append(resultView.render().el);
    },

    // A function to create a view for an individual food item.
    addOneFood: function(food) {
    	
    	// Create the view for the food item, append it to the application view,
    	// and calculate the total calories of all of the food listed in the view.
    	var foodView = new app.FoodView({model: food});
    	$('#food-list').append(foodView.render().el);
    	$('#calorie-count').text(app.Foods.calculateCalories());
    },

    // A function to retrieve the search results that match the given string from the input box.
    retrieveSearchResults: function(event) {

    	// If the key that was pressed was not the enter key or the input box was empty, keep accepting input from the input box.
    	if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        	return;
      	}

      	// Remove the previous results from the collection.
      	app.Results.remove(app.Results.models);

      	// Create the string that will be used to make an ajax request.
    	var nutritionixURL = 'https://api.nutritionix.com/v1_1/search/' + this.$input.val() + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=8fee4a77&appKey=2d4567a307d2784c203ac27ccd6f5e5c';

    	// Set the timeout for the request.
    	var nutritionixTimeoutRequest = setTimeout(function() {
    		$('#search-results').text('Failed to find nutrition resources');
    	}, 4000);

    	// Make the ajax request that will return a JSON object.
    	$.ajax(nutritionixURL, {
    		dataType: 'json',
    	}).done(function(data) {

    		// When the data arrives, store the array of results in a variable and create a model for each result.
    		var foodItems = data.hits;
    		for (var i = 0; i < data.hits.length; i++) {
    			app.Results.create({name: foodItems[i].fields.item_name, calorieCount: foodItems[i].fields.nf_calories});
    		}

    		// We have finished the result, so clear the timeout.
    		clearTimeout(nutritionixTimeoutRequest);
    	});

    	// Clear the search bar for the next search.
    	this.$input.val('');

    },

    // A function to recalculate the total calories from the collection of food items when a food item is removed.
    recalculateCalories: function() {
    	$('#calorie-count').text(app.Foods.calculateCalories());
    }

});
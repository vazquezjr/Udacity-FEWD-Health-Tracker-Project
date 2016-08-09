
var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#tracker-app',

	events: {
		'keypress #new-food-item': 'retrieveSearchResults'
	},

	initialize: function() {
		this.$input = this.$('#new-food-item');
		this.$results = this.$('#search-results');
		this.$main = this.$('#main');
		this.$calories = this.$('#total-calories');

		this.listenTo(app.Results, 'add', this.addOneResult);
		this.listenTo(app.Foods, 'add', this.addOneFood);

		this.listenTo(app.Foods, 'remove', this.recalculateCalories);

		this.listenTo(app.Results, 'all', this.render);
		this.listenTo(app.Foods, 'all', this.render);

		app.Foods.fetch();
	},

	render: function() {
      if ( app.Foods.length > 0 ) {
        this.$main.show();
        this.$calories.show();
      } else {
        this.$main.hide();
        this.$calories.hide();
      }
      /*if ( app.Results.length ) {
      	//console.l
      	for (var i = 0; i < app.Results.length; i++)
      		this.addOneResult(app.Results.at(i));
      }*/

    },

    addOneResult: function(result) {
    	//console.log(result);
    	var resultView = new app.ResultView({model: result});
    	$('#search-results').append(resultView.render().el);
    },

    addOneFood: function(food) {
    	//console.log(food);
    	var foodView = new app.FoodView({model: food});
    	$('#food-list').append(foodView.render().el);
    	//console.log(app.Foods.calculateCalories());
    	$('#calorie-count').text(app.Foods.calculateCalories());
    },

    /*newResult: function(itemName, calories) {
    	return {
    		name: itemName,
    		calorieCount: calories
    	};
    },*/

    retrieveSearchResults: function(event) {

    	if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        	return;
      	}

      	app.Results.remove(app.Results.models);

    	var nutritionixURL = 'https://api.nutritionix.com/v1_1/search/' + this.$input.val() + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=8fee4a77&appKey=2d4567a307d2784c203ac27ccd6f5e5c';

    	var nutritionixTimeoutRequest = setTimeout(function() {
    		$('#search-results').text('Failed to find nutrition resources');
    	}, 4000);

    	$.ajax(nutritionixURL, {
    		dataType: 'json',
    	}).done(function(data) {
    		var foodItems = data.hits;
    		for (var i = 0; i < data.hits.length; i++) {
    			app.Results.create({name: foodItems[i].fields.item_name, calorieCount: foodItems[i].fields.nf_calories});
    		}

    		clearTimeout(nutritionixTimeoutRequest);
    	});

    	this.$input.val('');

    },

    recalculateCalories: function() {
    	$('#calorie-count').text(app.Foods.calculateCalories());
    }

});
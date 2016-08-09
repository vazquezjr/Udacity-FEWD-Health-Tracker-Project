
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

		this.listenTo(app.Results, 'add', this.addOneResult);

		this.listenTo(app.Food, 'add', this.addOne);
		this.listenTo(app.Food, 'reset', this.addAll);

		this.listenTo(app.Results, 'all', this.render);

		app.Results.fetch();
	},

	render: function() {
      if ( app.Food.length ) {
        this.$main.show();
      } else {
        this.$main.hide();
      }
      /*if ( app.Results.length ) {
      	//console.l
      	for (var i = 0; i < app.Results.length; i++)
      		this.addOneResult(app.Results.at(i));
      }*/

    },

    addOneResult: function(result) {
    	var resultView = new app.ResultView({model: result});
    	$('#search-results').append(resultView.render().el);
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

    	$.ajax(nutritionixURL, {
    		dataType: 'json',
    	}).done(function(data) {
    		var foodItems = data.hits;
    		for (var i = 0; i < data.hits.length; i++) {
    			app.Results.create({name: foodItems[i].fields.item_name, calorieCount: foodItems[i].fields.nf_calories});
    		}
    	});

    	this.$input.val('');

    }

});
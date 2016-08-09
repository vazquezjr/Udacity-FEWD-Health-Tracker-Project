
var app = app || {};

// Create a model for each individual food item.
app.Food = Backbone.Model.extend({

	// Set the default attributes for the model.
	defaults: {
		name: '',
		calorieCount: 0
	}

});
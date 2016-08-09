
var app = app || {};

// Create a model for each individual search result.
app.Result = Backbone.Model.extend({

	// Set the default attributes for the model.
	defaults: {
		name: '',
		calorieCount: 0
	}

});
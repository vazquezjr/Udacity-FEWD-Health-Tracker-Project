
var app = app || {};

// Create a collection of food items.
var FoodList = Backbone.Collection.extend({
	
	// Associate a model for the collection.
	model: app.Food,

	// Create a LocalStorage object for the collection.
	localStorage: new Backbone.LocalStorage('food-backbone'),

	// A function that calculates the total calories of all of the food items in this collection.
	calculateCalories: function() {
		
		// Declare a local variable.
		var totalCalories = 0;

		// Add the calories of all of the food items to the local variable.
		for (var i = 0; i < this.length; i++) {
			totalCalories += this.models[i].attributes.calorieCount;
		}

		// Return the result.
		return totalCalories;
	}

});

// Create a new collection of food items.
app.Foods = new FoodList();
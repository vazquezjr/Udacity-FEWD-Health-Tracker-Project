
var app = app || {};

var FoodList = Backbone.Collection.extend({
	
	model: app.Food,

	localStorage: new Backbone.LocalStorage('food-backbone'),

	calculateCalories: function() {
		//console.log(this);
		var totalCalories = 0;

		for (var i = 0; i < this.length; i++) {
			totalCalories += this.models[i].attributes.calorieCount;
		}

		return totalCalories;
	}

});

app.Foods = new FoodList();
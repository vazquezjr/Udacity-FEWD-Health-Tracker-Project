
var app = app || {};

// Create a view for the individial search results.
app.ResultView = Backbone.View.extend({

	// Associate the li tag for each view.
	tagName: 'li',

	// Associate a template used for creating each view.
	template: _.template($('#result-template').html()),

	// Declare and instantiate a set of events.
	events: {
		'click .result-view': 'addFood'
	},

	// Initialize this view by having it listen to changes in its model.
	initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'remove', this.clear);
    },

    // Render this view by creating the html using the template and the attributes of its model.
	render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      
      return this;
    },

    // Create a model for the food item using the model of the search result chosen and remove the views of the search results.
    addFood: function(result) {
    	app.Foods.create({name: this.model.attributes.name, calorieCount: this.model.attributes.calorieCount});
    	app.Results.remove(app.Results.models);
    },

    // Destroy the model of the search result.
    clear: function() {
    	this.model.destroy();
    }

}); 
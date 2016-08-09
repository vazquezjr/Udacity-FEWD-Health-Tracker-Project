
var app = app || {};

// Create a view for each individual food item.
app.FoodView = Backbone.View.extend({

  // Associate the <li> tag for each food item view.
	tagName: 'li',

  // Associate a template to use when creating each food item view.
	template: _.template($('#result-template').html()),

  // Declare and instantiate a set of events.
	events: {
		'click .result-view': 'removeFood'
	},

  // Initialize the view by having it listen to changes in its model.
	initialize: function() {
      this.listenTo(this.model, 'change', this.render); 
      this.listenTo(this.model, 'remove', this.clear);
    },

  // Render the view by creating the html using the template and the attributes of the model.
	render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      
      return this;
    },

    // Remove the food item's model from the collection and remove the view from the DOM.
    removeFood: function() {
      app.Foods.remove(this.model);
    	this.remove();
    },

    // Destroy the model once the view has been removed.
    clear: function() {
    	this.model.destroy();
    }

});
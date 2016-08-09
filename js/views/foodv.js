
var app = app || {};

app.FoodView = Backbone.View.extend({

	tagName: 'li',

	template: _.template($('#result-template').html()),

	events: {
		'click .result-view': 'removeFood'
	},

	initialize: function() {
      this.listenTo(this.model, 'change', this.render); 
      this.listenTo(this.model, 'remove', this.clear);
    },

	render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      
      return this;
    },

    removeFood: function() {
      //console.log(this);
      app.Foods.remove(this.model);
      //console.log(app.Foods);
    	this.remove();
    },

    clear: function() {
      //console.log('destroyed');
    	this.model.destroy();
    }

});
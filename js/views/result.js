
var app = app || {};

app.ResultView = Backbone.View.extend({

	tagName: 'li',

	template: _.template($('#result-template').html()),

	events: {
		'click .result-view': 'addFood'
	},

	initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'remove', this.clear);
    },

	render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      
      return this;
    },

    addFood: function(result) {
    	//console.log(this.model.attributes.name, this.model.attributes.calorieCount);
    	app.Foods.create({name: this.model.attributes.name, calorieCount: this.model.attributes.calorieCount});
    	app.Results.remove(app.Results.models);
    },

    clear: function() {
    	this.model.destroy();
    }

}); 
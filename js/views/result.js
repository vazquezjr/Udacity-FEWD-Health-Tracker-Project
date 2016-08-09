
var app = app || {};

app.ResultView = Backbone.View.extend({

	tagName: 'li',

	template: _.template($('#result-template').html()),

	initialize: function() {
      this.listenTo(this.model, 'change', this.render); 
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'remove', this.clear);
    },

	render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      
      return this;
    },

    clear: function() {
    	this.model.destroy();
    }

})
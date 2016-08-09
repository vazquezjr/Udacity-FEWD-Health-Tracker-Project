
var app = app || {};

// Create a collection of search results.
var ResultList = Backbone.Collection.extend({

	// Associate a model for the collection.
	model: app.Result,

	// Create a LocalStorage object for the collection.
	localStorage: new Backbone.LocalStorage('results-backbone')

});

// Create a new collection of search results.
app.Results = new ResultList();

var app = app || {};

var ResultList = Backbone.Collection.extend({

	model: app.Result,

	localStorage: new Backbone.LocalStorage('results-backbone')

});

app.Results = new ResultList();
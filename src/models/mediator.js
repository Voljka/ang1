var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var MediatorType = require('./mediatorType');

// Schemas

var Mediator = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		ref: 'MediatorType'
	}
});

Mediator.path('name').validate( function (value) {
	return value.length < 70;
});

module.exports = mongoose.model('Mediator', Mediator);
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Mediator = require('./mediator');
var MediatorType = require('./mediatorType');

// Schemas

var MediatorCondition = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	mediator: {
		type: String,
		ref: 'Mediator'
	},
	type: {
		type: String,
		ref: 'MediatorType'
	},
	started_at: Date,
	finished_at: { 
		type: Date,
		default: "2100-12-31"
	},
	percent: Number,
	fixed: Number
});

// MediatorCondition.path('name').validate( function (value) {
// 	return value.length < 25;
// });

module.exports = mongoose.model('MediatorCondition', MediatorCondition);
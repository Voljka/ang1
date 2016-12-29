var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Mediator = require('./mediator');

// Schemas

var MediatorCondition = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	mediator: {
		type: String,
		ref: 'Mediator'
	}
	started_at: Date,
	finished_at: Date,
	percent: Number,
	fixed: Number
});

// MediatorCondition.path('name').validate( function (value) {
// 	return value.length < 25;
// });

module.exports = mongoose.model('MediatorCondition', MediatorCondition);
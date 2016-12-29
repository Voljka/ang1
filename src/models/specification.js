var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Contract = require('./contract');

// Schemas

var Specification = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	contract: {
		type: String,
		ref: 'Contract'
	},
	number: String,
	signed_at: Date
});

Specification.path('number').validate( function (value) {
	return value.length < 20;
});

module.exports = mongoose.model('Specification', Specification);
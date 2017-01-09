var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;

// Schemas

var OperationType = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	code: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

OperationType.path('name').validate( function (value) {
	return value.length < 30;
});

module.exports = mongoose.model('OperationType', OperationType);
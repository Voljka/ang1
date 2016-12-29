var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;

// Schemas

var MediatorType = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	name: {
		type: String,
		required: true
	},
	our: Boolean
});

MediatorType.path('name').validate( function (value) {
	return value.length < 25;
});

module.exports = mongoose.model('MediatorType', MediatorType);
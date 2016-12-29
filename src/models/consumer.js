var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Country = require('./country');

// Schemas

var Consumer = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	name: {
		type: String,
		required: true
	},
	country: {
		type: String,
		ref: 'Country'
	}
});

Consumer.path('name').validate( function (value) {
	return value.length < 70;
});

module.exports = mongoose.model('Consumer', Consumer);
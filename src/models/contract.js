var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Contragent = require('./contragent');

// Schemas

var Contract = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	contragent: String,
	number: String,
	signed_at: Date
});

Contract.path('number').validate( function (value) {
	return value.length < 30;
});

module.exports = mongoose.model('Contract', Contract);
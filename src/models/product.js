var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Procuder = require('./producer');
var Unit = require('./unit');

// Schemas

var Product = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	name: {
		type: String,
		required: true
	},
	producer: {
		type: String,
		ref: 'Producer'
	},
	kved: {
		type: String
	},
	unit: {
		type: String,
		ref: 'Unit',
	}
});

Product.path('name').validate( function (value) {
	return value.length < 100;
});

Product.path('kved').validate( function (value) {
	return value.length < 20;
});

module.exports = mongoose.model('Product', Product);
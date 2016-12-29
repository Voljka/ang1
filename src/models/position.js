var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Specification = require('./specification');
var Product = require('./product');

// Schemas

var Position = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	specification: {
		type: String,
		ref: 'Specification'
	},
	product: {
		type: String,
		ref: 'Product'
	},
	quantity: Number,
	price: Number
});

// Specification.path('number').validate( function (value) {
// 	return value.length < 20;
// });

module.exports = mongoose.model('Position', Position);
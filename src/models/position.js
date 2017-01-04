var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

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
		ref: 'Specification',
		autopopulate: {
			select: '_id number signed_at contract'
		}
	},
	product: {
		type: String,
		ref: 'Product',
		autopopulate: {
			select: 'id name'
		}
	},
	quantity: Number,
	price: Number
});

// Specification.path('number').validate( function (value) {
// 	return value.length < 20;
// });
Position.plugin(autopopulate);

module.exports = mongoose.model('Position', Position);
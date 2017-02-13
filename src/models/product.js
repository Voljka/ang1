var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Procuder = require('./producer');
var Unit = require('./unit');

var autopopulate = require('mongoose-autopopulate');
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
		type: String,
		default: ""
	},
	unit: {
		type: String,
		ref: 'Unit',
		autopopulate: {
			select: '_id name'
		}		
	}
});

Product.path('name').validate( function (value) {
	return value.length < 100;
});

Product.path('kved').validate( function (value) {
	return value.length < 20;
});

Product.plugin(autopopulate);


module.exports = mongoose.model('Product', Product);
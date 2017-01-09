var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

var Schema = mongoose.Schema;
var Position = require('./position');
var OperationType = require('./operationType');

// Schemas

var Delivery = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	position: {
		type: String,
		ref: 'Position',
		autopopulate: {
			select: '_id product specification'
		}
	},
	quantity: Number,
	delivered_at: Date,
	operation_type: {
		ref: 'OperationType',
		type: String,
		autopopulate: {
			select: '_id name code'
		}
	}
});

// Specification.path('number').validate( function (value) {
// 	return value.length < 20;
// });

Delivery.plugin(autopopulate);

module.exports = mongoose.model('Delivery', Delivery);
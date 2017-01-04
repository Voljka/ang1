var mongoose = require('mongoose');
var uuid = require('node-uuid');

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
		ref: 'Position'
	},
	quantity: Number,
	delivered_at: Date,
	operation_type: {
		ref: 'OperationType',
		type: String
	}
});

// Specification.path('number').validate( function (value) {
// 	return value.length < 20;
// });

module.exports = mongoose.model('Delivery', Delivery);
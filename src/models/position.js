var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

var Schema = mongoose.Schema;
var Specification = require('./specification');
var Product = require('./product');
var DeliveryEvent = require('./deliveryEvent');
var PaymentEvent = require('./paymentEvent');

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
			select: 'id name unit'
		}
	},
	quantity: Number,
	price: Number,
	delivery_days: Number,
	delivery_event: {
		type: String,
		ref: 'DeliveryEvent',
		autopopulate: {
			select: '_id name'
		}
	},
	pay_days: Number,
	pay_event: {
		type: String,
		ref: 'PaymentEvent',
		autopopulate: {
			select: '_id name'
		}
	},
	pay_close_days: Number,
	pay_close_event: {
		type: String,
		ref: 'PaymentEvent',
		autopopulate: {
			select: '_id name'
		}
	},
	prepay_percent: Number,
	prepay_amount: Number,
});

Position.plugin(autopopulate);

module.exports = mongoose.model('Position', Position);
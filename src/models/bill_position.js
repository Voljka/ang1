var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

var Schema = mongoose.Schema;

var Bill = require('./bill');
var DeliveryEvent = require('./deliveryEvent');
var PaymentEvent = require('./paymentEvent');
var Position = require('./position');

// Schemas

var BillPosition = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	position: {
		type: String,
		ref: 'Position',
		autopopulate: {
			select: '_id product quantity specification'
		}
	},
	bill: {
		type: String,
		ref: 'Bill',
		autopopulate: {
			select: '_id number issued_at provider'
		}
	},
	quantity: Number,
	price: Number,

	delivery_days: Number,
	delivery_event: {
		type: String,
		ref: 'DeliveryEvent',
		autopopulate: {
			select: '_id name name_ru'
		}
	},

	pay_days: Number,
	pay_event: {
		type: String,
		ref: 'PaymentEvent',
		autopopulate: {
			select: '_id name name_ru'
		}
	},

	pay_close_days: Number,
	pay_close_event: {
		type: String,
		ref: 'PaymentEvent',
		autopopulate: {
			select: '_id name name_ru'
		}
	},

	prepay_percent: Number,
	prepay_amount: Number,
});

BillPosition.plugin(autopopulate);

module.exports = mongoose.model('BillPosition', BillPosition);
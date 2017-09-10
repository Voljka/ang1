var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

var Schema = mongoose.Schema;
var BillPosition = require('./bill_position');
var OperationType = require('./operationType');

// Schemas

var BillPayment = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	bill_position: {
		type: String,
		ref: 'BillPosition',
		autopopulate: {
			select: '_id position bill quantity price'
		}
	},
	amount: Number,
	payed_at: Date,
	operation_type: {
		ref: 'OperationType',
		type: String,
		autopopulate: {
			select: '_id name code'
		}
	}
});

BillPayment.plugin(autopopulate);

module.exports = mongoose.model('BillPayment', BillPayment);
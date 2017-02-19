var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

var Schema = mongoose.Schema;
var Position = require('./position');
var OperationType = require('./operationType');

var DeliveryLetter = new Schema({
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
	send_at: Date,
	operation_type: {
		ref: 'OperationType',
		type: String,
		autopopulate: {
			select: '_id name code'
		}
	}
});

DeliveryLetter.plugin(autopopulate);

module.exports = mongoose.model('DeliveryLetter', DeliveryLetter);
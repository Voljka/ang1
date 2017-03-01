var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Provider = require('./provider');
var OperationType = require('./operationType');

var autopopulate = require('mongoose-autopopulate');

// Schemas

var Bill = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	provider: {
		type: String,
		ref: 'Provider',
		autopopulate: {
			select: '_id name country'
		}
	},
	number: String,
	issued_at: Date,
	provide_schema: {
		ref: 'OperationType',
		type: String,
		autopopulate: {
			select: '_id name code'
		}		
	},
	mediator: {
		type: String,
		ref: 'Mediator',
		autopopulate: {
			select: '_id name'
		}
	},
	vat: Boolean,
});

Bill.path('number').validate( function (value) {
	return value.length < 30;
});

Bill.plugin(autopopulate);

module.exports = mongoose.model('Bill', Bill);
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Consumer = require('./consumer');

var autopopulate = require('mongoose-autopopulate');

// Schemas

var Contract = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	consumer: {
		type: String,
		ref: 'Consumer',
		autopopulate: {
			select: '_id name group'
		}
	},
	number: String,
	signed_at: Date
});

Contract.path('number').validate( function (value) {
	return value.length < 30;
});

Contract.plugin(autopopulate);

module.exports = mongoose.model('Contract', Contract);
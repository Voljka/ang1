var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Contract = require('./contract');

var autopopulate = require('mongoose-autopopulate');

// var autoPopulate = function(next) {
// 	this.populate('contract');
// 	next();
// }

// Schemas

var Specification = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	contract: {
		type: String,
		ref: 'Contract',
		autopopulate: {
			select: '_id consumer number signed_at'
		}
	},
	number: String,
	signed_at: Date
});

Specification.path('number').validate( function (value) {
	return value.length < 30;
});

Specification.plugin(autopopulate);

// Specification.pre('populate', autoPopulate).pre('find', autoPopulate).pre('findOne', autoPopulate).pre('findByIdAndUpdate', autoPopulate);

module.exports = mongoose.model('Specification', Specification);
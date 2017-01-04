var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Schema = mongoose.Schema;
var Country = require('./country');
var Group = require('./group');

// Schemas

var Consumer = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	name: {
		type: String,
		required: true
	},
	country: {
		type: String,
		ref: 'Country'
	},
	is_old: {
		type: Boolean,
		default: false
	},
	group: {
		type: String,
		ref: 'Group',
		default: 0
	}
});

Consumer.path('name').validate( function (value) {
	return value.length < 70;
});

// Consumer.pre('remove', function(next) {
// 	Contract.remove({ consumer: this.id }).exec();
// })

module.exports = mongoose.model('Consumer', Consumer);
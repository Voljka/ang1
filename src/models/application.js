var mongoose = require('mongoose');
var uuid = require('node-uuid');

var autopopulate = require('mongoose-autopopulate');

var Schema = mongoose.Schema;
var Position = require('./position');

var Application = new Schema({
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
});

Application.plugin(autopopulate);

module.exports = mongoose.model('Application', Application);
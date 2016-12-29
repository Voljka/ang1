var mongoose = require('mongoose');
var uuid = require('node-uuid');
var crypto = require('crypto');

var Schema = mongoose.Schema;

// Schemas

var User = new Schema({
	_id: { 
		type: String,
		default: uuid.v1
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}
});

// Validations

User.methods.encryptPassword = function(password) {
	//return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	return crypto.pbkdf2Sync(password, this.salt, 10000, 512)
}

User.virtual('userId')
	.get( function() {
		return this._id
	})

User.virtual('password')
	.set( function(password) {
		this._plainPassword = password;
		// this.salt = crypto.randomBytes(32).toString('base64');
		this.salt = crypto.randomBytes(128).toString('base64');
		this.hashedPassword = this.encryptPassword(password);
	})
	.get( function() {
		return this._plainPassword;
	})

User.methods.checkPassword = function(password) {

	return this.encryptPassword(password) == this.hashedPassword;
}

// Conversations.path('name').validate( function (value) {
// 	return value.length > 2 && value.length < 50;
// });

module.exports = mongoose.model('User', User);
var express = require('express');
var router = express.Router();

//var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')

var secret = { secret: 'my secret' };
//app.use(expressJWT(secret).unless({ path: [ '/', '/api/v1/session/create' ]}) )

var User = require('../../models/user')
//var respondMaker = require('../respondTemplates/transformer');

router.post('/create', function(req, res) {

	// Find User 
	return User.findOne({ username: req.body.username}, function(err, foundUser) {
		if (err) console.log(err)


		// var newUser = new User ({
		// 	username: req.body.username,
		// 	password: '1'
		// })

		// return newUser.save( function(err, savedUser) {
		// 	if (err) console.log(err)

		// 	console.log(savedUser)

		// 	return res.send(savedUser)
		// })
		

		if (! foundUser) {
			console.log('User not found');
			return res.status(401).send({
				user: {
					message: 'User with such name does not exist'
				}
			})
		}

		if (foundUser.checkPassword(req.body.password)) {

			console.log('User found and password match');

			var user = {
				name : req.body.username
			}
			
			var myToken = jwt.sign(user, secret.secret, { expiresIn: '1h'});
						
			user.id_token = myToken;

			return res.send( user )
			
		} else {
			console.log('User found but password is bad')

			return res.status(401).send({
				user: {
					message: 'Password does not match'
				}
			})
		}

	})
	// Check Password

	// Send JWT or Error
});

module.exports = router;
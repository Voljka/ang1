var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
// var Payment = require('../../models/payment');
var Country = require('../../models/country');
var Provider = require('../../models/provider');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for providers list');

	return Provider.find({}).populate({
		path: 'country',
		model: 'Country' 
	}).exec( function(err, providers) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(providers);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified provider info');

	return Provider.findOne({_id: req.params.id }, function(err, provider) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! provider)
			return res.status(404).send({ error: 'Requested provider not found'});

		res.send(provider);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new provider');

	var newProvider = new Provider({
		name: req.body.name,
		country: req.body.country,
		// quantity: req.body.quantity,
		// price: req.body.price
	});

	return newProvider.save( function(err, savedProvider) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedProvider);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying provider info');

	changeRecord(Provider, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a provider'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting provider');

	changeRecord(Provider, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a provider'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
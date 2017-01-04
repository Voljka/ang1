var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
var Payment = require('../../models/payment');
var Delivery = require('../../models/delivery');
var Position = require('../../models/position');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for positions list');

	return Position.find({}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(positions);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified position info');

	return Position.findOne({_id: req.params.id }, function(err, position) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! position)
			return res.status(404).send({ error: 'Requested position not found'});

		res.send(position);
	}) 
});

router.get('/:id/payments', function(req, res) {
	console.log('request for specified position info');

	return Payment.find({position: req.params.id }).exec( function(err, payments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! payments)
			return res.status(404).send({ error: 'Requested position not found'});

		res.send(payments);
	}) 

});

router.get('/:id/deliveries', function(req, res) {
	console.log('request for specified position info');

	return Delivery.find({position: req.params.id }).exec( function(err, deliveries) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! deliveries)
			return res.status(404).send({ error: 'Requested position not found'});

		res.send(deliveries);
	}) 

});


router.post('/', function(req, res) {
	console.log('request for new position');

	var newPosition = new Position({
		specification: req.body.specification,
		product: req.body.product,
		quantity: req.body.quantity,
		price: req.body.price
	});

	return newPosition.save( function(err, savedPosition) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedPosition);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying position info');

	changeRecord(Position, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a position'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting position');

	changeRecord(Position, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a position'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
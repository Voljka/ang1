var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
// var Payment = require('../../models/payment');
// var Delivery = require('../../models/delivery');
var Delivery = require('../../models/delivery');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for deliverys list');

	return Delivery.find({}, function(err, deliveries) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(deliveries);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified delivery info');

	return Delivery.findOne({_id: req.params.id }, function(err, delivery) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! delivery)
			return res.status(404).send({ error: 'Requested delivery not found'});

		res.send(delivery);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new delivery');

	var newDelivery = new Delivery({
		position: req.body.position,
		delivered_at: req.body.delivered_at,
		quantity: req.body.quantity,
		operation_type: req.body.operation_type
	});

	return newDelivery.save( function(err, savedDelivery) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedDelivery);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying delivery info');

	changeRecord(Delivery, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a delivery'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting delivery');

	changeRecord(Delivery, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a delivery'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
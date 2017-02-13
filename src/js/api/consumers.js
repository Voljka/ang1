var express = require('express');
var router = express.Router();

var _ = require('lodash');

// var respondMaker = require('../respondTemplates/transformer');
var Consumer = require('../../models/consumer');
var Position = require('../../models/position');
var Delivery = require('../../models/delivery');
var Payment = require('../../models/payment');

var Contract = require('../../models/contract');
var Specification = require('../../models/specification');

var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for consumers list');

	return Consumer.find({}, function(err, consumers) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(consumers);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified consumer info');

	return Consumer.findOne({_id: req.params.id }, function(err, consumer) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! consumer)
			return res.status(404).send({ error: 'Requested consumer not found'});

		res.send(consumer);
	}) 
});

router.get('/:id/contracts', function(req, res) {
	console.log('request for a contract list of the specified consumer');

	return Contract.find({consumer: req.params.id }, function(err, contracts) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! contracts)
			return res.status(404).send({ error: 'Requested consumer not found'});

		res.send(contracts);
	}) 
});

router.get('/:id/payments', function(req, res) {
	console.log('request for a payment list of the specified consumer');

	return Payment.find({ }).exec( function(err, allPayments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! allPayments)
			return res.status(404).send({ error: 'Requested consumer not found'});

																																																																																																																																																												console.log(allPayments);	
		res.send( _.filter(allPayments, function(o) {
			return o.position.specification.contract.consumer._id == req.params.id 
		}));
	}) 

});


router.get('/:id/deliveries', function(req, res) {
	console.log('request for a deliveries list of the specified consumer');

	return Delivery.find({ }).exec( function(err, allDeliveries) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! allDeliveries)
			return res.status(404).send({ error: 'Requested consumer not found'});

		res.send( _.filter(allDeliveries, function(o) {
			return o.position.specification.contract.consumer._id == req.params.id 
		}));
	}) 

});

router.post('/', function(req, res) {
	console.log('request for new consumer');

	var newConsumer = new Consumer({
		name: req.body.name,
		group: req.body.group,
		country: req.body.country
	});

	return newConsumer.save( function(err, savedConsumer) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedConsumer);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying consumer info');

	changeRecord(Consumer, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a consumer'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting consumer');

	changeRecord(Consumer, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a consumer'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
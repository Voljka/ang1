var express = require('express');
var router = express.Router();

var _ = require('lodash');

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

		return res.send(positions)
	}) 
});

router.get('/notdelivered', function(req, res) {

	return Position.find({}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return calcDeliveries(positions)
			.then( function(allPositionsWithDeliveredQuantity){
				
				var notDeliveredPositions = _.filter( allPositionsWithDeliveredQuantity, function(o){
					return o.quantity != o.delivered_quantity
				})

				return res.send(notDeliveredPositions);
			})
	}) 
});

var calcDeliveries = function(list) {
	var listOfPromises = [];

	list.forEach(function(position) {
		listOfPromises.push(calcOnePositionDeliveries(position))
	})

	return Promise.all( listOfPromises )
}

var calcOnePositionDeliveries = function(position) {

	return Delivery.find({position : position._id})
			.then( function(deliveries) {

				var sum = 0;
				deliveries.forEach(function(o){
					sum += o.quantity;
				})

				var result = Object.assign( {}, position._doc, {delivered_quantity: sum});

				return result;
			})
}

router.get('/notpayed', function(req, res) {

	return Position.find({}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return calcPayments(positions)
			.then( function(allPositionsWithPayments){
				
				var notPayedPositions = _.filter( allPositionsWithPayments, function(o){
					return (o.price * o.quantity) * 1.2 != o.payed_amount
				})

				return res.send(notPayedPositions);
			})
	}) 
});

var calcPayments = function(list) {
	var listOfPromises = [];

	list.forEach(function(position) {
		listOfPromises.push(calcOnePositionPayments(position))
	})

	return Promise.all( listOfPromises )
}

var calcOnePositionPayments = function(position) {

	return Payment.find({position : position._id})
			.then( function(payments) {

				var sum = 0;
				payments.forEach(function(o){
					sum += o.amount;
				})

				var result = Object.assign( {}, position._doc, {payed_amount: sum});

				return result;
			})
}

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
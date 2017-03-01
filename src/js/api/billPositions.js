var express = require('express');
var router = express.Router();

var _ = require('lodash');

// var respondMaker = require('../respondTemplates/transformer');
var Payment = require('../../models/payment');
var Delivery = require('../../models/delivery');

var BillPosition = require('../../models/bill_position');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for positions list');

	return BillPosition.find({}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(positions)
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified position info');

	return BillPosition.findOne({_id: req.params.id }, function(err, position) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! position)
			return res.status(404).send({ error: 'Requested position not found'});

		res.send(position);
	}) 
});

router.get('/:id/optype/:type/payments', function(req, res) {
	console.log('request for the payments of the bill');

	return Payment.find({position: req.params.id, operation_type: req.params.type }).exec( function(err, payments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(payments);
	}) 
});

router.get('/:id/optype/:type/deliveries', function(req, res) {
	console.log('request for the deliveries of the bill');

	return Delivery.find({position: req.params.id, operation_type: req.params.type }).exec( function(err, deliveries) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(deliveries);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new position');

	var newBillPosition = new BillPosition({
		position: req.body.position,
		bill: req.body.bill,
		quantity: req.body.quantity,
		price: req.body.price,
	});

	return newBillPosition.save( function(err, savedBillPosition) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedBillPosition);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying position info');

	changeRecord(BillPosition, req.params.id, req.body)
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

	changeRecord(BillPosition, req.params.id, { is_old: true })
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

router.get('/notdelivered', function(req, res) {

	return BillPosition.find({}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return calcDeliveries(positions)
			.then( function(allBillPositionsWithDeliveredQuantity){
				
				var notDeliveredBillPositions = _.filter( allBillPositionsWithDeliveredQuantity, function(o){
					return o.quantity != o.delivered_quantity
				})

				return res.send(notDeliveredBillPositions);
			})
	}) 
});

var calcDeliveries = function(list) {
	var listOfPromises = [];

	list.forEach(function(position) {
		listOfPromises.push(calcOneBillPositionDeliveries(position))
	})

	return Promise.all( listOfPromises )
}

var calcOneBillPositionDeliveries = function(position) {

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

	return BillPosition.find({}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return calcPayments(positions)
			.then( function(allBillPositionsWithPayments){
				
				var notPayedBillPositions = _.filter( allBillPositionsWithPayments, function(o){
					return (o.price * o.quantity) * 1.2 != o.payed_amount
				})

				return res.send(notPayedBillPositions);
			})
	}) 
});

var calcPayments = function(list) {
	var listOfPromises = [];

	list.forEach(function(position) {
		listOfPromises.push(calcOneBillPositionPayments(position))
	})

	return Promise.all( listOfPromises )
}

var calcOneBillPositionPayments = function(position) {

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

module.exports = router;
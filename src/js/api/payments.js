var express = require('express');
var router = express.Router();

var Payment = require('../../models/payment');
var changeRecord = require('../../models/common').changeRecord;

var filter = require('lodash/filter');

const CONSUMER = 1;
const CONTRACT = 2;
const SPECIFICATION = 3;
const POSITION = 4;

router.get('/', function(req, res) {
	console.log('request for payments list');

	return Payment.find({}, function(err, payments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(payments);
	}) 
});

router.get('/hierarchy/:code/id/:id', function(req, res) {
	console.log('request for payments by specified contract');

	return Payment.find({}, function(err, payments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		var result;
		switch (Number(req.params.code)) {
			case CONSUMER:
				result = filter( payments, function(o) {
					return o.position.specification.contract.consumer._id == req.params.id
				})
				break;
			case CONTRACT:
				result = filter( payments, function(o) {
					return o.position.specification.contract._id == req.params.id
				})
				break;
			case SPECIFICATION:
				result = filter( payments, function(o) {
					return o.position.specification._id == req.params.id
				})
				break;
			case POSITION:
				result = filter( payments, function(o) {
					return o.position._id == req.params.id
				})
				break;
			default:
				result = 'Invalid Hierarchy Code'
		}

		res.send(result);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified payment info');

	return Payment.findOne({_id: req.params.id }, function(err, payment) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! payment)
			return res.status(404).send({ error: 'Requested payment not found'});

		res.send(payment);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new payment');

	var newPayment = new Payment({
		position: req.body.position,
		amount: req.body.amount,
		payed_at: req.body.payed_at,
		operation_type: req.body.operation_type
	});

	return newPayment.save( function(err, savedPayment) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return Payment.findById( savedPayment, function(err, populatedPayment) {
			if (err)
				return res.status(500).send({ error: 'Error during request'});

			return res.send(populatedPayment);
		})
		
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying payment info');

	changeRecord(Payment, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a payment'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting payment');

	changeRecord(Payment, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a payment'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
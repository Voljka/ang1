var express = require('express');
var router = express.Router();

var BillPayment = require('../../models/bill_payment');
var changeRecord = require('../../models/common').changeRecord;

var filter = require('lodash/filter');

router.get('/optype/:type', function(req, res) {
	console.log('request for payments list');

	return BillPayment.find({operation_type: req.params.type}, function(err, payments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(payments);
	}) 
});

router.get('/bybillposition/:id/optype/:type', function(req, res) {
	console.log('request for the bill payments by specified position and operation type');

	return BillPayment.find({operation_type: req.params.type, bill_position: req.params.id}, function(err, payments) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(payments);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified payment info');

	return BillPayment.findOne({_id: req.params.id }, function(err, payment) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! payment)
			return res.status(404).send({ error: 'Requested payment not found'});

		res.send(payment);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new payment');

	var newPayment = new BillPayment({
		bill_position: req.body.bill_position,
		amount: req.body.amount,
		payed_at: req.body.payed_at,
		operation_type: req.body.operation_type
	});

	return newPayment.save( function(err, savedPayment) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return BillPayment.findById( savedPayment._id, function(err, populatedPayment) {
			if (err)
				return res.status(500).send({ error: 'Error during request'});

			return res.send(populatedPayment);
		})
		
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying payment info');

	changeRecord(BillPayment, req.params.id, req.body)
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

	return BillPayment.remove({_id: req.params.id}, function(err, deletedPayment){
			if (err)
				return res.status(500).send({ error: 'Error during request'});

			return res.send(deletedPayment);
	})
});

module.exports = router;
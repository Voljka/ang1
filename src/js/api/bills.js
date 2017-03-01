var express = require('express');
var router = express.Router();

var Bill = require('../../models/bill.js');
var BillPosition = require('../../models/bill_position.js');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for bills list');

	return Bill.find({operation_type: req.params.type}, function(err, bills) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(bills);
	}) 
});

router.get('/:id/positions', function(req, res) {
	console.log('request for bill by position');

	return BillPosition.find({bill: req.params.id}, function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(positions);
	}) 
});


router.post('/', function(req, res) {
	console.log('request for new bill');

	var newBill = new Bill({
		provider: req.body.provider,
		issued_at: req.body.issued_at,
		number: req.body.number,
		provide_schema: req.body.provide_schema,
		put: req.params.vat,
	});

	return newBill.save( function(err, savedBill) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return Bill.findById(savedBill._id, function(err, popSavedBill) {
			if (err) 
				return res.status(500).send({ error: 'Error during request'});

			return res.send(popSavedBill);
		})
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying bill info');

	changeRecord(Bill, req.params.id, req.body)
		.then( function(data){
			if (! data) {
				return res.status(404).send({ error: 'There are no such bill'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

router.delete('/:id', function(req, res) {
	console.log('request for deleting bill');

	return Bill.remove({_id: req.params.id}, function(err, deletedBill){
		if (err)
			return res.status(500).send({ error: 'Error during request'});

		return res.send(deletedBill);
	})
});

router.put('/:id/updatepositions', function(req, res) {
	console.log('request for updating position list for specified bill');

	var arrayOfPromises = [];
	if (req.body.added.length > 0)  
		arrayOfPromises.push(insertManyPositions(req.body.added));

	if (req.body.removed.length > 0)  
		arrayOfPromises.push(removePositionList(req.body.removed));

	if (req.body.edited.length > 0) {
		req.body.edited.forEach(function(o){
			arrayOfPromises.push(updatePositionMaker(o._id, o));
		})
	}

	if (arrayOfPromises.length > 0) {
		return Promise.all(arrayOfPromises)
			.then( function(result) {
				// console.log(result);
				res.send(result);
			})
	} else {
		return res.send('Nothing to do!');
	}
});

var updatePositionMaker = function(id, data){
	return changeRecord(BillPosition, id, data)
}

var removePositionList = function(list){
	return BillPosition.remove({_id: {$in : list}})
}


var insertManyPositions = function(list){
	return BillPosition.insertMany(list)
}

module.exports = router;
var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
// var Payment = require('../../models/payment');
// var OperationType = require('../../models/operationType');
var OperationType = require('../../models/operationType');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for operationTypes list');

	return OperationType.find({}, function(err, operationTypes) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(operationTypes);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified operationType info');

	return OperationType.findOne({_id: req.params.id }, function(err, operationType) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! operationType)
			return res.status(404).send({ error: 'Requested operationType not found'});

		res.send(operationType);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new operationType');

	var newOperationType = new OperationType({
		name: req.body.name
		// delivered_at: req.delivered_at,
		// quantity: req.body.quantity,
		// operation_type: req.body.operation_type
	});

	return newOperationType.save( function(err, savedOperationType) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedOperationType);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying operationType info');

	changeRecord(OperationType, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a operationType'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting operationType');

	changeRecord(OperationType, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a operationType'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
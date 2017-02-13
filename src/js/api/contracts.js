var express = require('express');
var router = express.Router();


// var respondMaker = require('../respondTemplates/transformer');
var Contract = require('../../models/contract');
var Specification = require('../../models/specification');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for contracts list');

	return Contract.find({}, function(err, contracts) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(contracts);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified contract info');

	return Contract.findOne({_id: req.params.id }, function(err, contract) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! contract)
			return res.status(404).send({ error: 'Requested contract not found'});

		res.send(contract);
	}) 
});

router.get('/byconsumer/:id', function(req, res) {
	console.log('request for specified contract info');

	return Contract.find({consumer: req.params.id }, function(err, contracts) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! contracts)
			return res.status(404).send({ error: 'No contracts exist for selected consumer'});

		res.send(contracts);
	}) 
});

router.get('/:id/specifications', function(req, res) {
	console.log('request for specified contract info');

	return Specification.find({contract: req.params.id }).exec( function(err, specifications) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! specifications)
			return res.status(404).send({ error: 'Requested contract not found'});

		res.send(specifications);
	}) 

});

router.post('/', function(req, res) {
	console.log('request for new contract');

	var newContract = new Contract({
		number: req.body.number,
		signed_at: req.body.signed_at,
		consumer: req.body.consumer
	});

	return newContract.save( function(err, savedContract) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedContract);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying contract info');
	// console.log(req.body);

	changeRecord(Contract, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a contract'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting contract');

	changeRecord(Contract, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a contract'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
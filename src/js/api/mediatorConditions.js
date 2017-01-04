var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
// var Payment = require('../../models/payment');
// var Delivery = require('../../models/delivery');
var MediatorCondition = require('../../models/mediatorCondition');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for mediatorConditions list');

	return MediatorCondition.find({}, function(err, mediatorConditions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(mediatorConditions);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified mediatorCondition info');

	return MediatorCondition.findOne({_id: req.params.id }, function(err, mediatorCondition) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! mediatorCondition)
			return res.status(404).send({ error: 'Requested mediatorCondition not found'});

		res.send(mediatorCondition);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new mediatorCondition');

	var newMediatorCondition = new MediatorCondition({
		mediator: req.body.mediator,
		type: req.body.type,
		percent: req.body.percent,
		fixed: req.body.fixed,
		started_at: req.body.started_at,
		finished_at: req.body.finished_at
	});

	return newMediatorCondition.save( function(err, savedMediatorCondition) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedMediatorCondition);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying mediatorCondition info');

	changeRecord(MediatorCondition, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a mediatorCondition'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

router.delete('/:id', function(req, res) {
	console.log('request for deleting mediatorCondition');

	changeRecord(MediatorCondition, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a mediatorCondition'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
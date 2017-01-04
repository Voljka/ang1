var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
// var Payment = require('../../models/payment');
// var Delivery = require('../../models/delivery');
var Mediator = require('../../models/mediator');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for mediators list');

	return Mediator.find({}, function(err, mediators) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(mediators);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified mediator info');

	return Mediator.findOne({_id: req.params.id }, function(err, mediator) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! mediator)
			return res.status(404).send({ error: 'Requested mediator not found'});

		res.send(mediator);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new mediator');

	var newMediator = new Mediator({
		name: req.body.name,
		our: req.body.our,
	});

	return newMediator.save( function(err, savedMediator) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedMediator);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying mediator info');

	changeRecord(Mediator, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a mediator'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting mediator');

	changeRecord(Mediator, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a mediator'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
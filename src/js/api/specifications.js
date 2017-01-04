var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
var Position = require('../../models/position');
var Specification = require('../../models/specification');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for specifications list');

	return Specification.find({}, function(err, specifications) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(specifications);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified specification info');

	return Specification.findOne({_id: req.params.id }, function(err, specification) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! specification)
			return res.status(404).send({ error: 'Requested specification not found'});

		res.send(specification);
	}) 
});

router.get('/:id/positions', function(req, res) {
	console.log('request for specified specification info');

	return Position.find({specification: req.params.id }).exec( function(err, positions) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! positions)
			return res.status(404).send({ error: 'Requested specification not found'});

		res.send(positions);
	}) 

});

router.post('/', function(req, res) {
	console.log('request for new specification');

	var newSpecification = new Specification({
		contract: req.body.contract,
		signed_at: req.body.signed_at,
		number: req.body.number
	});

	return newSpecification.save( function(err, savedSpecification) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedSpecification);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying specification info');

	changeRecord(Specification, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a specification'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



router.delete('/:id', function(req, res) {
	console.log('request for deleting specification');

	changeRecord(Specification, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a specification'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
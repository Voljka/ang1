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

router.put('/:id/updatepositions', function(req, res) {
	console.log('request for updating position list for specified specification');

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
				console.log(result);
				res.send(result);
			})
	} else {
		return res.send('Nothing to do!');
	}

	// return Position.insertMany(req.body.added, function(err, result) {
	// 	if (err) {
	// 		console.log(err);
	// 		return res.status(500).send({error: 'Server Error'})
	// 	}

	// 	if (req.body.removed.length > 0) {
	// 		return Position.remove({_id: {$in : req.body.removed}}, function(err, result) {
	// 			if (err) {
	// 				console.log(err);
	// 				return res.status(500).send({error: 'Server Error'})
	// 			}

	// 			console.log(req.body.removed);
	// 			console.log('removing result: ');
	// 			console.log(result);

	// 			var arrayOfPromises = [];
	// 			req.body.edited.forEach(function(o){
	// 				arrayOfPromises.push(updatePositionMaker(o._id, o));
	// 			})

	// 			return Promise.all(arrayOfPromises)
	// 				.then( function(result) {
	// 					res.send(result);
	// 				})
	// 		})
	// 	}

	// });
});

var updatePositionMaker = function(id, data){
	// return function() {
		return changeRecord(Position, id, data)
	// }
}

var removePositionList = function(list){
	return Position.remove({_id: {$in : list}})
}


var insertManyPositions = function(list){
	// return function() {
		return Position.insertMany(list)
	// }
}

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
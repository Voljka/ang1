var express = require('express');
var router = express.Router();

var Application = require('../../models/application.js');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for applications list');

	return Application.find({operation_type: req.params.type}, function(err, applications) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(applications);
	}) 
});

router.get('/position/:id/', function(req, res) {
	console.log('request for application by position');

	return Application.findOne({position: req.params.id, operation_type: req.params.type}, function(err, application) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		// if (! application)
		// 	return res.status(404).send({ error: 'Requested application not found'});

		res.send(application);
	}) 
});


router.post('/', function(req, res) {
	console.log('request for new application');

	var newApplication = new Application({
		position: req.body.position,
		send_at: req.body.send_at,
	});

	return newApplication.save( function(err, savedApplication) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return Application.findById(savedApplication._id, function(err, savedApp) {
			if (err) 
				return res.status(500).send({ error: 'Error during request'});

			return res.send(savedApp);
		})

	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying application info');

	changeRecord(Application, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such application'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

router.delete('/:id', function(req, res) {
	console.log('request for deleting delivery app');

	return Application.remove({_id: req.params.id}, function(err, deletedApp){
			if (err)
				return res.status(500).send({ error: 'Error during request'});

			return res.send(deletedApp);
	})
});

module.exports = router;
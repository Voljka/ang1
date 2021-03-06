var express = require('express');
var router = express.Router();

var DeliveryLetter = require('../../models/deliveryLetter');
var changeRecord = require('../../models/common').changeRecord;

router.get('/optype/:type', function(req, res) {
	console.log('request for deliveryLetters list');

	return DeliveryLetter.find({operation_type: req.params.type}, function(err, deliveryLetters) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(deliveryLetters);
	}) 
});

router.get('/position/:id/optype/:type', function(req, res) {
	console.log('request for deliveryLetter by position and operationType');

	return DeliveryLetter.findOne({position: req.params.id, operation_type: req.params.type}, function(err, deliveryLetter) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		// if (! deliveryLetter)
		// 	return res.status(404).send({ error: 'Requested deliveryLetter not found'});

		res.send(deliveryLetter);
	}) 
});


router.post('/', function(req, res) {
	console.log('request for new deliveryLetter');

	var newDeliveryLetter = new DeliveryLetter({
		position: req.body.position,
		send_at: req.body.send_at,
		operation_type: req.body.operation_type,
	});

	return newDeliveryLetter.save( function(err, savedDeliveryLetter) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return DeliveryLetter.findById(savedDeliveryLetter._id, function(err, savedLetter) {
			if (err) 
				return res.status(500).send({ error: 'Error during request'});

			return res.send(savedLetter);
		})

	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying deliveryLetter info');

	changeRecord(DeliveryLetter, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such deliveryLetter'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});



// router.delete('/:id', function(req, res) {
// 	console.log('request for deleting deliveryLetter');

// 	changeRecord(DeliveryLetter, req.params.id, { is_old: true })
// 		.then( function(data){

// 			if (! data) {
// 				return res.status(404).send({ error: 'There are no such deliveryLetter'});
// 			}
// 			res.send(data);
// 		})
// 		.catch( function(err){
// 			res.status(500).send({error: "Server Error"});
// 		})
// });

router.delete('/:id', function(req, res) {
	console.log('request for deleting delivery letter');

	return DeliveryLetter.remove({_id: req.params.id}, function(err, deletedLetter){
			if (err)
				return res.status(500).send({ error: 'Error during request'});

			return res.send(deletedLetter);
	})
});

module.exports = router;
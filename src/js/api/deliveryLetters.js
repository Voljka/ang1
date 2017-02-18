var express = require('express');
var router = express.Router();

var DeliveryLetter = require('../../models/deliveryLetter');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for deliveryLetters list');

	return DeliveryLetter.find({}, function(err, deliveryLetters) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(deliveryLetters);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified deliveryLetter info');

	return DeliveryLetter.findOne({_id: req.params.id }, function(err, deliveryLetter) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! deliveryLetter)
			return res.status(404).send({ error: 'Requested deliveryLetter not found'});

		res.send(deliveryLetter);
	}) 
});


router.post('/', function(req, res) {
	console.log('request for new deliveryLetter');

	var newDeliveryLetter = new DeliveryLetter({
		position: req.body.position,
		send_at: req.body.send_at,
	});

	return newDeliveryLetter.save( function(err, savedDeliveryLetter) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedDeliveryLetter);
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



router.delete('/:id', function(req, res) {
	console.log('request for deleting deliveryLetter');

	changeRecord(DeliveryLetter, req.params.id, { is_old: true })
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

module.exports = router;
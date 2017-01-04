var express = require('express');
var router = express.Router();

// var respondMaker = require('../respondTemplates/transformer');
// var Payment = require('../../models/payment');
// var Delivery = require('../../models/delivery');
var Product = require('../../models/product');
var changeRecord = require('../../models/common').changeRecord;

router.get('/', function(req, res) {
	console.log('request for products list');

	return Product.find({}, function(err, products) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		res.send(products);
	}) 
});

router.get('/:id', function(req, res) {
	console.log('request for specified product info');

	return Product.findOne({_id: req.params.id }, function(err, product) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		if (! product)
			return res.status(404).send({ error: 'Requested product not found'});

		res.send(product);
	}) 
});

router.post('/', function(req, res) {
	console.log('request for new product');

	var newProduct = new Product({
		unit: req.body.unit,
		producer: req.body.producer,
		kved: req.body.kved,
		name: req.body.name
	});

	return newProduct.save( function(err, savedProduct) {
		if (err) 
			return res.status(500).send({ error: 'Error during request'});

		return res.send(savedProduct);
	})
});

router.put('/:id', function(req, res) {
	console.log('request for modifying product info');

	changeRecord(Product, req.params.id, req.body)
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a product'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

router.delete('/:id', function(req, res) {
	console.log('request for deleting product');

	changeRecord(Product, req.params.id, { is_old: true })
		.then( function(data){

			if (! data) {
				return res.status(404).send({ error: 'There are no such a product'});
			}
			res.send(data);
		})
		.catch( function(err){
			res.status(500).send({error: "Server Error"});
		})
});

module.exports = router;
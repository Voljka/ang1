'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { numberSplitted } from '../../libs/number';
import { toSafeString, toUnsafeString } from '../../libs/strings';

function Ctrl($scope, $state, deliveries, operationType, position, Flash, DeliveryService) {

	$scope.showControls = ! _.isEmpty(position);

	$scope.editingMode = false;
	var isCardForEditing;

	$scope.showDeliveryCard = false;

	$scope.deliveryList = groupDeliveries(deliveries);

	console.log($scope.deliveryList);

	$scope.card = {
		deliveryDate: undefined,
		deliveryQuantity: undefined,
		deliveredQuantity: undefined,
		productName: undefined,
		contractQuantity: undefined,
	}

	function groupDeliveries(allDeliveries) {
		var groupedByConsumer = _.groupBy( allDeliveries, function(o){
			return o.position.specification.contract.consumer.name;
		})

		var groupedByContract = _.map( groupedByConsumer, function(value, key){
			var _spec = _.groupBy( value, function(p){
				return p.position.specification.contract.number;
			})

			var result = { [key]: _spec};

			return result;
		})

		var groupedBySpecification = _.map( groupedByContract, function(o){
			
			var _spec = _.map( Object.values(o)[0], function(value, key){

				value = _.sortBy( value, function(o1) {
					return o1.position._id
				})

				var _spec2 = _.groupBy( value, function(s){
					return s.position.specification.number;
				})

				var specsArray = [];
				_.forEach(_spec2, function(val1, key1){
					specsArray.push({ [key1]: val1})
				}) 

				var result2 = { [key]: specsArray};

				return result2;
			})

			var result = { [Object.keys(o)[0]]: _spec};

			return result;
		})

		return groupedBySpecification;
	}

	$scope.sumBy = function(selector, value){

		var result = _.sumBy(deliveries, function(o){
			
			var objectList = selector.split('.');

			var object = o;
			objectList.forEach( function(p){
				object = object[p];
			})

			if (object == value) {
				return o.quantity
			} else {
				return 0
			}
		});
		return result;
	}

	$scope.select = function(delivery) {
		if (! _.isEmpty(position)) {
			deliveries = _.map(deliveries, function(c) {
				if (c._id === delivery._id) {
					// if taken consumer is already selected
					if (DeliveryService.current() && DeliveryService.current()._id == delivery._id) {
						// deselect 
						$scope.current = undefined;
						DeliveryService.select(undefined);
						c.selected = false;
						return c;
					} else {
						// select consumer 
						DeliveryService.select(delivery);
						$scope.current = delivery;
						c.selected = true;
						return c;
					}
				} else {
					c.selected = false;
					return c;
				}
			})
		}
	}

	$scope.add = function() {
		isCardForEditing = false;

		$scope.card = {
			productName: position.product.name,
			deliveryQuantity: 0,
			deliveredQuantity: _.sumBy(deliveries, 'quantity'),
			deliveryDate: new Date( ),
			contractQuantity: position.quantity,
		}

		$scope.showDeliveryCard = true;
	}

	$scope.edit = function() {
		var delivery = $scope.current;
		isCardForEditing = true;

		$scope.card = {
			productName: delivery.position.product.name,
			deliveryQuantity: delivery.quantity,
			deliveredQuantity: _.sumBy(deliveries, 'quantity'),
			deliveryDate: new Date( delivery.delivered_at.substr(0, 10) ),
			contractQuantity: position.quantity,
		}

		$scope.showDeliveryCard = true;
	}

	$scope.saveDelivery = function() {

		if ($scope.card.deliveryQuantity > 0) {

			var isTotalExceeded = false;

			var contractQuantity = position.quantity;
			var deliveredQuantity = _.sumBy(deliveries, 'quantity') + $scope.card.deliveryQuantity;

			if (isCardForEditing) {
				deliveredQuantity = deliveredQuantity - $scope.current.quantity;
			}

			if (deliveredQuantity > contractQuantity) {
				isTotalExceeded = true;
			}

			if (! isTotalExceeded) {
				var data = {
					position: position._id,
					quantity: $scope.card.deliveryQuantity,
					operation_type: operationType,
					delivered_at: $scope.card.deliveryDate,
				}

				if (! isCardForEditing) {
					DeliveryService.add(data)
						.then(function(newDelivery){
							console.log('Added new delivery');
							console.log(newDelivery);

							deliveries.push(newDelivery);
							$scope.deliveryList = groupDeliveries(deliveries);
						})
				} else {
					DeliveryService.update($scope.current._id, data)
						.then(function(editedDelivery){
							console.log('Existing delivery edited');
							console.log(editedDelivery);

							deliveries.map( function(o){
								if (o._id == editedDelivery._id) {
									o.quantity = editedDelivery.quantity;
									o.delivered_at = editedDelivery.delivered_at;
								}

								return o;
							})
							$scope.deliveryList = groupDeliveries(deliveries);
						})
				}

				$scope.showDeliveryCard = false;
			} else {
				var message = '<strong>Contract Quantity for selected Product can\'t be exceeded!</strong>';
		        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		} else {
			var message = '<strong>Delivery Quantity can\'t be less than 1!</strong>';
	        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}
	}

	$scope.backToList = function(){
		$scope.showDeliveryCard = false;
	}

	$scope.remove = function() {
	}
}

module.exports = Ctrl; 
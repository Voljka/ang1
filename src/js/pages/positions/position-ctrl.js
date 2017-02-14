'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { toSafeString, toUnsafeString } from '../../libs/strings';
import { numberSplitted } from '../../libs/number';

function PositionCtrl($scope, $state, positionList, productList, deliveryEventList, paymentEventList, specification, Flash, SpecificationService, PositionService) {

	var initialPositionList = JSON.parse(angular.toJson( positionList ));
	// $scope.currentConsumer = consumer;
	$scope.currentSpecification = specification;
	$scope.currentSpecification.contract.consumer.name = toUnsafeString($scope.currentSpecification.contract.consumer.name);
	$scope.currentSpecification.signed_at_formatted = formattedToRu( new Date($scope.currentSpecification.signed_at))
	$scope.currentSpecification.contract.signed_at_formatted = formattedToRu( new Date($scope.currentSpecification.contract.signed_at))

	$scope.current = undefined;

	console.log(positionList);

	productList.map(function(o) {
		o.name = toUnsafeString(o.name);
		return o;
	})

	var counter = 0;

	var removedPositions = [];

	var positionBeforeEditing,
		editingMode = false;

	$scope.products = productList;

	positionList.map(function(o){
		o.product.name = toUnsafeString(o.product.name);
		return o;
	})

	$scope.deliveryEvents = deliveryEventList;

	$scope.paymentEvents = paymentEventList;

	if (positionList.length > 0) {
		$scope.deliveryDays = Number(positionList[0].delivery_days);
		$scope.defaultDeliveryEvent = positionList[0].delivery_event._id;

		$scope.paymentStartDays = Number(positionList[0].pay_days);
		$scope.defaultPaymentStartEvent = positionList[0].pay_event._id;
		$scope.paymentCloseDays = positionList[0].pay_close_days ? Number(positionList[0].pay_close_days) : 0;
		$scope.defaultPaymentCloseEvent = positionList[0].pay_close_event ? positionList[0].pay_close_event._id : paymentEventList[3]._id;

		$scope.prepaymentPercent = positionList[0].prepay_percent ? Number(positionList[0].prepay_percent) : 0;
		$scope.prepaymentAmount = 0;
	} else {
		$scope.deliveryDays = 0;
		$scope.defaultDeliveryEvent = deliveryEventList[4]._id;

		$scope.paymentStartDays = 0;
		$scope.defaultPaymentStartEvent = paymentEventList[3]._id;
		$scope.paymentCloseDays = 0;
		$scope.defaultPaymentCloseEvent = paymentEventList[3]._id;

		$scope.prepaymentPercent = 0;
		$scope.prepaymentAmount = 0;
	}

	$scope.recalcTotal = function() {
		$scope.sumNoVAT = calcAmount();
		$scope.vat = ($scope.sumNoVAT * 0.2).toFixed(2);
		$scope.total = ($scope.sumNoVAT * 1.2).toFixed(2);
	}

	filter();
	$scope.recalcTotal();

	$scope.select = function(position) {
		if (! editingMode) {
			// positionList = _.map(positionList, function(c) {
			$scope.filteredObjects = _.map($scope.filteredObjects, function(c) {
				if (c._id === position._id) {
					// if taken consumer is already selected
					if (PositionService.current() && PositionService.current()._id == position._id) {
						// deselect 
						$scope.current = undefined;
						PositionService.select(undefined);
						c.selected = false;
						return c;
					} else {
						// select consumer 
						PositionService.select(position);
						$scope.current = position;
						c.selected = true;

						// change Delivery and Payment Options
						if (! position.new || (position.new && position.delivery_days)) {
							$scope.deliveryDays = Number(position.delivery_days);
							$scope.deliveryEvent = position.delivery_event._id;
						}

						if (! position.new || (position.new && position.pay_days)) {
							$scope.paymentStartDays = Number(position.pay_days);
							$scope.paymentEvent1 = position.pay_event._id;
							$scope.paymentCloseDays = position.pay_close_days ? Number(position.pay_close_days) : 0;
							$scope.paymentEvent2 = position.pay_close_event ? position.pay_close_event._id : paymentEventList[3]._id;

							$scope.prepaymentPercent = position.prepay_percent ? Number(position.prepay_percent) : 0;
							$scope.prepaymentAmount = position.prepay_amount ? Number(position.prepay_amount) : 0;
						}
						return c;
					}
				} else {
					c.selected = false;
					return c;
				}
			})
		}
	}

	function posCounter() {
		counter++;
		return counter;
	}

	$scope.add = function() {

		$scope.current = undefined;
		PositionService.select(undefined);

		var newPosition = {};

		newPosition.new = true;
		newPosition._id = posCounter();
		newPosition.product = {
			_id: productList[0]._id,
			name : productList[0].name
		};
		newPosition.price = 1;
		newPosition.quantity = 1;

		newPosition.editing = true;
		editingMode = true;

		$scope.filteredObjects.push(newPosition);
		$scope.recalcTotal();
	}

	$scope.edit = function() {
		$scope.filteredObjects.map( function(o){
			if (o._id == $scope.current._id) {
				positionBeforeEditing = Object.assign({}, o);
				o.editing = true;
			}

			return o;
		})

		editingMode = true;
	}

	$scope.remove = function() {
		// PositionService.delete();
	}

	function filter() {
		$scope.filteredObjects = positionList;
	}

	$scope.splitted = numberSplitted;

	$scope.makePaymentDetails = function(position){
		var result = "";
		if (! position.new || (position.new && position.pay_days)) {
			if (position.prepay_percent) {
				result += '\nPre-payment: ' + position.prepay_percent + '% ( ';
				result += numberSplitted( position.prepay_amount ) + ' UAH )';
			} else {
				if (position.prepay_amount > 0) {
					result += '\nPre-payment: ' + numberSplitted( position.prepay_amount ) + ' UAH ';
				}
			}

			if (position.pay_close_days) {
				result += '\nInitial: ' + position.pay_days + ' day(s) after "';
				var event = _.find(paymentEventList, {_id: position.pay_event._id});
				result += event.name + '"';

				result += '\nClose: ' + position.pay_close_days + ' day(s) after "';
				var event = _.find(paymentEventList, {_id: position.pay_close_event._id});
				result += event.name + '"';

			} else {
				result += '\n' + position.pay_days + ' day(s) after "';
				var event = _.find(paymentEventList, {_id: position.pay_event._id});
				result += event.name + '"';
			}

			result = result.substr(1, result.length-1);
		}

		return result;
	}

	$scope.makeDeliveryDetails = function(position){
		var result = "";
		if (! position.new || (position.new && position.delivery_days)) {

			result += position.delivery_days + ' day(s) after "';

			var event = _.find(deliveryEventList, {_id: position.delivery_event._id});
			result += event.name + '"';
		}

		return result;
	}

	var applyDeliveryDetailsToAll = function(){
		console.log('Applying delivery details to all positions');
		var event; 
		$scope.filteredObjects.map( function(o) {
			o.delivery_days = $scope.deliveryDays;
			event = _.find(deliveryEventList, {_id: $scope.deliveryEvent});
			o.delivery_event = {
				_id : $scope.deliveryEvent,
				name : event.name
			}
			
			return o;
		})
	}

	var applyDeliveryDetails = function() {
		console.log('Applying delivery details to specified position');
		$scope.filteredObjects.map( function(o) {
			if ($scope.current._id == o._id) {
				o.delivery_days = $scope.deliveryDays;
				event = _.find(deliveryEventList, {_id: $scope.deliveryEvent});
				o.delivery_event = {
					_id : $scope.deliveryEvent,
					name : event.name
				}
			}

			return o;
		})
	}

	var applyPaymentDetails = function() {
		console.log('Applying payment details to specified position');
		var event; 
		$scope.filteredObjects.map( function(o) {
			if ($scope.current._id == o._id) {
				o.pay_days = $scope.paymentStartDays;
				event = _.find(paymentEventList, {_id: $scope.paymentEvent1});
				o.pay_event = {
					_id : $scope.paymentEvent1,
					name : event.name
				}
				
				if ($scope.paymentCloseDays == 0) {
					o.pay_close_days = undefined;
					o.pay_close_event = {
						_id: undefined,
						name: undefined
					};
				} else {
					o.pay_close_days = $scope.paymentCloseDays;
					event = _.find(paymentEventList, {_id: $scope.paymentEvent2});
					o.pay_close_event = {
						_id : $scope.paymentEvent2,
						name : event.name						
					}
				}

				if ($scope.prepaymentPercent > 0) {
					o.prepay_percent = $scope.prepaymentPercent;
					o.prepay_amount = (o.price * o.quantity * 1.2 * Number($scope.prepaymentPercent) / 100).toFixed(2);
				} 

				if ($scope.prepaymentAmount > 0) {
					o.prepay_percent = undefined;
					o.prepay_amount = $scope.prepaymentAmount;
				} 

			}

			return o;
		})
	}

	var applyPaymentDetailsToAll = function() {
		var event; 
		console.log('Applying payment details to all positions');
		$scope.filteredObjects.map( function(o) {
			o.pay_days = $scope.paymentStartDays;
			event = _.find(paymentEventList, {_id: $scope.paymentEvent1});
			o.pay_event = {
				_id : $scope.paymentEvent1,
				name : event.name
			}
			
			if ($scope.paymentCloseDays == 0) {
				o.pay_close_days = undefined;
				o.pay_close_event = {
					_id: undefined,
					name: undefined
				};
			} else {
				o.pay_close_days = $scope.paymentCloseDays;
				event = _.find(paymentEventList, {_id: $scope.paymentEvent2});
				o.pay_close_event = {
					_id : $scope.paymentEvent2,
					name : event.name						
				}
			}

			if ($scope.prepaymentPercent > 0) {
				o.prepay_percent = $scope.prepaymentPercent;
				o.prepay_amount = (o.price * o.quantity * 1.2 * Number($scope.prepaymentPercent) / 100).toFixed(2);
			} 

			return o;
		})
	}

	$scope.checkPaymentDetailsAndApply = function(all) {
		var errorCount = 0;
		var message = '';

		if ($scope.paymentEvent1 == paymentEventList[3]._id) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') You forgot to specify the <i>Initial Payment Event</i>!</strong>';
		}
		
		if ($scope.paymentStartDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') <i>Initial Payment Days</i> should be positive!</strong>';
		} 

		if (all && $scope.prepaymentAmount > 0) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') <i>Pre-payment Amount</i> could not be specified for the whole specification (only for the current position)!</strong>';
		}

		if ($scope.prepaymentPercent > 100) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') <i>Pre-payment Percent</i> can\' be more than 100%!</strong>';
		}

		if ($scope.prepaymentPercent > 0 && $scope.prepaymentAmount > 0) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') You should specify either <i>Prepayment Percent</i> or <i>Prepayment Amount</i> but not both the same time!</strong>';
		}

		if ($scope.paymentEvent2 != paymentEventList[3]._id && $scope.paymentCloseDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') You should specify <i>Close Payment days</i>!</strong>';
		}

		if ($scope.paymentEvent2 == paymentEventList[3]._id && $scope.paymentCloseDays > 0) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') You should specify <i>Close Payment Event</i>!</strong>';
		}

		if ($scope.prepaymentPercent < 100 && $scope.prepaymentPercent !=0 && $scope.paymentCloseDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') You should specify <i>Close Payment</i> details if <i>Prepayment Percent</i> specified!</strong>';
		}

		if (errorCount == 0) {
			if (all) applyPaymentDetailsToAll()
				else applyPaymentDetails();
		} else {
			message = message.substr(4, message.length-4);
	        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}
	}

	$scope.checkDeliveryDetailsAndApply = function(all) {
		var errorCount = 0;
		var message = '';

		if ($scope.deliveryEvent == deliveryEventList[4]._id) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') You forgot to specify the <i>Delivery Event</i>!</strong>';
		}

		if ($scope.deliveryDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') <i>Delivery Days</i> should be positive!</strong>';
		} 

		if (errorCount == 0) {
			if (all) applyDeliveryDetailsToAll()
				else applyDeliveryDetails();
		} else {
			message = message.substr(4, message.length-4);
	        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}
	}

	function calcAmount() {
		var result = 0;
		
		$scope.filteredObjects.forEach( function(o){
			result += o.price*o.quantity;
		})

		return result.toFixed(2);
	}

	$scope.filters = {
		product: ""
	}

	$scope.filterProduct = function(position){
		console.log('filter');
		if ($scope.filters.product.length == 0) {
			$scope.products = productList;

		} else {
			var filterValue = $scope.filters.product.toLowerCase();
			$scope.products = _.filter(productList, function(o){
				return (o.name.toLowerCase().indexOf(filterValue) > -1)
			})
		}

		if ($scope.products.length > 0) {
			$scope.filteredObjects.map( function(o){
				if (o._id == position._id) {
					o.product._id = $scope.products[0]._id;
					o.product.name = $scope.products[0].name;
				}
				return o;
			})
		}
	}

	$scope.changeCommodity = function(position){
		console.log('change');
		var product = _.find(productList, {_id: position.product._id})

		if (product) {
			$scope.filteredObjects.map( function(o){
				if (o._id == position._id) {
					o.product.name = product.name;
				}
				return o;
			})
		}
	}

	$scope.savePosition = function(position){


		$scope.filteredObjects.map(function(o){
			if (o._id == position._id) {
				o.editing = false;
				o.selected = false;
			}

			return o;
		})

		editingMode = false;
		PositionService.select(undefined);
		$scope.current = undefined;
	}

	$scope.restorePosition = function(position){
		editingMode = false;
		$scope.filteredObjects.map(function(o){
			if (o._id == position._id) {
				o = Object.assign(o, {editing: false, selected: false}, positionBeforeEditing);
			}

			return o;
		})
	}

	$scope.removePosition = function(position){

		if (! position) {
			position = $scope.current;
			if (! position.new)
				removedPositions.push(position._id);
		}

		$scope.filteredObjects = $scope.filteredObjects.filter(function(o){
			return o._id != position._id;
		})

		$scope.recalcTotal();

		PositionService.select(undefined);
		$scope.current = undefined;
	}

	$scope.saveSpecification = function(){
		
		if (isAllPositionsHaveSufficientDataForSaving()) {

			var data = {
				added: [],
				edited: [],
				removed: undefined
			};

			// add new positions
			$scope.filteredObjects.forEach(function(o){
				var newPosition = _.omit(o, ['editing', 'new', '_id', 'product', 'delivery_event', 'pay_event', 'pay_close_event', '$$hashKey', 'selected', 'specification']);
				var changedPosition = _.omit(o, ['editing', 'new', 'product', 'delivery_event', 'pay_event', 'pay_close_event', '$$hashKey', 'selected', 'specification']);
				newPosition = Object.assign(newPosition, 
									{ product: o.product._id},
									{ specification: SpecificationService.current()._id},
									{ delivery_event: o.delivery_event._id},
									{ pay_event: o.pay_event._id},
									{ pay_close_event: o.pay_close_event ? o.pay_close_event._id : undefined},
									{ pay_close_days: o.pay_close_days ? o.pay_close_days : undefined})

				if (o.new) {
					data.added.push( newPosition );
				} else {
					var existingPosition = _.find(initialPositionList, {_id: o._id});

					console.log(existingPosition);
					console.log(newPosition);

					
					if (existingPosition.product._id != newPosition.product ||
						existingPosition.price != newPosition.price ||
						existingPosition.quantity != newPosition.quantity ||
						existingPosition.delivery_days != newPosition.delivery_days ||
						existingPosition.delivery_event._id != newPosition.delivery_event ||
						existingPosition.pay_days != newPosition.pay_days ||
						existingPosition.pay_event._id != newPosition.pay_event ||
						existingPosition.prepay_percent != newPosition.prepay_percent ||
						existingPosition.prepay_amount != newPosition.prepay_amount ||
						existingPosition.pay_close_days != newPosition.pay_close_days ||
						(existingPosition.pay_close_event && existingPosition.pay_close_event._id != newPosition.pay_close_event) ){

							data.edited.push(changedPosition);
					}

					else {
						console.log('position # ' + o._id + ' has not changed');
					}
				}
			})
			data.removed = removedPositions;

			console.log('Data for saving');
			console.log(data);

			SpecificationService.updateData(data)
				.then( function(respond){
					console.log(respond);



					var message = '<strong>Specification data successfully saved!</strong>';
			        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
			        return PositionService.bySpecification(SpecificationService.current()._id)
				})
				.then(function(newPositionList) {
					initialPositionList = JSON.parse(angular.toJson( newPositionList ));
					positionList = newPositionList;
					positionList.map(function(o){
						o.product.name = toUnsafeString(o.product.name);
						return o;
					})
					$scope.filteredObjects = positionList;
				})

		} else {
			var message = '<strong>All positions must have delivery and payment options!</strong>';
	        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}
	}


	function isAllPositionsHaveSufficientDataForSaving(){
		var valid = true;

		$scope.filteredObjects.forEach(function(o) {
			if (! o.delivery_days || ! o.pay_days)
				valid = false;
		})

		return valid;
	}
}

module.exports = PositionCtrl; 
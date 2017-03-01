'use strict';
var _ = require('lodash');

import { DELIVERY_READY_LETTER, PAYMENT_EVENT_NOT_SPECIFIED } from '../../constants/paymentevents';
import { DELIVERY_EVENT_NOT_SPECIFIED, APPLICATION_SENT } from '../../constants/deliveryevents';
import { UKRAINE } from '../../constants/countries';

// import { dict } from '../../i18n/en/dictionary';
import { dict } from '../../i18n/ru/dictionary';

function Ctrl($scope, $state, billPositions, bill, notDelivered, deliveryEventList, paymentEventList, Flash, BillPositionService, BillService) {

	$scope.dict = dict;

	$scope.consumersPositions = notDelivered;

	$scope.showConsumerPositions = false;

	$scope.editingExistedPosition = false;

	var initialPositionList = JSON.parse(angular.toJson( billPositions ));

	$scope.filteredObjects = billPositions;

	$scope.currentBill = bill;

	$scope.with_vat = bill.provider.country == UKRAINE ? true : false;

	$scope.current = undefined;

	$scope.dependOnLetter = false;

	var counter = 0;

	setDefaultDeliveryAndPaymentOptions();

	$scope.filters = {
		product: ""
	}

	$scope.dependOnApplication = false;

	var removedPositions = [];

	var positionBeforeEditing;

	$scope.editingMode = false;

	$scope.deliveryEvents = deliveryEventList;

	$scope.paymentEvents = paymentEventList;

	$scope.addConsumerPosition = function(){
		$scope.showConsumerPositions = true;
	}

	$scope.changeConsumerPosition = function(){
		$scope.showConsumerPositions = true;
	}

	$scope.closeModalWindow = function(){
		$scope.showConsumerPositions = false;

	}

	$scope.setConsumerPosition = function(consumerPosition){
		$scope.current.position = consumerPosition;
		$scope.showConsumerPositions = false;
	}

	$scope.selectConsumerPosition = function(element){
		$scope.consumersPositions.map( function(o){
			if (o._id == element._id) {
				o.selected = ! o.selected;
			} else {
				o.selected = false;
			}

			return o;
		})
	}

	function setDefaultDeliveryAndPaymentOptions(){
		if (billPositions.length > 0) {
			$scope.deliveryDays = Number(billPositions[0].delivery_days);
			$scope.defaultDeliveryEvent = billPositions[0].delivery_event._id;

			$scope.paymentStartDays = Number(billPositions[0].pay_days);
			$scope.defaultPaymentStartEvent = billPositions[0].pay_event._id;
			$scope.paymentCloseDays = billPositions[0].pay_close_days ? Number(billPositions[0].pay_close_days) : 0;
			$scope.defaultPaymentCloseEvent = billPositions[0].pay_close_event ? billPositions[0].pay_close_event._id : paymentEventList[3]._id;

			$scope.prepaymentPercent = billPositions[0].prepay_percent ? Number(billPositions[0].prepay_percent) : 0;
			$scope.prepaymentAmount = 0;
		} else {
			$scope.deliveryDays = 0;
			$scope.defaultDeliveryEvent = DELIVERY_EVENT_NOT_SPECIFIED;

			$scope.paymentStartDays = 0;
			$scope.defaultPaymentStartEvent = PAYMENT_EVENT_NOT_SPECIFIED;
			$scope.paymentCloseDays = 0;
			$scope.defaultPaymentCloseEvent = PAYMENT_EVENT_NOT_SPECIFIED;

			$scope.prepaymentPercent = 0;
			$scope.prepaymentAmount = 0;
		}
	}

	$scope.sumNoVAT = calcAmount();

	$scope.recalcTotal = function() {
		$scope.sumNoVAT = calcAmount();
		// $scope.vat = ($scope.sumNoVAT * 0.2).toFixed(2);
		// $scope.total = ($scope.sumNoVAT * 1.2).toFixed(2);
	}

	$scope.select = function(position) {
		if (! $scope.editingMode) {
			// positionList = _.map(positionList, function(c) {
			$scope.filteredObjects = _.map($scope.filteredObjects, function(c) {
				if (c._id === position._id) {
					if (position.selected) {
						$scope.dependOnLetter = false;
						$scope.dependOnApplication = false;
						
						// deselect 
						$scope.current = undefined;
						BillPositionService.select(undefined);
						c.selected = false;
						return c;
					} else {
						// select consumer 
						BillPositionService.select(position);
						$scope.current = position;
						c.selected = true;

						if (position.hasOwnProperty('pay_event') && (position.pay_event._id == DELIVERY_READY_LETTER || 
								(position.pay_close_event && position.pay_close_event._id == DELIVERY_READY_LETTER))) {
							$scope.dependOnLetter = true;

						} else {
							$scope.dependOnLetter = false;
						}

						// console.log(position.delivery_event);

						if (position.hasOwnProperty('delivery_event') && position.delivery_event._id == APPLICATION_SENT) {
							$scope.dependOnApplication = true;
						} else {
							$scope.dependOnApplication = false;
						}

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

		$scope.editingExistedPosition = false;
		if ($scope.current)
			$scope.current.selected = false;

		$scope.filters.product="";
		var newPosition = {};

		newPosition.new = true;
		newPosition._id = posCounter();
		newPosition.price = 1;
		newPosition.quantity = 1;

		newPosition.editing = true;
		$scope.editingMode = true;

		$scope.filteredObjects.push(newPosition);

		$scope.current = newPosition;
		
		$scope.recalcTotal();
	}

	$scope.edit = function() {
		$scope.editingExistedPosition = true;
		$scope.filters.product="";
		$scope.filteredObjects.map( function(o){
			if (o._id == $scope.current._id) {
				positionBeforeEditing = JSON.parse(angular.toJson( o )); //Object.assign({}, o);
				o.editing = true;
			}

			return o;
		})

		$scope.editingMode = true;
	}

	$scope.remove = function() {
		// PositionService.delete();
	}

	$scope.makePaymentDetails = function(position){
		var result = "";
		if (! position.new || (position.new && position.pay_days)) {
			if (position.prepay_percent) {
				result += '\n' + dict.prepayment + ': ' + position.prepay_percent + '% ( ';
				result += numberSplitted( position.prepay_amount ) + ' UAH )';
			} else {
				if (position.prepay_amount > 0) {
					result += '\n'+ dict.prepayment +': ' + numberSplitted( position.prepay_amount ) + ' UAH ';
				}
			}

			if (position.pay_close_days) {
				result += '\n'+ dict.initial +': ' + position.pay_days + ' ' + dict.day_s + ' ' + dict.after + ' "';
				var event = _.find(paymentEventList, {_id: position.pay_event._id});
				result += event.name_ru + '"';

				result += '\n'+ dict.close +': ' + position.pay_close_days + ' ' + dict.day_s + ' ' + dict.after + ' "';
				var event = _.find(paymentEventList, {_id: position.pay_close_event._id});
				result += event.name_ru + '"';

			} else {
				result += '\n' + position.pay_days + ' ' + dict.day_s + ' ' + dict.after + ' "';
				var event = _.find(paymentEventList, {_id: position.pay_event._id});
				result += event.name_ru + '"';
			}

			result = result.substr(1, result.length-1);
		}

		return result;
	}

	$scope.makeDeliveryDetails = function(position){
		var result = "";
		if (! position.new || (position.new && position.delivery_days)) {

			result += position.delivery_days + ' ' + dict.day_s + ' ' + dict.after + ' "';

			var event = _.find(deliveryEventList, {_id: position.delivery_event._id});
			result += event.name_ru + '"';
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

		if ($scope.paymentEvent1 == PAYMENT_EVENT_NOT_SPECIFIED) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_initial_payment_event_not_specified +'</strong>';
		}
		
		if ($scope.paymentStartDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') ' + dict.msg_initial_payment_days_not_specified + '</strong>';
		} 

		if (all && $scope.prepaymentAmount > 0) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_prepay_amount_for_all +'</strong>';
		}

		if ($scope.prepaymentPercent > 100) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_percent_more_than_100  +'</strong>';
		}

		if ($scope.prepaymentPercent > 0 && $scope.prepaymentAmount > 0) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_both_prepay_option_specified +'</strong>';
		}

		if ($scope.paymentEvent2 != PAYMENT_EVENT_NOT_SPECIFIED && $scope.paymentCloseDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_close_days_not_specified +'</strong>';
		}

		if ($scope.paymentEvent2 == PAYMENT_EVENT_NOT_SPECIFIED && $scope.paymentCloseDays > 0) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_close_event_not_specified +'</strong>';
		}

		if ($scope.prepaymentPercent < 100 && $scope.prepaymentPercent !=0 && $scope.paymentCloseDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_prepay_specified_but_not_close_event +'</strong>';
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

		if ($scope.deliveryEvent == DELIVERY_EVENT_NOT_SPECIFIED) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_delivery_event_not_specified +'</strong>';
		}

		if ($scope.deliveryDays < 1) {
			errorCount++;
	        message += '<br><strong>('+errorCount+') '+ dict.msg_delivery_days_not_specified +'</strong>';
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

	$scope.filterProduct = function(position){
		if ($scope.filters.product.length == 0) {
			$scope.consumersPositions = notDelivered;

		} else {
			var filterValue = $scope.filters.product.toLowerCase();
			$scope.consumersPositions = _.filter(notDelivered, function(o){
				return (o.product.name.toLowerCase().indexOf(filterValue) > -1)
			})
		}
	}

	$scope.savePosition = function(position){

		if (position.quantity > (position.position.quantity - position.position.delivered_quantity)){
			var message = '<strong>'+ dict.msg_buying_more_than_ordered_goods +'</strong>';
	        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		} else {
			$scope.filteredObjects.map(function(o){
				if (o._id == position._id) {
					o.editing = false;
					o.selected = false;
				}

				return o;
			})

			$scope.editingMode = false;
			BillPositionService.select(undefined);
			$scope.current = undefined;
		}

	}

	$scope.restorePosition = function(position){
		$scope.editingMode = false;
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

		BillPositionService.select(undefined);
		$scope.current = undefined;
		$scope.editingMode = false;
	}

	$scope.saveBill = function(){
		// console.log('positions before saving specification');
		// console.log($scope.filteredObjects);

		if (isAllPositionsHaveSufficientDataForSaving()) {

			var data = {
				added: [],
				edited: [],
				removed: undefined
			};

			// add new positions
			$scope.filteredObjects.forEach(function(o){
				// console.log('Object we are investigating');
				// console.log(o);

				var newPosition = _.omit(o, ['editing', 'new', 'bill', '_id', 'position', 'delivery_event', 'pay_event', 'pay_close_event', '$$hashKey', 'selected', 'specification']);

				newPosition = Object.assign({}, newPosition, 
									{ position: o.position._id},
									{ delivery_event: o.delivery_event._id},
									{ bill: bill._id},
									{ prepay_amount: o.prepay_amount > 0 ? o.prepay_amount : undefined},
									{ prepay_percent: o.prepay_percent > 0 ? o.prepay_percent : undefined},
									{ pay_event: o.pay_event._id},
									{ pay_close_event: o.pay_close_event ? o.pay_close_event._id : undefined},
									{ pay_close_days: o.pay_close_days ? o.pay_close_days : undefined})

				if (o.new) {

					// console.log('New position that we try to pastetinto db')
					// console.log(newPosition);

					data.added.push( newPosition );
				} else {
					var existingPosition = _.find(initialPositionList, {_id: o._id});

					if (existingPosition.position._id != newPosition.position ||
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

						newPosition._id = o._id;
						data.edited.push(newPosition);
					} else {
						// console.log('position # ' + o._id + ' has not changed');
					}
				}
			})
			data.removed = removedPositions;

			console.log('Data for saving');
			console.log(data);

			BillService.updateData(data)
				.then( function(respond){

					var message = '<strong>'+ dict.msg_bill_data_saved +'</strong>';
			        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
			        return BillPositionService.byBill(bill._id)
				})
				.then(function(newPositionList) {

					initialPositionList = JSON.parse(angular.toJson( newPositionList ));
					billPositions = newPositionList;
					$scope.filteredObjects = billPositions;
				})

		} else {
			var message = '<strong>'+ dict.msg_delivery_and_payment_options_not_specified +'</strong>';
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

	// $scope.goPayments = function() {
	// 	$state.go('payments');
	// }

	// $scope.goDeliveries = function() {
	// 	$state.go('deliveries');
	// }

	// $scope.goLetters = function() {
	// 	$state.go('letters');
	// }

	// $scope.goApplications = function() {
	// 	$state.go('applications');
	// }
}

module.exports = Ctrl; 
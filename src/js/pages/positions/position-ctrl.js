'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { toSafeString, toUnsafeString } from '../../libs/strings';
import { numberSplitted } from '../../libs/number';

function PositionCtrl($scope, $state, positionList, deliveryEventList, paymentEventList, specification, PositionService) {

	// $scope.currentConsumer = consumer;
	$scope.currentSpecification = specification;
	$scope.currentSpecification.contract.consumer.name = toUnsafeString($scope.currentSpecification.contract.consumer.name);
	$scope.currentSpecification.signed_at_formatted = formattedToRu( new Date($scope.currentSpecification.signed_at))
	$scope.currentSpecification.contract.signed_at_formatted = formattedToRu( new Date($scope.currentSpecification.contract.signed_at))

	$scope.current = undefined;

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
		$scope.deliveryDays = 5;
		$scope.defaultDeliveryEvent = deliveryEventList[4]._id;

		$scope.paymentStartDays = 10;
		$scope.defaultPaymentStartEvent = paymentEventList[3]._id;
		$scope.paymentCloseDays = 5;
		$scope.defaultPaymentCloseEvent = paymentEventList[3]._id;

		$scope.prepaymentPercent = 0;
		$scope.prepaymentAmount = 0;
	}

	filter();

	$scope.select = function(position) {
		positionList = _.map(positionList, function(c) {
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
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})
		//filter();
	}

	$scope.add = function() {
		$state.go('position_add');
	}

	$scope.edit = function() {
		$state.go('position_modify');
	}

	$scope.remove = function() {
		PositionService.delete();
	}

	function filter() {
		$scope.filteredObjects = positionList;
		$scope.sumNoVAT = calcAmount();
		$scope.vat = ($scope.sumNoVAT * 0.2).toFixed(2);
		$scope.total = ($scope.sumNoVAT * 1.2).toFixed(2);
	}

	$scope.splitted = numberSplitted;

	$scope.makePaymentDetails = function(position){
		var result = "";
		if (position.prepay_percent) {
			result += 'Pre-payment: ' + position.prepay_percent + '% ( ';
			result += position.prepay_amount+ ' UAH )';
		}

		if (position.pay_close_days) {
			result += '\nInitial: ' + position.pay_days + ' day(s) after "';
			var event = _.find(paymentEventList, {_id: position.pay_event._id});
			result += event.name + '"';

			result += '\nClose: ' + position.pay_close_days + ' day(s) after "';
			var event = _.find(paymentEventList, {_id: position.pay_close_event._id});
			result += event.name + '"';

		} else {
			result += position.pay_days + ' day(s) after "';
			var event = _.find(paymentEventList, {_id: position.pay_event._id});
			result += event.name + '"';
		}

		return result;
	}

	$scope.makeDeliveryDetails = function(position){
		var result = "";
		result += position.delivery_days + ' day(s) after "';

		var event = _.find(deliveryEventList, {_id: position.delivery_event._id});
		result += event.name + '"';

		return result;
	}

	function calcAmount() {
		var result = 0;
		$scope.filteredObjects.forEach( function(o){
			result += o.price*o.quantity;
		})

		return result.toFixed(2);
	}
}

module.exports = PositionCtrl; 
'use strict';
var _ = require('lodash');

// const DELIVERED = "b6918e10-f21b-11e6-9aad-1b9e7fe7af50";
// const DELIVERY_READY_LETTER = "d0661a90-f21b-11e6-9aad-1b9e7fe7af50";
// const SPECIFICATION_SIGNED = "9f7088d0-f21b-11e6-9aad-1b9e7fe7af50";

import { formattedToSave, formattedToRu, datePlusDays, daysFromToday } from '../../../libs/date';
import { toSafeString, toUnsafeString } from '../../../libs/strings';
import { numberSplitted } from '../../../libs/number';
import { DELIVERED, DELIVERY_READY_LETTER, PAYMENT_AFTER_SPECIFICATION_SIGNED } from '../../../constants/paymentevents';

function Ctrl($scope, $state, positionList, deliveryList, paymentList, letterList) {

	$scope.dangerousMode = false;
	positionList.map(function(o){

		var	days_before_payment;
		var paymentArray = [];

		if (o.prepay_amount && o.payed_amount >= o.prepay_amount) {
			paymentArray.push({
				days: 999,
				danger: "",
				notStarted: false,
				alreadyPayed: true,
			});
		} else {	
			var _date = getPaymentDay(o._id, o.specification.signed_at, o.quantity, o.pay_event._id, o.pay_days);
			days_before_payment = daysFromToday(_date.paymentDate);
			paymentArray.push({
				days: days_before_payment,
				danger: getDangerClass( days_before_payment ),
				notStarted: _date.notStarted,
			});
		}

		if (o.pay_close_days > 0) {

			_date = getPaymentDay(o._id, o.specification.signed_at, o.quantity, o.pay_close_event._id, o.pay_close_days);

			days_before_payment = daysFromToday(_date.paymentDate);
			paymentArray.push({
				days: days_before_payment,
				danger: getDangerClass( days_before_payment ),
				notStarted: _date.notStarted
			});
		}

		var startedEvents = _.reject(paymentArray, 'notStarted');

		var minDays = _.minBy( startedEvents, 'days');

		if (!minDays) {
			o.days_before_payment = 999;
		} else {
			o.days_before_payment = minDays.days;
		}

		o.paymentView = makePaymentCell(paymentArray)

		return o;
	})

	function makePaymentCell(payments){
		var counter = 0,
			result ="",
			preResult = "",
			dangerClass ="",
			minPeriod = 1000;

		payments.forEach(function(p){
			counter++;
			minPeriod = 1000;

			switch (true) {
				case (counter == 1 && payments.length == 2):
					preResult += 'Initial: ';
					break;

				case (counter == 2 && payments.length == 2):
					preResult += '\nClose: ';
			}

			switch (true) {
				case (p.alreadyPayed):
					preResult += 'already payed';
					break;

				case (p.notStarted):
					preResult += 'Not started';
					break;

				case (! p.notStarted):
					preResult += p.days + ' day(s)';
					if (minPeriod > Number(p.days)) {
						minPeriod = Number(p.days);
						dangerClass = p.danger;
					}
			}

			result += preResult;
			preResult = '';
		})

		return {
			view: result,
			danger: dangerClass
		}

	}

	function getPaymentDay(posId, specSignedAt, quantity, evId, days) {
		var base_date,
			payment_date,
			payment_period_not_started;

		switch (evId) {
			case DELIVERED: 
				deliveryList = _.sortBy(deliveryList, ['delivered_at']);

				var positionDeliveries = _.filter(deliveryList, function(o1){
					return o1.position._id == posId
				});

				var totalDelivered = _.sumBy( positionDeliveries, 'quantity' );

				if (totalDelivered >= quantity) {
					base_date = new Date(positionDeliveries[positionDeliveries.length-1].delivered_at.substr(0,10));
				} else {
					base_date = new Date();
					payment_period_not_started = true;
				}
				payment_date = datePlusDays(days, base_date);

				break;

			case DELIVERY_READY_LETTER:

				var letter = _.find( letterList, function(o) {
					return o.position._id == posId;
				});

				if (letter) {
					base_date = new Date(letter.send_at.substr(0,10));
					payment_date = datePlusDays(days, base_date);
				} else {
					base_date = new Date();
					payment_period_not_started = true;
				}
				break;

			case PAYMENT_AFTER_SPECIFICATION_SIGNED:

				base_date = new Date(specSignedAt.substr(0,10));
				payment_date = datePlusDays(days, base_date);
				break;
			default:
				alert('We have unresolved DELIVERY EVENT option');
		}

		return {
			paymentDate : payment_date,
			notStarted : payment_period_not_started,
		}
	}

	function getDangerClass(days) {
		var result;
		switch (true) {
			case (days < 0): 
				result = 'out-term';
				break;
			case (days < 10): 
				result = 'high-priority';
				break;
			case (days < 30): 
				result = 'low-priority';
				break;
			default: 
				result = '';
		}

		return result;
	}

	$scope.changeViewMode = function() {
		$scope.dangerousMode = ! $scope.dangerousMode;

		var sortOrder = $scope.dangerousMode ? ['days_before_payment', 'specification.contract.consumer.name'] : ['specification.contract.consumer.name', 'days_before_payment']

		$scope.positions = _.sortBy(positionList, sortOrder);
	}

	$scope.changeViewMode();
}

module.exports = Ctrl; 
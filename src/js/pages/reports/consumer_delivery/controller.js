'use strict';
var _ = require('lodash');

// const AFTER_PAYED_FULLY = "05c16ce0-f21b-11e6-9aad-1b9e7fe7af50";
// const AFTER_PREPAYED = "17366b60-f21b-11e6-9aad-1b9e7fe7af50";
// const SPECIFICATION_SIGNED = "ea4c4fc0-f21a-11e6-9aad-1b9e7fe7af50";
// const FIXED_DATE = "1e1af220-f21b-11e6-9aad-1b9e7fe7af50";

import { AFTER_PAYED_FULLY, AFTER_PREPAYED, DELIVERY_AFTER_SPECIFICATION_SIGNED, FIXED_DATE } from '../../../constants/deliveryevents';

import { formattedToSave, formattedToRu, datePlusDays, daysFromToday } from '../../../libs/date';
import { toSafeString, toUnsafeString } from '../../../libs/strings';
import { numberSplitted } from '../../../libs/number';

function Ctrl($scope, $state, positionList, deliveryList, paymentList) {

	$scope.dangerousMode = false;
	positionList.map(function(o){

		var base_date, 
			base_date_unix,
			delivery_date,
			days_before_delivery;

		switch (o.delivery_event._id) {
			case AFTER_PREPAYED: 
				paymentList = _.sortBy(paymentList, ['payed_at']);

				var totalPayed = 0;

				var positionPayments = _.filter(paymentList, function(o1){
					return o1.position._id == o._id
				});

				var isAlreadyPrepayed = false;

				paymentList.forEach( function(o1){
					totalPayed += o1.amount;
					if (totalPayed >= o.prepay_amount && ! isAlreadyPrepayed) {
						isAlreadyPrepayed = true;
						base_date = new Date(o1.payed_at.substr(0,10));
						base_date_unix = +new Date(o1.payed_at.substr(0,10));
					}
				})

				if (isAlreadyPrepayed) {
					delivery_date = datePlusDays(o.delivery_days, base_date);
					days_before_delivery = daysFromToday(delivery_date);
				} else {
					base_date = new Date();
					base_date_unix = +new Date();
					delivery_date = datePlusDays(o.delivery_days, base_date);
					days_before_delivery = daysFromToday(delivery_date);
					o.delivery_period_not_started = true;
				}

				break;
			case AFTER_PAYED_FULLY:
				paymentList = _.sortBy(paymentList, ['payed_at']);
				var positionPayments = _.filter(paymentList, function(o1){
					return o1.position._id == o._id
				});

				var totalPayed = _.sumBy( positionPayments, 'amount' );

				if (totalPayed >= (o.price * o.quantity * 1.2)) {
					base_date = new Date(positionPayments[positionPayments.length-1].payed_at.substr(0,10));
					base_date_unix = +new Date(positionPayments[positionPayments.length-1].payed_at.substr(0,10));
					delivery_date = datePlusDays(o.delivery_days, base_date);
					days_before_delivery = daysFromToday(delivery_date);
				} else {
					base_date = new Date();
					base_date_unix = +new Date();
					delivery_date = datePlusDays(o.delivery_days, base_date);
					days_before_delivery = daysFromToday(delivery_date);
					o.delivery_period_not_started = true;
				}

				break;
			case DELIVERY_AFTER_SPECIFICATION_SIGNED:
			case FIXED_DATE:

				base_date = new Date(o.specification.signed_at.substr(0,10));
				base_date_unix = +new Date(o.specification.signed_at.substr(0,10));
				delivery_date = datePlusDays(o.delivery_days, base_date);
				days_before_delivery = daysFromToday(delivery_date);
				break;
			default:
				alert('We have unresolved DELIVERY EVENT option');
		}

		var isHalfTerm = (delivery_date - base_date_unix)/2 > (delivery_date - new Date());

		switch (true) {
			case (days_before_delivery < 0): 
				o.dangerClass = 'out-term';
				break;
			case (days_before_delivery < 10 || isHalfTerm): 
				o.dangerClass = 'high-priority';
				break;
			case (days_before_delivery < 30): 
				o.dangerClass = 'low-priority';
				break;
			default: 
				o.dangerClass = '';
		}
		
		o.days_before_delivery = days_before_delivery;

		return o;
	})

	$scope.changeViewMode = function() {
		$scope.dangerousMode = ! $scope.dangerousMode;

		var sortOrder = $scope.dangerousMode ? ['days_before_delivery', 'specification.contract.consumer.name'] : ['specification.contract.consumer.name', 'days_before_delivery']

		$scope.positions = _.sortBy(positionList, sortOrder);
	}

	$scope.changeViewMode();
}

module.exports = Ctrl; 
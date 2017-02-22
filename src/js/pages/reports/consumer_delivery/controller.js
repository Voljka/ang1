'use strict';
var _ = require('lodash');

import { AFTER_PAYED_FULLY, AFTER_PREPAYED, DELIVERY_AFTER_SPECIFICATION_SIGNED, APPLICATION_SENT } from '../../../constants/deliveryevents';

import { formattedToSave, formattedToRu, datePlusDays, daysFromToday } from '../../../libs/date';
import { toSafeString, toUnsafeString } from '../../../libs/strings';
import { numberSplitted } from '../../../libs/number';

import { dict } from '../../../i18n/ru/dictionary';

function Ctrl($scope, $state, appList, positionList, deliveryList, paymentList) {

	$scope.dict = dict;

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

				base_date = new Date(o.specification.signed_at.substr(0,10));
				base_date_unix = +new Date(o.specification.signed_at.substr(0,10));
				delivery_date = datePlusDays(o.delivery_days, base_date);
				days_before_delivery = daysFromToday(delivery_date);
				break;
			case APPLICATION_SENT:
				var validApp = _.find( appList, function(ap){
					return ap.position._id == o._id;
				})
				
				if (validApp) {
					console.log('found app');
					console.log(validApp);

					base_date = new Date(validApp.send_at.substr(0,10));
					base_date_unix = +new Date(validApp.send_at.substr(0,10));
					delivery_date = datePlusDays(o.delivery_days, base_date);
					days_before_delivery = daysFromToday(delivery_date);
				} else {
					console.log('App not found');
					base_date = new Date();
					base_date_unix = +new Date();
					delivery_date = datePlusDays(o.delivery_days, base_date);
					days_before_delivery = daysFromToday(delivery_date);
					o.delivery_period_not_started = true;
				}
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

	var sortByConsumer = function(obj){
		return obj.specification.contract.consumer.name;
	}

	$scope.changeViewMode = function() {
		$scope.dangerousMode = ! $scope.dangerousMode;

		var sortOrder = $scope.dangerousMode ? ['days_before_delivery', sortByConsumer] : [sortByConsumer, 'days_before_delivery']

		$scope.positions = _.sortBy(positionList, sortOrder);
	}

	$scope.changeViewMode();
}

module.exports = Ctrl; 
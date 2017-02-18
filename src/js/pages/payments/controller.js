'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { numberSplitted } from '../../libs/number';
import { toSafeString, toUnsafeString } from '../../libs/strings';

// function Ctrl($scope, $state, payments, operationType, position, positions, PaymentService) {
function Ctrl($scope, $state, payments, operationType, position, Flash, PaymentService) {

	$scope.showControls = ! _.isEmpty(position);

	$scope.editingMode = false;
	var isCardForEditing;

	$scope.showPaymentCard = false;

	$scope.paymentList = groupPayments(payments);

	$scope.card = {
		paymentDate: undefined,
		paymentAmount: undefined,
		payedAmount: undefined,
		productName: undefined,
		contractAmount: undefined,
	}

	function groupPayments(allPayments) {
		var groupedByConsumer = _.groupBy( payments, function(o){
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

		var result = _.sumBy(payments, function(o){
			
			var objectList = selector.split('.');

			var object = o;
			objectList.forEach( function(p){
				object = object[p];
			})

			if (object == value) {
				return o.amount
			} else {
				return 0
			}
		});
		return result;
	}

	$scope.select = function(payment) {
		if (! _.isEmpty(position)) {
			payments = _.map(payments, function(c) {
				if (c._id === payment._id) {
					// if taken consumer is already selected
					if (PaymentService.current() && PaymentService.current()._id == payment._id) {
						// deselect 
						$scope.current = undefined;
						PaymentService.select(undefined);
						c.selected = false;
						return c;
					} else {
						// select consumer 
						PaymentService.select(payment);
						$scope.current = payment;
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
			paymentAmount: 0.00,
			payedAmount: _.sumBy(payments, 'amount'),
			paymentDate: new Date( ),
			contractAmount: position.price * position.quantity * 1.2,
		}

		$scope.showPaymentCard = true;
	}

	$scope.edit = function() {
		var payment = $scope.current;
		isCardForEditing = true;

		$scope.card = {
			productName: payment.position.product.name,
			paymentAmount: payment.amount,
			payedAmount: _.sumBy(payments, 'amount'),
			paymentDate: new Date( payment.payed_at.substr(0, 10) ),
			contractAmount: position.price * position.quantity * 1.2,
		}

		$scope.showPaymentCard = true;
	}

	$scope.savePayment = function() {

		if ($scope.card.paymentAmount > 0) {

			var isTotalExceeded = false;

			var contractAmount = position.price * position.quantity * 1.2;
			var payedAmount = _.sumBy(payments, 'amount') + $scope.card.paymentAmount;

			if (isCardForEditing) {
				payedAmount = payedAmount - $scope.current.amount;
			}

			if (payedAmount > contractAmount) {
				isTotalExceeded = true;
			}

			if (! isTotalExceeded) {
				var data = {
					position: position._id,
					amount: $scope.card.paymentAmount,
					operation_type: operationType,
					payed_at: $scope.card.paymentDate,
				}

				if (! isCardForEditing) {
					PaymentService.add(data)
						.then(function(newPayment){
							console.log('Added new payment');
							console.log(newPayment);

							payments.push(newPayment);
							$scope.paymentList = groupPayments(payments);
						})
				} else {
					PaymentService.update($scope.current._id, data)
						.then(function(editedPayment){
							console.log('Existing payment edited');
							console.log(editedPayment);

							payments.map( function(o){
								if (o._id == editedPayment._id) {
									o.amount = editedPayment.amount;
									o.payed_at = editedPayment.payed_at;
								}

								return o;
							})
							$scope.paymentList = groupPayments(payments);
						})
				}

				$scope.showPaymentCard = false;
			} else {
				var message = '<strong>Contract Amount for selected Product can\'t be exceeded!</strong>';
		        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
			}
		} else {
			var message = '<strong>Payment Amount can\'t be less than 0.01 !</strong>';
	        var id = Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
		}
	}

	$scope.backToList = function(){
		$scope.showPaymentCard = false;
	}

	$scope.remove = function() {
	}
}

module.exports = Ctrl; 
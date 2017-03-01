'use strict';
var _ = require('lodash');
// import { formattedToSave, formattedToRu } from '../../libs/date';
// import { toSafeString, toUnsafeString } from '../../libs/strings';

import { dict } from '../../i18n/ru/dictionary';

function Ctrl($scope, $state, billList, provider, BillService) {

	$scope.dict = dict;

	$scope.bills = billList;

	$scope.currentProvider = provider;

	$scope.select = function(bill) {
		$scope.bills = _.map($scope.bills, function(c) {
			if (c._id === bill._id) {
				// if taken bill is already selected
				if (bill.selected) {
					// deselect 
					$scope.current = undefined;
					BillService.select(undefined);
					c.selected = false;
					return c;
				} else {
					// select bill
					BillService.select(bill);
					$scope.current = bill;
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})
	}

	$scope.goPositions = function() {
		$state.go('bill_positions');
	}

	// $scope.goPayments = function() {
	// 	$state.go('payments');
	// }

	// $scope.goDeliveries = function() {
	// 	$state.go('deliveries');
	// }

	$scope.add = function() {
		$state.go('bill_add');
	}

	$scope.edit = function() {
		$state.go('bill_modify');
	}

	// $scope.remove = function() {
	// 	SpecificationService.delete();
	// }

}

module.exports = Ctrl; 
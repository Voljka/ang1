'use strict';
var _ = require('lodash');

import { dict } from '../../../i18n/ru/dictionary';
import { WE_PROVIDER } from '../../../constants/operationtypes';

function Ctrl($scope, $state, currentBill, currentProvider, schemas, mediatorList, BillService) {

	$scope.dict = dict;

	$scope.mediators = mediatorList;
	$scope.mediators.push({_id: 999, name: dict.not_specified});

	if ($state.current.name == 'bill_add') {
		$scope.submitCaption = dict.add;
		$scope.billNumber = "";
		$scope.billProvider = currentProvider.name;
		$scope.issued_at = new Date();
		$scope.currentSchema = schemas[0]._id;
		$scope.currentMediator = 999;
		$scope.vat = true;
	} else {
		$scope.submitCaption = dict.update;
		$scope.billNumber = currentBill.number;
		$scope.billProvider = currentBill.provider.name;
		$scope.issued_at = new Date (currentBill.issued_at.substr(0,10));;
		$scope.currentSchema = currentBill.provide_schema._id;
		$scope.currentMediator = currentBill.mediator ? currentBill.mediator._id : 999;
		$scope.vat = currentBill.vat;
	}

	$scope.schemas = schemas;

	$scope.changeSchema = function(){
		if ($scope.billSchema == WE_PROVIDER) {
			$scope.currentMediator = undefined;
			$scope.vat = true;
		} else {
			$scope.currentMediator = 999;
		}
	}

	$scope.save = function() {
		var formData = {};

		formData.number = $scope.billNumber;
		formData.issued_at = $scope.issued_at;
		formData.provider = currentProvider._id;
		formData.provide_schema = $scope.billSchema;
		formData.mediator = $scope.billSchema == WE_PROVIDER ? undefined : $scope.billMediator;
		formData.vat = $scope.vat;

		if ($state.current.name == 'bill_add') {
			BillService.add(formData)
				.then(function(newObject) {
					console.log(newObject);
					$scope.backToList();
				})
		} else {
			BillService.update(currentBill._id, formData)
				.then(function(updatedObject) {
					console.log(updatedObject);
					$scope.backToList();
				})
		}
	}

	$scope.backToList = function() {
		BillService.select(undefined);
		$state.go('bills');
	}
}

module.exports = Ctrl; 
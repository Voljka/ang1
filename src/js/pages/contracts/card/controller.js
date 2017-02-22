'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../../libs/strings';
import { formattedToSave, formattedToRu } from '../../../libs/date';

import { dict } from '../../../i18n/ru/dictionary';

function ContractCardCtrl($scope, $state, consumer, ContractService) {

	$scope.dict = dict;

	consumer.name = toUnsafeString(consumer.name)
	$scope.consumer = consumer;

	if ($state.current.name == 'contract_add') {
		$scope.submitCaption = "Добавить";
		$scope.contractNumber = "";
		$scope.signed_at = new Date();
	} else {
		$scope.submitCaption = "Сохранить";
		$scope.contractNumber = ContractService.current().number;
		$scope.signed_at = new Date (ContractService.current().signed_at.substr(0,10));
	}

	$scope.save = function() {
		var formData = {};

		formData.number = $scope.contractNumber;
		formData.signed_at = $scope.signed_at;
		formData.consumer = $scope.consumer._id;

		if ($state.current.name == 'contract_add') {
			console.log('Saving new contract');
			ContractService.add(formData)
				.then(function(newObject) {
					console.log(newObject);
					$scope.backToList();
				})
		} else {
			console.log('Updating contract');
			ContractService.update(ContractService.current()._id, formData)
				.then(function(updatedObject) {
					console.log(updatedObject);
					$scope.backToList();
				})
		}
	}

	$scope.backToList = function() {
		ContractService.select(undefined);
		$state.go('contracts');
	}
}

module.exports = ContractCardCtrl; 
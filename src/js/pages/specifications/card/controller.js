'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../../libs/strings';
import { formattedToSave, formattedToRu } from '../../../libs/date';

import { dict } from '../../../i18n/ru/dictionary';

function SpecificationCardCtrl($scope, $state, contract, SpecificationService) {

	$scope.dict = dict;

	$scope.contract = contract;

	$scope.contract.consumer.name = toUnsafeString($scope.contract.consumer.name);
	$scope.contract.signed_at_formatted = formattedToRu( new Date($scope.contract.signed_at))

	if ($state.current.name == 'specification_add') {
		$scope.submitCaption = dict.add;
		$scope.specificationNumber = "";
		$scope.signed_at = new Date();
	} else {
		$scope.submitCaption = dict.save_caption;
		$scope.specificationNumber = SpecificationService.current().number;
		$scope.signed_at = new Date (SpecificationService.current().signed_at.substr(0,10));
	}

	$scope.save = function() {
		var formData = {};

		formData.number = $scope.specificationNumber;
		formData.signed_at = $scope.signed_at;
		formData.contract = $scope.contract._id;

		if ($state.current.name == 'specification_add') {
			console.log('Saving new specification');
			SpecificationService.add(formData)
				.then(function(newObject) {
					console.log(newObject);
					$scope.backToList();
				})
		} else {
			console.log('Updating specification');
			SpecificationService.update(SpecificationService.current()._id, formData)
				.then(function(updatedObject) {
					console.log(updatedObject);
					$scope.backToList();
				})
		}
	}

	$scope.backToList = function() {
		SpecificationService.select(undefined);
		$state.go('specifications');
	}
}

module.exports = SpecificationCardCtrl; 
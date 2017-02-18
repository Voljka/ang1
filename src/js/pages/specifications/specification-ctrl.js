'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { toSafeString, toUnsafeString } from '../../libs/strings';

function SpecificationCtrl($scope, $state, specificationList, consumer, contract, SpecificationService) {

	// $scope.currentConsumer = consumer;
	$scope.currentContract = contract;
	$scope.currentContract.consumer.name = toUnsafeString($scope.currentContract.consumer.name);
	$scope.currentContract.signed_at_formatted = formattedToRu( new Date($scope.currentContract.signed_at))

	$scope.current = undefined;

	specificationList.map(function(o){
		return Object.assign(o, { signed_at_formatted: formattedToRu( new Date(o.signed_at)) })
	})

	specificationList = _.orderBy( specificationList, ['signed_at'], ['desc'] );

	filter();

	$scope.select = function(specification) {
		specificationList = _.map(specificationList, function(c) {
			if (c._id === specification._id) {
				// if taken consumer is already selected
				if (SpecificationService.current() && SpecificationService.current()._id == specification._id) {
					// deselect 
					$scope.current = undefined;
					SpecificationService.select(undefined);
					c.selected = false;
					return c;
				} else {
					// select consumer 
					SpecificationService.select(specification);
					$scope.current = specification;
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})
	}

	$scope.goPos = function() {
		$state.go('positions');
	}

	$scope.goPayments = function() {
		$state.go('payments');
	}

	$scope.goDeliveries = function() {
		$state.go('deliveries');
	}

	$scope.add = function() {
		$state.go('specification_add');
	}

	$scope.edit = function() {
		$state.go('specification_modify');
	}

	$scope.remove = function() {
		SpecificationService.delete();
	}

	function filter() {
		$scope.filteredObjects = specificationList;
	}
}

module.exports = SpecificationCtrl; 
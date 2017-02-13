'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { toSafeString, toUnsafeString } from '../../libs/strings';

function PositionCtrl($scope, $state, positionList, specification, PositionService) {

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

	console.log(positionList);

	// specificationList = _.orderBy( specificationList, ['signed_at'], ['desc'] );

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
	}
}

module.exports = PositionCtrl; 
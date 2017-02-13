'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../../libs/strings';

function ConsumerCardCtrl($scope, $state, ConsumerService, GroupService, currentConsumer, groupList) {

	$scope.groups = _.filter(groupList, {is_old: false}); 

	if ($state.current.name === 'consumer_add') {
		$scope.submitCaption = "Add";
		$scope.consumerName = "";
		$scope.consumerCurrentGroup = groupList[0]._id;
	} else {
		$scope.submitCaption = "Update";
		$scope.consumerName = currentConsumer.name;
		$scope.consumerCurrentGroup = currentConsumer.group._id;
	}

	$scope.backToList = function(){
		$state.go('consumers');
	}

	$scope.saveConsumer = function() {
		if ($state.current.name === 'consumer_add') {
			ConsumerService.add({
					name: toSafeString( $scope.consumerName ),
					group: $scope.consumerGroup,
					country: "461990b0-d286-11e6-b131-e3fb6e4b097e"
				})
				.then(function(newConsumer) {
					$scope.backToList();
				})
		} else {
			ConsumerService.update(	
				currentConsumer._id, 
				{
					name: toSafeString( $scope.consumerName ),
					group: $scope.consumerGroup,
					country: "461990b0-d286-11e6-b131-e3fb6e4b097e"
				})
				.then(function(updatedConsumer) {
					$scope.backToList();
				})
		}
	}
}

module.exports = ConsumerCardCtrl; 
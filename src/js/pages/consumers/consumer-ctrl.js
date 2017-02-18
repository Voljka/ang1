'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';

function ConsumerCtrl($scope, $state, ConsumerService) {

	$scope.currentConsumer = ConsumerService.getCurrent();

	ConsumerService.getAll()
		.then(function(data) {
			$scope.consumers = data;
			$scope.consumers = _.map(data, function(o){
				return Object.assign(o, { name: toUnsafeString(o.name)})
			});
			filterConsumers(); 
		})

	$scope.selectConsumer = function(consumer) {
		$scope.consumers = _.map($scope.consumers, function(c) {
			if (c._id === consumer._id) {
				// if taken consumer is already selected
				if (ConsumerService.getCurrent() == consumer) {
					// deselect 
					ConsumerService.select(undefined);
					c.selected = false;
					return c;
				} else {
					// select consumer 
					ConsumerService.select(consumer);
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}

		})
		$scope.currentConsumer = ConsumerService.getCurrent();
	}

	$scope.useConsumerFilter = function(){
		filterConsumers();
	}

	$scope.goContracts = function() {
		$state.go('contracts');
	}

	$scope.goPayments = function() {
		$state.go('payments');
	}

	$scope.goDeliveries = function() {
		$state.go('deliveries');
	}

	$scope.addConsumer = function() {
		$state.go('consumer_add');
	}

	$scope.editConsumer = function() {
		$state.go('consumer_modify');
	}

	$scope.deleteConsumer = function() {
		ConsumerService.delete();
	}

	function filterConsumers() {
		
		if (! $scope.filteredConsumers) {
			$scope.filteredConsumers = $scope.consumers;
		} else {
			$scope.filteredConsumers = _.filter( $scope.consumers, function(o) {
				var consumer = o.name.toLowerCase();
				return consumer.indexOf($scope.consumerFilter.toLowerCase()) > -1
			}) 
		}
	}
}

module.exports = ConsumerCtrl; 
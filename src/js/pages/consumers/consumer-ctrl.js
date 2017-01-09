'use strict';
var _ = require('lodash');

function ConsumerCtrl($scope, $state, ConsumerService) {

	$scope.currentConsumer = ConsumerService.getCurrent();

	ConsumerService.getAll()
		.then(function(data) {
			$scope.consumers = data;
			filterConsumers(); 
		})

	$scope.selectConsumer = function(consumer) {
		// if we select 

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

		// Update Buttons State
		$scope.currentConsumer = ConsumerService.getCurrent();

		setButtonState();
	}

	function setButtonState() {

	} 

	$scope.useConsumerFilter = function(){
		filterConsumers();
	}

	$scope.addConsumer = function() {
		$state.go('consumer_add');
		//ConsumerService.add();
	}

	$scope.editConsumer = function() {
		$state.go('consumer_modify');
		// ConsumerService.update();
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
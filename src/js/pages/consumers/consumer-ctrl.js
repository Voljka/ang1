'use strict';
var _ = require('lodash');

function ConsumerCtrl($scope, ConsumerService) {

	ConsumerService.getAll()
		.then(function(data) {
			$scope.consumers = data;
			filterConsumers(); 
		})

	$scope.selectConsumer = function(consumer) {
		ConsumerService.select(consumer);
	}

	$scope.useConsumerFilter = function(){
		filterConsumers();
	}

	$scope.addConsumer = function() {
		ConsumerService.add();
	}

	$scope.editConsumer = function() {
		ConsumerService.update();
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
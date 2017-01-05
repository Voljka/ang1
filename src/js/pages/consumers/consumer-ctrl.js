'use strict';

function ConsumerCtrl($scope, ConsumerService) {

	ConsumerService.getAll()
		.then(function(data) {
			$scope.consumers = data;
		})

	$scope.selectConsumer = function(consumer) {
		ConsumerService.select(consumer);
	}

}

module.exports = ConsumerCtrl; 
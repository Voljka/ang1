'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';

function ContractCtrl($scope, $state, contractList, consumer, ContractService) {

	$scope.currentConsumer = consumer;
	$scope.current = undefined;

	contractList.map(function(o){
		return Object.assign(o, { signed_at_formatted: formattedToRu( new Date(o.signed_at)) })
	})

	contractList = _.orderBy( contractList, ['signed_at'], ['desc'] );

	filterContracts();

	$scope.select = function(contract) {
		contractList = _.map(contractList, function(c) {
			if (c._id === contract._id) {
				// if taken consumer is already selected
				// if (ContractService.current() && ContractService.current()._id == contract._id) {
				if (contract.selected) {
					// deselect 
					$scope.current = undefined;
					ContractService.select(undefined);
					c.selected = false;
					return c;
				} else {
					// select consumer 
					ContractService.select(contract);
					$scope.current = contract;
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})
	}

	$scope.goSpec = function() {
		console.log('specs');
		$state.go('specifications');
	}

	$scope.useConsumerFilter = function(){
		filterConsumers();
	}

	$scope.add = function() {
		$state.go('contract_add');
	}

	$scope.edit = function() {
		$state.go('contract_modify');
	}

	$scope.remove = function() {
		ConsumerService.delete();
	}

	$scope.goPayments = function() {
		$state.go('payments');
	}

	$scope.goDeliveries = function() {
		$state.go('deliveries');
	}

	function filterContracts() {
		
		if (! $scope.filteredContracts) {
			$scope.filteredContracts = contractList;
		} else {
			$scope.filteredContracts = _.filter( contractList, function(o) {
				var contract = o.number.toLowerCase();
				return contract.indexOf(contractList.toLowerCase()) > -1
			}) 
		}
	}
}

module.exports = ContractCtrl; 
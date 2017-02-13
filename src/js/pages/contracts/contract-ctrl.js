'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';

function ContractCtrl($scope, $state, contractList, consumer, ContractService) {

	$scope.currentConsumer = consumer;

	contractList.map(function(o){
		return Object.assign(o, { signed_at_formatted: formattedToRu( new Date(o.signed_at)) })
	})

	contractList = _.orderBy( contractList, ['signed_at'], ['desc']);

	filterContracts();

	$scope.select = function(contract) {
		contractList = _.map(contractList, function(c) {
			if (c._id === contract._id) {
				// if taken consumer is already selected
				if (ContractService.current() && ContractService.current()._id == contract._id) {
					// deselect 
					ContractService.select(undefined);
					c.selected = false;
					return c;
				} else {
					// select consumer 
					ContractService.select(contract);
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})
	}

	$scope.useConsumerFilter = function(){
		filterConsumers();
	}

	$scope.add = function() {
		$state.go('consumer_add');
	}

	$scope.edit = function() {
		$state.go('consumer_modify');
	}

	$scope.remove = function() {
		ConsumerService.delete();
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
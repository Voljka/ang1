'use strict';
var _ = require('lodash');

import { dict } from '../../i18n/ru/dictionary';

function Ctrl($scope, $state, providerList, ProviderService) {

	$scope.dict = dict;

	filter();

	$scope.select = function(provider) {
		$scope.filteredObjects = _.map($scope.filteredObjects, function(c) {
			if (c._id === provider._id) {
				// if taken provider is already selected
				if (provider.selected) {
					// deselect 
					ProviderService.select(undefined);
					$scope.current = undefined;
					c.selected = false;
					return c;
				} else {
					// select consumer 
					ProviderService.select(provider);
					$scope.current = provider;
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})
	}

	$scope.useFilter = function(){
		filter();
	}

	$scope.goBills = function() {
		$state.go('bills');
	}

	$scope.add = function() {
		$state.go('provider_add');
		if ($scope.current) {
			$scope.current.selected = false;
		}
	}

	$scope.edit = function() {
		$state.go('provider_modify');
	}

	$scope.remove = function() {
		ProviderService.remove($scope.current._id);
	}

	function filter() {
		
		if (! $scope.filteredObjects) {
			$scope.filteredObjects = providerList;
		} else {
			$scope.filteredObjects = _.filter( providerList, function(o) {
				var provider = o.name.toLowerCase();
				return provider.indexOf($scope.providerFilter.toLowerCase()) > -1
			}) 
		}
	}
}

module.exports = Ctrl; 
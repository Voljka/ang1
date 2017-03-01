'use strict';
// var _ = require('lodash');

import { toSafeString } from '../../../libs/strings';
import { dict } from '../../../i18n/ru/dictionary';

function Ctrl($scope, $state, current, countries, ProviderService) {

	$scope.dict = dict;

	$scope.countries = countries;

	if ($state.current.name === 'provider_add') {
		$scope.submitCaption = dict.add;
		$scope.providerCountry = countries[0]._id;
		$scope.providerName = "";
	} else {
		$scope.submitCaption = dict.update;
		$scope.providerCountry = current.country._id;
		$scope.providerName = current.name;
	}

	$scope.backToList = function(){
		$state.go('providers');
	}

	$scope.save = function() {
		if ($state.current.name === 'provider_add') {
			ProviderService.add({
					name: toSafeString( $scope.providerName ),
					country: $scope.providerCountry
				})
				.then(function(newProvider) {
					$scope.backToList();
				})
		} else {
			ProviderService.update(	
				current._id, 
				{
					name: toSafeString( $scope.providerName ),
					country: $scope.providerCountry
				})
				.then(function(updatedProvider) {
					$scope.backToList();
				})
		}
	}
}

module.exports = Ctrl; 
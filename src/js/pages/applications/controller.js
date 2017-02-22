'use strict';
var _ = require('lodash');

import { dict } from '../../i18n/ru/dictionary';

function Ctrl($scope, $state, application, position, AppService) {

	console.log(application);
	
	$scope.dict = dict;
	
	if (_.isEmpty( application ))
		application = undefined;

	$scope.showAppCard = false;

	$scope.application = application;

	var isCardForEditing = false;

	$scope.card = {
		appDate: new Date(),
		productName: "",
	}

	$scope.select = function() {
		application.selected = ! application.selected;
	}

	$scope.add = function() {
		isCardForEditing = false;

		$scope.card = {
			appDate: new Date( ),
			productName: position.product.name,
		}

		$scope.showAppCard = true;
	}

	$scope.edit = function() {
		isCardForEditing = true;

		$scope.card = {
			appDate: new Date( application.send_at.substr(0, 10) ),
			productName: application.position.product.name,
		}

		$scope.showAppCard = true;
	}

	$scope.saveApp = function() {

		var data = {
			position: position._id,
			send_at: $scope.card.appDate,
		}

		if (! isCardForEditing) {
			AppService.add(data)
				.then(function(newApp){
					console.log('Added new application');
					console.log(newApp);

					application = newApp;
					$scope.application = application;
				})
		} else {
			AppService.update(application._id, data)
				.then(function(editedApp){
					console.log('Existing application edited');
					console.log(editedApp);

					application.send_at = editedApp.send_at;
					$scope.application = application;
				})
		}

		$scope.showAppCard = false;
	}

	$scope.backToList = function(){
		$scope.showAppCard = false;
	}

	$scope.remove = function() {
		AppService.remove(application._id)
			.then(function(removedApp){
				application = undefined;
				$scope.application = application;
				$scope.card = {
					appDate: new Date(),
					productName: "",
				}				
			})
	}
}

module.exports = Ctrl; 
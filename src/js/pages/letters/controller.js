'use strict';
var _ = require('lodash');
import { formattedToSave, formattedToRu } from '../../libs/date';
import { toSafeString, toUnsafeString } from '../../libs/strings';

function Ctrl($scope, $state, letter, position, operationType, LetterService) {

	$scope.showLetterCard = false;

	$scope.letter = letter;

	var isCardForEditing = false;

	$scope.card = {
		letterDate: undefined,
		productName: "",
	}

	$scope.select = function() {
		letter.selected = ! letter.selected;
	}

	$scope.add = function() {
		isCardForEditing = false;

		$scope.card = {
			letterDate: new Date( ),
			productName: position.product.name,
		}

		$scope.showLetterCard = true;
	}

	$scope.edit = function() {
		isCardForEditing = true;

		$scope.card = {
			letterDate: new Date( letter.send_at.substr(0, 10) ),
			productName: letter.position.product.name,
		}

		$scope.showLetterCard = true;
	}

	$scope.saveLetter = function() {

		var data = {
			position: position._id,
			operation_type: operationType,
			send_at: $scope.card.letterDate,
		}

		if (! isCardForEditing) {
			LetterService.add(data)
				.then(function(newLetter){
					console.log('Added new letter');
					console.log(newLetter);

					letter = newLetter;
				})
		} else {
			LetterService.update(letter._id, data)
				.then(function(editedLetter){
					console.log('Existing letter edited');
					console.log(editedLetter);

					letter.send_at = editedLetter.send_at;
				})
		}

		$scope.showLetterCard = false;
	}

	$scope.backToList = function(){
		$scope.showLetterCard = false;
	}

	$scope.remove = function() {
	}
}

module.exports = Ctrl; 
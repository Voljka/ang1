var controller = require('./controller');

var letterService = require('../../services/DeliveryLetterService');
var positionService = require('../../services/PositionService');

import { formattedToSave, formattedToRu } from '../../libs/date';

angular.module('letterModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('PositionService', ['$http', positionService])
  .factory('DeliveryLetterService', ['$http', letterService])

  .filter('formatRu', function(){
    return function(datetime){
      return formattedToRu(new Date(datetime.substr(0,10)));
    }
  })
  .controller('LetterCtrl', ['$scope', '$state', 'letter', 'position', 'operationType', 'DeliveryLetterService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'LetterCtrl',
  resolve: {
    letter: ['PositionService', 'DeliveryLetterService', function (PositionService, DeliveryLetterService) {
  		return DeliveryLetterService.byPositionId(PositionService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    position: ['PositionService', function (PositionService) {
      return PositionService.current()
    }],   
    operationType: ['DeliveryLetterService', function (DeliveryLetterService) {
        return DeliveryLetterService.currentType();
    }],        }
};
var controller = require('./controller');

var appService = require('../../services/ApplicationService');
var positionService = require('../../services/PositionService');

import { formattedToSave, formattedToRu } from '../../libs/date';
import { toUnsafeString } from '../../libs/strings';

angular.module('applicationModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('PositionService', ['$http', positionService])
  .factory('AppService', ['$http', appService])
  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })


  .filter('formatRu', function(){
    return function(datetime){
      return formattedToRu(new Date(datetime.substr(0,10)));
    }
  })
  .controller('AppCtrl', ['$scope', '$state', 'application', 'position', 'AppService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'AppCtrl',
  resolve: {
    application: ['PositionService', 'AppService', function (PositionService, AppService) {
  		return AppService.byPositionId(PositionService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    position: ['PositionService', function (PositionService) {
      return PositionService.current()
    }],   
  }  
};
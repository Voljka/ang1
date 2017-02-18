var controller = require('./controller');

var deliveryService = require('../../services/DeliveryService');
var consumerService = require('../../services/ConsumerService');
var contractService = require('../../services/ContractService');
var positionService = require('../../services/PositionService');
var specificationService = require('../../services/SpecificationService');

require('angular-flash-alert');

import { WE_CONSUMER, WE_PROVIDER, WE_MEDIATOR, MEDIATOR_PROVIDER } from '../../constants/operationtypes.js';
import { CONSUMER, CONTRACT, SPECIFICATION, POSITION } from '../../constants/hierarchy.js';
import { formattedToSave, formattedToRu } from '../../libs/date';
import { numberSplitted } from '../../libs/number';

angular.module('deliveryModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })  
  .factory('DeliveryService', ['$http', deliveryService])
  .factory('ContractService', ['$http', contractService])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('PositionService', ['$http', positionService])
  .factory('SpecificationService', ['$http', specificationService])

  .filter('getObjName', function(){
    return function(obj){
      return Object.keys(obj)[0];
    }
  })
  .filter('getObjArray', function(){
    return function(obj){
      return Object.values(obj)[0];
    }
  })
  .filter('formatRu', function(){
    return function(datetime){
      return formattedToRu(new Date(datetime.substr(0,10)));
    }
  })
  .filter('asPrice', function(){
    return function(price){
      return numberSplitted(Number(price));
    }
  })
  .controller('DeliveryCtrl', ['$scope', '$state', 'deliveries', 'operationType', 'position', 'Flash', 'DeliveryService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'DeliveryCtrl',
  resolve: {
    deliveries: ['ConsumerService', 'ContractService', 'SpecificationService', 'PositionService', 'DeliveryService', function (ConsumerService, ContractService, SpecificationService, PositionService, DeliveryService) {
      var id; 

      switch (DeliveryService.currentHierarchy()) {
        case CONSUMER: 
          id = ConsumerService.getCurrent()._id;
          break;
        case CONTRACT: 
          id = ContractService.current()._id;
          break;
        case SPECIFICATION: 
          id = SpecificationService.current()._id;
          break;
        case POSITION: 
          id = PositionService.current()._id;
          break;
      }

  		return DeliveryService.byParent(id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    position: ['DeliveryService', 'PositionService', function (DeliveryService, PositionService) {
      if (DeliveryService.currentHierarchy() == POSITION) {
        return PositionService.current()
      } else {
        return {};
      }
    }],   
    operationType: ['DeliveryService', function (DeliveryService) {
        return DeliveryService.currentType()
    }],   
  }
};
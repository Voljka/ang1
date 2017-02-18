var controller = require('./controller');

var paymentService = require('../../services/PaymentService');
var consumerService = require('../../services/ConsumerService');
var contractService = require('../../services/ContractService');
var positionService = require('../../services/PositionService');
var specificationService = require('../../services/SpecificationService');

require('angular-flash-alert');

import { WE_CONSUMER, WE_PROVIDER, WE_MEDIATOR, MEDIATOR_PROVIDER } from '../../constants/operationtypes.js';
import { CONSUMER, CONTRACT, SPECIFICATION, POSITION } from '../../constants/hierarchy.js';
import { formattedToSave, formattedToRu } from '../../libs/date';
import { numberSplitted } from '../../libs/number';

angular.module('paymentModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })  
  .factory('PaymentService', ['$http', paymentService])
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
  // .controller('PaymentCtrl', ['$scope', '$state', 'payments', 'operationType', 'position', 'positions', 'PaymentService', controller]);
  .controller('PaymentCtrl', ['$scope', '$state', 'payments', 'operationType', 'position', 'Flash', 'PaymentService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'PaymentCtrl',
  resolve: {
    payments: ['ConsumerService', 'ContractService', 'SpecificationService', 'PositionService', 'PaymentService', function (ConsumerService, ContractService, SpecificationService, PositionService, PaymentService) {
      var id; 
      switch (PaymentService.currentHierarchy()) {
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

  		return PaymentService.byParent(id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    position: ['PaymentService', 'PositionService', function (PaymentService, PositionService) {
      if (PaymentService.currentHierarchy() == POSITION) {
        return PositionService.current()
      } else {
        return {};
      }
    }],   
    operationType: ['PaymentService', function (PaymentService) {
        return PaymentService.currentType()
    }],   
    // positions: ['PaymentService', 'SpecificationService', 'PositionService', function (PaymentService, SpecificationService, PositionService) {
    //   if (PaymentService.currentHierarchy() == SPECIFICATION) {
    //     return PositionService.bySpecification( SpecificationService.current()._id )
    //       .then(function(data) {
    //         return data;
    //       })
    //   } else {
    //     return [];
    //   }
    // }],   
  }
};
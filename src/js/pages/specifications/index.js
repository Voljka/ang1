var controller = require('./specification-ctrl');

var consumerService = require('../../services/ConsumerService');
var contractService = require('../../services/ContractService');
var specificationService = require('../../services/SpecificationService');
var paymentService = require('../../services/PaymentService');
var deliveryService = require('../../services/DeliveryService');

import { SPECIFICATION } from '../../constants/hierarchy.js';
import { WE_CONSUMER } from '../../constants/operationtypes.js';
import { toUnsafeString } from '../../libs/strings';

angular.module('specificationModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('ContractService', ['$http', contractService])
  .factory('SpecificationService', ['$http', specificationService])
  .factory('PaymentService', ['$http', paymentService])
  .factory('DeliveryService', ['$http', deliveryService])
  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })
  // .run(['PaymentService', function(PaymentService){
  //   PaymentService.setType(WE_CONSUMER);
  //   PaymentService.setHierarchy(SPECIFICATION);
  // }])
  // .run(['DeliveryService', function(DeliveryService){
  //   DeliveryService.setType(WE_CONSUMER);
  //   DeliveryService.setHierarchy(SPECIFICATION);
  // }])
  .controller('SpecificationCtrl', ['$scope', '$state', 'specificationList', 'consumer', 'contract', 'SpecificationService', controller]);

module.exports = {
  template: require('./specification.tpl'), 
  controller: 'SpecificationCtrl',
  resolve: {
    specificationList: ['ContractService', 'SpecificationService', function (ContractService, SpecificationService) {
  		return  SpecificationService.byContract(ContractService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    consumer: ['ConsumerService', function (ConsumerService) {
      return ConsumerService.getCurrent()
    }],   
    contract: ['ContractService', function (ContractService) {
      return ContractService.current()
    }],   
    operationType: ['PaymentService', 'DeliveryService', function (PaymentService, DeliveryService) {
        PaymentService.setType(WE_CONSUMER);
        PaymentService.setHierarchy(SPECIFICATION);
        DeliveryService.setType(WE_CONSUMER);
        DeliveryService.setHierarchy(SPECIFICATION);
        return true;
    }],          
  }
};
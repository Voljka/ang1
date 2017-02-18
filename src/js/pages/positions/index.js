var controller = require('./controller');
var positionService = require('../../services/PositionService');
var productService = require('../../services/ProductService');
var unitService = require('../../services/UnitService');
var specificationService = require('../../services/SpecificationService');
var paymentEventService = require('../../services/PaymentEventService');
var deliveryEventService = require('../../services/DeliveryEventService');
var paymentService = require('../../services/PaymentService');

require('angular-flash-alert');  

import { POSITION } from '../../constants/hierarchy.js';
import { WE_CONSUMER } from '../../constants/operationtypes.js';

angular.module('positionModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })  
  .factory('PositionService', ['$http', positionService])
  .factory('PaymentService', ['$http', paymentService])
  .factory('ProductService', ['$http', productService])
  .factory('UnitService', ['$http', unitService])
  .factory('PaymentEventService', ['$http', paymentEventService])
  .factory('DeliveryEventService', ['$http', deliveryEventService])
  .factory('SpecificationService', ['$http', specificationService])
  .controller('PositionCtrl', ['$scope', '$state', 'positionList', 'unitList', 'productList', 'deliveryEventList', 'paymentEventList', 'specification', 'Flash', 'SpecificationService', 'ProductService', 'PositionService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'PositionCtrl',
  resolve: {
    positionList: ['PositionService', 'SpecificationService', function (PositionService, SpecificationService) {
      return PositionService.bySpecification(SpecificationService.current()._id)
        .then(function(data) {
          return data;
        })
    }],   
    productList: ['ProductService', function (ProductService) {
      return ProductService.all()
        .then(function(data) {
          return data;
        })
    }],   
    unitList: ['UnitService', function (UnitService) {
      return UnitService.all()
        .then(function(data) {
          return data;
        })
    }],   
    deliveryEventList: ['DeliveryEventService', function (DeliveryEventService) {
      return DeliveryEventService.all()
        .then(function(data) {
          return data;
        })
    }],   
    paymentEventList: ['PaymentEventService', function (PaymentEventService) {
      return PaymentEventService.all()
        .then(function(data) {
          return data;
        })
    }],   
    specification: ['SpecificationService', function (SpecificationService) {
      return SpecificationService.current()
    }], 
    operationType: ['PaymentService', function (PaymentService) {
        PaymentService.setType(WE_CONSUMER);
        PaymentService.setHierarchy(POSITION);
        return true;
    }],          
  }
};

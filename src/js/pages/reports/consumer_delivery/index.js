var controller = require('./controller');
var positionService = require('../../../services/PositionService');
var productService = require('../../../services/ProductService');
var deliveryService = require('../../../services/DeliveryService');
var deliveryLetterService = require('../../../services/DeliveryLetterService');
var paymentService = require('../../../services/PaymentService');
var appService = require('../../../services/ApplicationService');

import { WE_CONSUMER } from '../../../constants/operationtypes.js';
import { toUnsafeString } from '../../../libs/strings';

// angular.module('positionModule', ['ngFlash'])
angular.module('deliveryConsumerReportModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  // .config((FlashProvider) => {
  //     FlashProvider.setTimeout(5000);
  //     FlashProvider.setShowClose(true);
  // })  
  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })

  .factory('PositionService', ['$http', positionService])
  .factory('AppService', ['$http', appService])
  .factory('ProductService', ['$http', productService])
  .factory('DeliveryService', ['$http', deliveryService])
  .factory('DeliveryLetterService', ['$http', deliveryLetterService])
  .factory('PaymentService', ['$http', paymentService])
  .run(['PaymentService', function(PaymentService){
    PaymentService.setType(WE_CONSUMER);
  }])
  .run(['DeliveryLetterService', function(DeliveryLetterService){
    DeliveryLetterService.setType(WE_CONSUMER);
  }])
  .controller('ConsumerDeliveryReportCtrl', ['$scope', '$state', 'appList', 'positionList', 'deliveryList', 'paymentList', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'ConsumerDeliveryReportCtrl',
  resolve: {
    positionList: ['PositionService', function (PositionService) {
      return PositionService.notDelivered()
        .then(function(data) {
          return data;
        })
    }],   
    deliveryList: ['DeliveryService', function (DeliveryService) {
      return DeliveryService.all()
        .then(function(data) {
          return data;
        })
    }],   
    appList: ['AppService', function (AppService) {
      return AppService.all()
        .then(function(data) {
          return data;
        })
    }],   
    paymentList: ['PaymentService', function (PaymentService) {
      return PaymentService.all()
        .then(function(data) {
          return data;
        })
    }],   
  }
}
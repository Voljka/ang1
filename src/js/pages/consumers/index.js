var controller = require('./consumer-ctrl');

var consumerService = require('../../services/ConsumerService');
var paymentService = require('../../services/PaymentService');
var deliveryService = require('../../services/DeliveryService');

import { CONSUMER } from '../../constants/hierarchy.js';
import { WE_CONSUMER } from '../../constants/operationtypes.js';

angular.module('consumerModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('PaymentService', ['$http', paymentService])
  .factory('DeliveryService', ['$http', deliveryService])
  // .run(['PaymentService', function(PaymentService){
  //   PaymentService.setType(WE_CONSUMER);
  //   PaymentService.setHierarchy(CONSUMER);
  // }])
  // .run(['DeliveryService', function(DeliveryService){
  //   DeliveryService.setType(WE_CONSUMER);
  //   DeliveryService.setHierarchy(CONSUMER);
  // }])
  .controller('ConsumerCtrl', ['$scope', '$state', 'ConsumerService', controller]);

module.exports = {
  template: require('./consumer.tpl'), 
  controller: 'ConsumerCtrl',
  resolve: {
    operationType: ['PaymentService', 'DeliveryService', function (PaymentService, DeliveryService) {
        PaymentService.setType(WE_CONSUMER);
        PaymentService.setHierarchy(CONSUMER);
        DeliveryService.setType(WE_CONSUMER);
        DeliveryService.setHierarchy(CONSUMER);
        return true;
    }],          
  }
};
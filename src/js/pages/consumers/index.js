var controller = require('./consumer-ctrl');

var consumerService = require('../../services/ConsumerService');
var paymentService = require('../../services/PaymentService');

import { CONSUMER } from '../../constants/hierarchy.js';
import { WE_CONSUMER } from '../../constants/operationtypes.js';

angular.module('consumerModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('PaymentService', ['$http', paymentService])
  .controller('ConsumerCtrl', ['$scope', '$state', 'ConsumerService', controller]);

module.exports = {
  template: require('./consumer.tpl'), 
  controller: 'ConsumerCtrl',
  resolve: {
    operationType: ['PaymentService', function (PaymentService) {
        PaymentService.setType(WE_CONSUMER);
        PaymentService.setHierarchy(CONSUMER);
        return true;
    }],   	
  }
};
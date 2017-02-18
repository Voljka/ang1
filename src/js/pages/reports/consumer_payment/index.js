var controller = require('./controller');
var positionService = require('../../../services/PositionService');
var deliveryLetterService = require('../../../services/DeliveryLetterService');
var deliveryService = require('../../../services/DeliveryService');
var paymentService = require('../../../services/PaymentService');

// angular.module('positionModule', ['ngFlash'])
angular.module('paymentConsumerReportModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  // .config((FlashProvider) => {
  //     FlashProvider.setTimeout(5000);
  //     FlashProvider.setShowClose(true);
  // })  
  .factory('PositionService', ['$http', positionService])
  .factory('DeliveryLetterService', ['$http', deliveryLetterService])
  .factory('DeliveryService', ['$http', deliveryService])
  .factory('PaymentService', ['$http', paymentService])
  .controller('ConsumerPaymentReportCtrl', ['$scope', '$state', 'positionList', 'deliveryList', 'paymentList', 'letterList', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'ConsumerPaymentReportCtrl',
  resolve: {
    positionList: ['PositionService', function (PositionService) {
      return PositionService.notPayed()
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
    paymentList: ['PaymentService', function (PaymentService) {
      return PaymentService.all()
        .then(function(data) {
          return data;
        })
    }],   
    letterList: ['DeliveryLetterService', function (DeliveryLetterService) {
      return DeliveryLetterService.all()
        .then(function(data) {
          return data;
        })
    }],   
  }
}
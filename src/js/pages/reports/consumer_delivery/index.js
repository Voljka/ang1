var controller = require('./controller');
var positionService = require('../../../services/PositionService');
var productService = require('../../../services/ProductService');
var deliveryService = require('../../../services/DeliveryService');
var paymentService = require('../../../services/PaymentService');

// angular.module('positionModule', ['ngFlash'])
angular.module('deliveryConsumerReportModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  // .config((FlashProvider) => {
  //     FlashProvider.setTimeout(5000);
  //     FlashProvider.setShowClose(true);
  // })  
  .factory('PositionService', ['$http', positionService])
  .factory('ProductService', ['$http', productService])
  .factory('DeliveryService', ['$http', deliveryService])
  .factory('PaymentService', ['$http', paymentService])
  .controller('ConsumerDeliveryReportCtrl', ['$scope', '$state', 'positionList', 'deliveryList', 'paymentList', controller]);

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
    paymentList: ['PaymentService', function (PaymentService) {
      return PaymentService.all()
        .then(function(data) {
          return data;
        })
    }],   
  }
}
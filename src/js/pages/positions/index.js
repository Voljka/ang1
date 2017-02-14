var controller = require('./position-ctrl');
var positionService = require('../../services/PositionService');
var productService = require('../../services/ProductService');
var specificationService = require('../../services/SpecificationService');
var paymentEventService = require('../../services/PaymentEventService');
var deliveryEventService = require('../../services/DeliveryEventService');
require('angular-flash-alert');  

angular.module('positionModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })  
  .factory('PositionService', ['$http', positionService])
  .factory('ProductService', ['$http', productService])
  .factory('PaymentEventService', ['$http', paymentEventService])
  .factory('DeliveryEventService', ['$http', deliveryEventService])
  .factory('SpecificationService', ['$http', specificationService])
  .controller('PositionCtrl', ['$scope', '$state', 'positionList', 'productList', 'deliveryEventList', 'paymentEventList', 'specification', 'Flash', 'SpecificationService', 'PositionService', controller]);

module.exports = {
  template: require('./position.tpl'), 
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
  }
};
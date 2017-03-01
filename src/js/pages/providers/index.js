var controller = require('./provider-ctrl');

var providerService = require('../../services/ProviderService');
var paymentService = require('../../services/PaymentService');
var deliveryService = require('../../services/DeliveryService');

import { toUnsafeString } from '../../libs/strings';

angular.module('providerModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ProviderService', ['$http', providerService])
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
  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })
  .controller('ProviderCtrl', ['$scope', '$state', 'providerList', 'ProviderService', controller]);

module.exports = {
  template: require('./provider.tpl'), 
  controller: 'ProviderCtrl',
  resolve: {
    providerList: ['ProviderService', function (ProviderService) {
      return ProviderService.all()
        .then(function(data) {
          return data;
        })
    }],          
  }
};
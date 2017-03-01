var controller = require('./bill-position-ctrl');

var positionService = require('../../services/PositionService');
var billService = require('../../services/BillService');
var billPositionService = require('../../services/BillPositionService');
var paymentEventService = require('../../services/PaymentEventService');
var deliveryEventService = require('../../services/DeliveryEventService');
require('angular-flash-alert');  

import { numberSplitted } from '../../libs/number';
import { toUnsafeString } from '../../libs/strings';

// import { WE_PROVIDER, MEDIATOR_PROVIDER } from '../../constants/operationtypes';
import { formattedToRu } from '../../libs/date';

import { dict } from '../../i18n/ru/dictionary';

angular.module('billPositionModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('PositionService', ['$http', positionService])
  .factory('BillPositionService', ['$http', billPositionService])
  .factory('BillService', ['$http', billService])
  .factory('PaymentEventService', ['$http', paymentEventService])
  .factory('DeliveryEventService', ['$http', deliveryEventService])

  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })
   .filter('asPrice', function(){
    return function(price){
      return numberSplitted(Number(price));
    }
  })
  .filter('formatRu', function(){
    return function(datetime){
      return formattedToRu(new Date(datetime.substr(0,10)));
    }
  })  
  // .filter('asText', function(){
  //   return function(code){
  //     switch (code) {
  //       case WE_PROVIDER:
  //         return dict.optype_we_provider
  //         break;
  //       case MEDIATOR_PROVIDER:
  //         return dict.optype_mediator_provider
  //         break;
  //     }
  //   }
  // })
  .controller('BillPositionCtrl', ['$scope', '$state', 'billPositions', 'currentBill', 'notDeliveredPositions', 'deliveryEventList', 'paymentEventList', 'Flash', 'BillPositionService', 'BillService', controller]);

module.exports = {
  template: require('./bill-position.tpl'), 
  controller: 'BillPositionCtrl',
  resolve: {
    billPositions: ['BillPositionService', 'BillService', function (BillPositionService, BillService) {
  		return BillPositionService.byBill(BillService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    currentBill: ['BillService', function (BillService) {
      return BillService.current()
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
    notDeliveredPositions: ['PositionService', function (PositionService) {
      return PositionService.notDelivered()
        .then(function(data) {
          return data;
        })
    }],   
  }
};
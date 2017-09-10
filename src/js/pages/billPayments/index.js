var controller = require('./controller');

var billPaymentService = require('../../services/BillPaymentService');
var billPositionService = require('../../services/BillPositionService');
var billService = require('../../services/BillService');

require('angular-flash-alert');

import { WE_PROVIDER, MEDIATOR_PROVIDER } from '../../constants/operationtypes.js';
import { formattedToSave, formattedToRu } from '../../libs/date';
import { numberSplitted } from '../../libs/number';
import { toUnsafeString } from '../../libs/strings';

angular.module('billPaymentModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })  
  .factory('BillPaymentService', ['$http', billPaymentService])
  .factory('BillService', ['$http', billService])
  .factory('BillPositionService', ['$http', billPositionService])

  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })
  .filter('getObjName', function(){
    return function(obj){
      return Object.keys(obj)[0];
    }
  })
  .filter('getObjArray', function(){
    return function(obj){
      return Object.values(obj)[0];
    }
  })
  .filter('formatRu', function(){
    return function(datetime){
      return formattedToRu(new Date(datetime.substr(0,10)));
    }
  })
  .filter('asPrice', function(){
    return function(price){
      return numberSplitted(Number(price));
    }
  })
  .controller('BillPaymentCtrl', ['$scope', '$state', 'payments', 'operationType', 'position', 'Flash', 'BillPaymentService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'BillPaymentCtrl',
  resolve: {
    payments: ['BillPaymentService', 'BillPositionService', function (BillPaymentService, BillPositionService) {
  		return BillPaymentService.byBillPosition(BillPositionService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    position: ['BillPositionService', function (BillPositionService) {
        return BillPositionService.current()
    }],   
    operationType: ['BillPaymentService', function (BillPaymentService) {
        return BillPaymentService.currentType()
    }],   
  }
};
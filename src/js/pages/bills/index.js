var controller = require('./bill-ctrl');

var providerService = require('../../services/ProviderService');
var billService = require('../../services/BillService');

import { toUnsafeString } from '../../libs/strings';

import { WE_PROVIDER, MEDIATOR_PROVIDER } from '../../constants/operationtypes';

import { formattedToRu } from '../../libs/date';

import { dict } from '../../i18n/ru/dictionary';

angular.module('billModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ProviderService', ['$http', providerService])
  .factory('BillService', ['$http', billService])

  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })
  .filter('formatRu', function(){
    return function(datetime){
      return formattedToRu(new Date(datetime.substr(0,10)));
    }
  })  
  .filter('asText', function(){
    return function(code){
      switch (code) {
        case WE_PROVIDER:
          return dict.optype_we_provider
          break;
        case MEDIATOR_PROVIDER:
          return dict.optype_mediator_provider
          break;
      }
    }
  })
  .controller('BillCtrl', ['$scope', '$state', 'billList', 'provider', 'BillService', controller]);

module.exports = {
  template: require('./bill.tpl'), 
  controller: 'BillCtrl',
  resolve: {
    billList: ['BillService', 'ProviderService', function (BillService, ProviderService) {
  		return BillService.byProvider(ProviderService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    provider: ['ProviderService', function (ProviderService) {
      return ProviderService.current()
    }],   
  }
};
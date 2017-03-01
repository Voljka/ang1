'use strict'

var controller = require('./controller');
var billService = require('../../../services/BillService');
var providerService = require('../../../services/ProviderService');
var mediatorService = require('../../../services/MediatorService');

import { toUnsafeString } from '../../../libs/strings';

import { WE_PROVIDER, THROUGH_MEDIATOR } from '../../../constants/operationtypes';
import { dict } from '../../../i18n/ru/dictionary';

angular.module('billCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('BillService', ['$http', billService])
  .factory('ProviderService', ['$http', providerService])
  .factory('MediatorService', ['$http', mediatorService])

  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })

  .controller('BillCardCtrl', ['$scope', '$state', 'currentBill', 'currentProvider', 'schemaList', 'mediatorList', 'BillService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    currentBill: ['BillService', function (BillService) {
      return BillService.current();
    }],
    currentProvider: ['ProviderService', function (ProviderService) {
      return ProviderService.current();
    }],
    mediatorList: ['MediatorService', function (MediatorService) {
      return MediatorService.all()
          .then(function(data){
            return data;
          })
    }],
    schemaList: [function(){
      var list = [];
      list.push({_id: WE_PROVIDER, name: dict.optype_we_provider});
      list.push({_id: THROUGH_MEDIATOR, name: dict.optype_through_mediator});
      return list;
    }],
  },
  controller: 'BillCardCtrl'
};
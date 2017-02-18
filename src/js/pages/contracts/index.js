var controller = require('./contract-ctrl');

var consumerService = require('../../services/ConsumerService');
var contractService = require('../../services/ContractService');
var paymentService = require('../../services/PaymentService');

import { CONTRACT } from '../../constants/hierarchy.js';
import { WE_CONSUMER } from '../../constants/operationtypes.js';

angular.module('contractModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('ContractService', ['$http', contractService])
  .factory('PaymentService', ['$http', paymentService])
  .controller('ContractCtrl', ['$scope', '$state', 'contractList', 'consumer', 'ContractService', controller]);

module.exports = {
  template: require('./contract.tpl'), 
  controller: 'ContractCtrl',
  resolve: {
    contractList: ['ContractService', 'ConsumerService', function (ContractService, ConsumerService) {
  		return  ContractService.byConsumer(ConsumerService.getCurrent()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    consumer: ['ConsumerService', function (ConsumerService) {
  		return ConsumerService.getCurrent()
    }],  	
    operationType: ['PaymentService', function (PaymentService) {
        PaymentService.setType(WE_CONSUMER);
        PaymentService.setHierarchy(CONTRACT);
        return true;
    }],     
  }
};
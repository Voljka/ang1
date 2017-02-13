var controller = require('./contract-ctrl');
var consumerService = require('../../services/ConsumerService');
var contractService = require('../../services/ContractService');

angular.module('contractModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('ContractService', ['$http', contractService])
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
  }
};
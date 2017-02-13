var controller = require('./specification-ctrl');
var consumerService = require('../../services/ConsumerService');
var contractService = require('../../services/ContractService');
var specificationService = require('../../services/SpecificationService');

angular.module('specificationModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('ContractService', ['$http', contractService])
  .factory('SpecificationService', ['$http', specificationService])
  .controller('SpecificationCtrl', ['$scope', '$state', 'specificationList', 'consumer', 'contract', 'SpecificationService', controller]);

module.exports = {
  template: require('./specification.tpl'), 
  controller: 'SpecificationCtrl',
  resolve: {
    specificationList: ['ContractService', 'SpecificationService', function (ContractService, SpecificationService) {
  		return  SpecificationService.byContract(ContractService.current()._id)
  			.then(function(data) {
  				return data;
  			})
    }],  	
    consumer: ['ConsumerService', function (ConsumerService) {
      return ConsumerService.getCurrent()
    }],   
    contract: ['ContractService', function (ContractService) {
      return ContractService.current()
    }],   
  }
};
'use strict'

var controller = require('./controller');
var contractService = require('../../../services/ContractService');
var consumerService = require('../../../services/ConsumerService');

angular.module('contractCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ContractService', ['$http', contractService])
  .factory('ConsumerService', ['$http', consumerService])
  .controller('ContractCardCtrl', ['$scope', '$state', 'consumer', 'ContractService', controller])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    consumer: ['ConsumerService', function (ConsumerService) {
     	return ConsumerService.getCurrent();
    }],
  },
  controller: 'ContractCardCtrl'
};

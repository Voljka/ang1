'use strict'

var controller = require('./controller');
var contractService = require('../../../services/ContractService');
var specificationService = require('../../../services/SpecificationService');

import { toUnsafeString } from '../../../libs/strings';

angular.module('specificationCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ContractService', ['$http', contractService])
  .factory('SpecificationService', ['$http', specificationService])
  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })

  .controller('SpecificationCardCtrl', ['$scope', '$state', 'currentContract', 'SpecificationService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    currentContract: ['ContractService', function (ContractService) {
     	return ContractService.current();
    }],
  },
  controller: 'SpecificationCardCtrl'
};
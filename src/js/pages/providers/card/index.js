var controller = require('./provider-card-ctrl');
var providerService = require('../../../services/ProviderService');
var countryService = require('../../../services/CountryService');

import { toUnsafeString } from '../../../libs/strings';

angular.module('providerCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .filter('toUnsafe', function(){
    return function(str){
      return toUnsafeString(str)
    }
  })
  .factory('ProviderService', ['$http', providerService])
  .factory('CountryService', ['$http', countryService])
  .controller('ProviderCardCtrl', ['$scope', '$state', 'current', 'countries', 'ProviderService', controller]);

module.exports = {
  template: require('./provider-card.tpl'), 
  resolve: {
    current: ['ProviderService', function (ProviderService) {
      	return ProviderService.current();;
    }],
    countries: ['CountryService', function (CountryService) {
        return CountryService.all();;
    }],
  },
  controller: 'ProviderCardCtrl'
};
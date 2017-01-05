// // var userService = require('..services/userService');

// var controller = require('./consumer-ctrl');
// var consumerService = require('../../services/ConsumerService');

// angular.module('normaConsumersModule', [])
// 	// .config('$httpProvider', function($httpProvider) {
// 	// 	$httpProvider.defaults.withCredentials = true;
// 	// })
// 	// .controller('ConsumerCtrl', ['$scope', controller]);
// 	.factory('ConsumerService', ['$http', consumerService])

// module.exports = {
//   template: require('./consumer.tpl'), 
//   controller: ['$scope', 'ConsumerService', controller]
//   // controller: 'ConsumerCtrl'
// };

var controller = require('./consumer-ctrl');
var consumerService = require('../../services/ConsumerService');

angular.module('consumerModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .controller('ConsumerCtrl', ['$scope', 'ConsumerService', controller]);

module.exports = {
  template: require('./consumer.tpl'), 
  controller: 'ConsumerCtrl'
};
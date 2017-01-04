// var userService = require('..services/userService');

var controller = require('./consumer-ctrl');

// angular.module('normaConsumersModule', [])
// 	.config('$httpProvider', function($httpProvider) {
// 		$httpProvider.defaults.withCredentials = true;
// 	})
// 	.controller('ConsumerCtrl', ['$scope', controller]);
// 	// .factory('userService', ['$http', userService])

module.exports = {
  template: require('./consumer.tpl'), 
  controller: ['$scope', controller]
  // controller: 'ConsumerCtrl'
};

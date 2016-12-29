// var userService = require('..services/userService');

// angular.module('normaConsumersModule', [])
// 	.config('$httpProvider', function($httpProvider) {
// 		$httpProvider.defaults.withCredentials = true;
// 	})
// 	.controller('ConsumerCtrl', ['$scope', consumerController]);
// // 	// .factory('userService', ['$http', userService])

var controller = require('./consumer-ctrl');

module.exports = {
  template: require('./consumer.tpl'), 
  controller: ['$scope', controller]
};

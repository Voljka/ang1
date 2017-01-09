var controller = require('./consumer-card-ctrl');
var consumerService = require('../../../services/ConsumerService');
var groupService = require('../../../services/GroupService');

angular.module('consumerCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('GroupService', ['$http', groupService])
  .controller('ConsumerCardCtrl', ['$scope', '$state', 'ConsumerService', 'GroupService', 'currentConsumer', 'groupList', controller]);

module.exports = {
  template: require('./consumer-card.tpl'), 
  resolve: {
    currentConsumer: ['ConsumerService', function (ConsumerService) {
    	var consumer = ConsumerService.getCurrent();
      	return consumer;
    }],
    groupList: ['GroupService', function(GroupService) {
		return GroupService.getAll()
			.then(function(data) {
				return data;
			})
    }]
  },
  controller: 'ConsumerCardCtrl'
};
var angular = require('angular');
require('angular-ui-router');

var consumersTemplate = require('./js/pages/consumers/index');

console.log(consumersTemplate);

var app = angular
	.module('normaApp', ['ui.router'])
	.controller('MainCtrl', function($scope) {
		$scope.temporal_variable = 'Ok';
	})
	.config(function($stateProvider, $urlRouterProvider) {
    
    	$urlRouterProvider.otherwise('/home');
    
    	$stateProvider
        
	        // HOME STATES AND NESTED VIEWS ========================================
	        .state('home', {
	            url: '/home',
	            views: {
	            	'': {
	            		template: "<h3>Consumers</h3>"
	            	},
	            	'filters': {
			            template: "Filters Block"
	            	},
	            	'tables': consumersTemplate
	            	// 'tables': {
			           //  template: consumersTemplate.template
	            	// }

	            }
	        })

	        // .state('home.content', {
	        //     url: '/content',
	        //     template: consumersTemplate.template
	        // })

	        // .state('home.filters', {
	        //     url: '/filters',
	        //     template: consumersTemplate.template
	        // })

	        
	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	        .state('about', {
	            // we'll get to this in a bit       
	        });     
})
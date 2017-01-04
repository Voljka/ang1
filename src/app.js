var angular = require('angular');
require('angular-ui-router');

var consumersTemplate = require('./js/pages/consumers/index');

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
	            }
	        })
	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	        .state('about', {
	            url: '/about',
	            views: {
	            	'': {
	            		template: "<h3>About window</h3>"
	            	},
	            	'filters': {
			            template: "No Filters in that Block"
	            	},
	            	'tables': {
	            		template:"This is the coolest app!" 
	            	}
	            }
	        });     
})
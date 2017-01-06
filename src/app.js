var angular = require('angular');
require('angular-route');
require('angular-ui-router');

var consumersTemplate = require('./js/pages/consumers/index');

var app = angular
	.module('normaApp', ['ui.router', 'ngRoute', 'consumerModule'])

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
	            	'content': consumersTemplate
	            }
	        })
	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
	        .state('about', {
	            url: '/about',
	            views: {
	            	'content':  {
	            		template:"This is the coolest app!" 
	            	}
	            }
	        });     
})

// app.directive('sglclick', ['$parse', function($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attr) {
//           var fn = $parse(attr['sglclick']);
//           var delay = 300, clicks = 0, timer = null;
//           element.on('click', function (event) {
//             clicks++;  //count clicks
//             if(clicks === 1) {
//               timer = setTimeout(function() {
//                 scope.$apply(function () {
//                     fn(scope, { $event: event });
//                 }); 
//                 clicks = 0;             //after action performed, reset counter
//               }, delay);
//               } else {
//                 clearTimeout(timer);    //prevent single-click action
//                 clicks = 0;             //after action performed, reset counter
//               }
//           });
//         }
//     };
// }])
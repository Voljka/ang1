var angular = require('angular');
require('angular-route');
require('angular-ui-router');

var consumersTemplate = require('./js/pages/consumers');
var consumersCardTemplate = require('./js/pages/consumers/card');

var contractsTemplate = require('./js/pages/contracts');
var contractCardTemplate = require('./js/pages/contracts/card');

var specificationsTemplate = require('./js/pages/specifications');
var specificationCardTemplate = require('./js/pages/specifications/card');

var positionsTemplate = require('./js/pages/positions');

var consumerDeliveryReportTemplate = require('./js/pages/reports/consumer_delivery');
var consumerPaymentReportTemplate = require('./js/pages/reports/consumer_payment');

var paymentsTemplate = require('./js/pages/payments');

var deliveriesTemplate = require('./js/pages/deliveries');

var providersTemplate = require('./js/pages/providers');
var mediatorsTemplate = require('./js/pages/mediators');
var summariesTemplate = require('./js/pages/summaries');
var directoriesTemplate = require('./js/pages/directories');

var app = angular
	.module('normaApp', [
		'ui.router', 
		'ngRoute', 
		'consumerModule',
		'consumerCardModule',
		'contractModule',
		'contractCardModule',
		'specificationModule',
		'specificationCardModule',
		'positionModule',
		'deliveryConsumerReportModule',
		'paymentConsumerReportModule',
		'paymentModule',
		'deliveryModule',
	])

	.controller('MainCtrl', function($scope) {
		$scope.temporal_variable = 'Ok';
	})

	.config(function($stateProvider, $urlRouterProvider) {
    
    	$urlRouterProvider.otherwise('/home');
    
    	$stateProvider
	        .state('home', {
	            url: '/home',
	            views: {
	            	'content': {
	            		template: "<h3>Home</h3>"
	            	}
	            }
	        })

	        // Consumers
	        .state('consumers', {
	            url: '/consumers',
	            views: {
	            	'content': consumersTemplate
	            }
	        })
	        .state('consumer_add', {
	            url: '/consumer/new',
	            views: {
	            	'content': consumersCardTemplate
	            }
	        })
	        .state('consumer_modify', {
	            url: '/consumer/modify',
	            views: {
	            	'content': consumersCardTemplate
	            }
	        })

	        // Contracts
	        .state('contracts', {
	            url: '/contracts',
	            views: {
	            	'content': contractsTemplate
	            }
	        })
	        .state('contract_add', {
	            url: '/contract/add',
	            views: {
	            	'content': contractCardTemplate
	            }
	        })
	        .state('contract_modify', {
	            url: '/contract/modify',
	            views: {
	            	'content': contractCardTemplate
	            }
	        })

	        // Specifications
	        .state('specifications', {
	            url: '/specifications',
	            views: {
	            	'content': specificationsTemplate
	            }
	        })
	        .state('specification_add', {
	            url: '/specification/add',
	            views: {
	            	'content': specificationCardTemplate
	            }
	        })
	        .state('specification_modify', {
	            url: '/specification/modify',
	            views: {
	            	'content': specificationCardTemplate
	            }
	        })

	        // Positions
	        .state('positions', {
	            url: '/positions',
	            views: {
	            	'content': positionsTemplate
	            }
	        })

	        // Reports
	        .state('consumer_delivery', {
	            url: '/consumer_report/deliveries',
	            views: {
	            	'content': consumerDeliveryReportTemplate
	            }
	        })
	        .state('consumer_payment', {
	            url: '/consumer_report/payments',
	            views: {
	            	'content': consumerPaymentReportTemplate
	            }
	        })

	        // Payments
	        .state('payments', {
	            url: '/payments',
	            views: {
	            	'content': paymentsTemplate
	            }
	        })

	        // Deliveries
	        .state('deliveries', {
	            url: '/deliveries',
	            views: {
	            	'content': deliveriesTemplate
	            }
	        })

	        .state('providers', {
	            url: '/providers',
	            views: {
	            	'content': providersTemplate
	            }
	        })
	        .state('mediators', {
	            url: '/mediators',
	            views: {
	            	'content': mediatorsTemplate
	            }
	        })
	        .state('summaries', {
	            url: '/summaries',
	            views: {
	            	'content': summariesTemplate
	            }
	        })
	        .state('directories', {
	            url: '/directories',
	            views: {
	            	'content': directoriesTemplate
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
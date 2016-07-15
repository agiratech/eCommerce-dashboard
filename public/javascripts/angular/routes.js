'use strict';

/**
 * Route configuration for the RDash module.
 */
app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('retailers', {
                url: '/retailers',
                templateUrl: 'templates/retailers.html',
                // controller: 'RetailerList'
            })
            .state('retailerDetails', {
                url: '/retailerDetails',
                templateUrl: 'templates/retailerDetails.html',
                // controller: 'RetailerList'
            })
            .state('retaildashShippingOptions', {
                url: '/retaildashShippingOptions',
                templateUrl: 'templates/retaildashShippingOptions.html',
                // controller: 'RetaildashShippingOptionList'
            });
    }
]);
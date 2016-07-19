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
                controller: 'RetailerList'
            })
            .state('retailerShippingOptions', {
                url: '/retailerShippingOptions',
                templateUrl: 'templates/retailerShippingOptions.html',
                controller: 'RetailerShippingOptions'
            })
            .state('retailerLoginAccounts', {
                url: '/retailerLoginAccounts',
                templateUrl: 'templates/retailerLoginAccounts.html',
                controller: 'RetailerLoginAccounts'
            })
            .state('shippingAddresses', {
                url: '/shippingAddresses',
                templateUrl: 'templates/shippingAddresses.html',
                controller: 'ShippingAddresses'
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
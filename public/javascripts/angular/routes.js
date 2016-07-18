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
                // controller: 'RetailerShippingOptions'
            })
            .state('retailerShippingOptionShow', {
                url: '/retailerShippingOption/show',
                templateUrl: 'templates/retailerShippingOptionShow.html',
                // controller: 'RetailerShippingOptions'
            })
            .state('retailerShippingOptionEdit', {
                url: '/retailerShippingOption/edit',
                templateUrl: 'templates/retailerShippingOptionEdit.html',
                // controller: 'RetailerShippingOptions'
            })
            .state('retailerShippingOptionDelete', {
                url: '/retailerShippingOption/delete',
                templateUrl: 'templates/retailerShippingOptionDelete.html',
                // controller: 'RetailerShippingOptions'
            })
            .state('shippingAddresses', {
                url: '/shippingAddresses',
                templateUrl: 'templates/shippingAddresses.html',
                controller: 'ShippingAddresses'
            })
            .state('shippingAddressShow', {
                url: '/shippingAddress/show',
                templateUrl: 'templates/shippingAddresseShow.html',
                controller: 'ShippingAddresses'
            })
            .state('shippingAddresseEdit', {
                url: '/shippingAddresse',
                templateUrl: 'templates/shippingAddresse.html',
                controller: 'ShippingAddresses'
            })
            .state('shippingAddresseDelete', {
                url: '/shippingAddresse/Delete',
                templateUrl: 'templates/shippingAddresseDelete.html',
                controller: 'ShippingAddresses'
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
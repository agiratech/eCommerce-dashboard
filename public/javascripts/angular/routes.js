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
            .state('retailers', {
                url: '/',
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
            .state('retaildashShippingOptions', {
                url: '/retaildashShippingOptions',
                templateUrl: 'templates/retaildashShippingOptions.html',
                controller: 'RetaildashShippingOptionList'
            })
            .state('retailerProductConfigurations', {
                url: '/retailerProductConfigurations',
                templateUrl: 'templates/retailerProductConfigurations.html',
                controller: 'RetailerProductConfigurationList'
            })
            .state('crawlFrequencyConfigurations', {
                url: '/crawlFrequencyConfigurations',
                templateUrl: 'templates/crawlFrequencyConfigurations.html',
                controller: 'CrawlFrequencyConfigurationList'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'templates/products.html',
                controller: 'ProductList'
            });
    }
]);
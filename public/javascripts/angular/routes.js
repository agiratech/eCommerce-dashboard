'use strict';

/**
 * Route configuration for the RDash module.
 */
app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/retailers');

        // Application routes
        $stateProvider
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
            })
            .state('retailerDetails', {
                url: '/retailerDetails/:id',
                templateUrl: 'templates/retailerDetails.html',
                controller: 'GetRetailer'
            })
            .state('retailerProductConfigurationDetails', {
                url: '/retailerProductConfigurationDetails/:id',
                templateUrl: 'templates/retailerProductConfigurationDetails.html',
                controller: 'GetRetailerProductConfig'
            })
            .state('shippingAddressDetails', {
                url: '/shippingAddressDetails/:id',
                templateUrl: 'templates/shippingAddressShow.html',
                controller: 'ShowShippingAddress'
            })
            .state('retailerShippingOptionDetails', {
                url: '/retailerShippingOptionDetails/:id',
                templateUrl: 'templates/retailerShippingOptionShow.html',
                controller: 'ShowShippingOption'
            });
    }
]);

app.directive('bsActiveLink', ['$location', function ($location) {
return {
    restrict: 'A', //use as attribute
    replace: false,
    link: function (scope, elem) {
        //after the state has changed
        scope.$on("$stateChangeSuccess", function () {
            var hrefs = ['/#' + $location.path(),
                         '#' + $location.path(), //html5: false
                         $location.path()]; //html5: true
            angular.forEach(elem.find('a'), function (a) {
                a = angular.element(a);
                if (-1 !== hrefs.indexOf(a.attr('href'))) {
                    a.parent().addClass('active');
                } else {
                    if(false === /\d/.test(hrefs)){
                        a.parent().removeClass('active');
                    }
                };
            });
        });
    }
}
}]);



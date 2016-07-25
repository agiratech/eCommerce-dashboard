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
                controller: 'RetailerList',
                data: {
                        displayName: 'Retailers',
                      }
            })
            .state('retailerShippingOptions', {
                url: '/retailerShippingOptions',
                templateUrl: 'templates/retailerShippingOptions.html',
                controller: 'RetailerShippingOptions',
                data: {
                        displayName: 'Retailer Shipping Options',
                      }
            })
            .state('retailerLoginAccounts', {
                url: '/retailerLoginAccounts',
                templateUrl: 'templates/retailerLoginAccounts.html',
                controller: 'RetailerLoginAccounts',
                data: {
                        displayName: 'Retailer Login Accounts',
                      }
            })
            .state('shippingAddresses', {
                url: '/shippingAddresses',
                templateUrl: 'templates/shippingAddresses.html',
                controller: 'ShippingAddresses',
                data: {
                        displayName: 'Shipping Addresses',
                      }
            })
            .state('retaildashShippingOptions', {
                url: '/retaildashShippingOptions',
                templateUrl: 'templates/retaildashShippingOptions.html',
                controller: 'RetaildashShippingOptionList',
                data: {
                        displayName: 'Retaildash Shipping Options',
                      }
            })
            .state('retailerProductConfigurations', {
                url: '/retailerProductConfigurations',
                templateUrl: 'templates/retailerProductConfigurations.html',
                controller: 'RetailerProductConfigurationList',
                data: {
                        displayName: 'Retailer Product Configurations',
                      }
            })
            .state('crawlFrequencyConfigurations', {
                url: '/crawlFrequencyConfigurations',
                templateUrl: 'templates/crawlFrequencyConfigurations.html',
                controller: 'CrawlFrequencyConfigurationList',
                data: {
                        displayName: 'Crawl Frequency Configurations',
                      }
            })
            .state('products', {
                url: '/products',
                templateUrl: 'templates/products.html',
                controller: 'ProductList',
                data: {
                        displayName: 'Products',
                      }
            })
            .state('retailers.details', {
                url: '/retailerDetails/:id',
                views: {
                        "@": { // rule for absolutely targetting the unnamed view in root unnamed state.
                            templateUrl: 'templates/retailerDetails.html',
                            controller: 'GetRetailer',
                        }
                    },
                data: {
                        displayName: 'Retailer Details',
                      }
            })
            .state('retailerProductConfigurations.details', {
                url: '/retailerProductConfigurationDetails/:id',
                views: {
                        "@": {
                            templateUrl: 'templates/retailerProductConfigurationDetails.html',
                            controller: 'GetRetailerProductConfig',
                        }
                    },
                data: {
                        displayName: 'Retailer Product Configuration Details',
                      }
            })
            .state('shippingAddresses.details', {
                url: '/shippingAddressDetails/:id',
                views: {
                        "@": {
                            templateUrl: 'templates/shippingAddressShow.html',
                            controller: 'ShowShippingAddress',
                        }
                    },
                data: {
                        displayName: 'Shipping Address Details',
                      }
            })
            .state('retailerShippingOptions.details', {
                url: '/retailerShippingOptionDetails/:id',
                views: {
                        "@": {
                            templateUrl: 'templates/retailerShippingOptionShow.html',
                            controller: 'ShowShippingOption',
                        }
                    },
                data: {
                        displayName: 'Retailer Shipping Option Details',
                      }
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



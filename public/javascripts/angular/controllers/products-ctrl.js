app.controller('ProductList', function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("products").then(function(response) {
  $scope.index= 1;
    $scope.productList = response.data.products;
  }, function(response) {
  });
  $scope.next = function() {
    var size = ++$scope.index;
    console.log(size)
    myFactory.getData("products?page="+size).then(function(response) {
      $scope.productList = response.data.products;
    }, function(response) {
    });
  };
  $scope.previous = function() {
    if($scope.index > 1) {
      var size = --$scope.index;
      myFactory.getData("products?page="+size).then(function(response) {
        $scope.productList = response.data.products;
      }, function(response) {
      });
    }
  }
  // $scope.show = function(id) {
  //     angular.forEach($scope.productList, function(value, key){
  //       if (value.retailerProductConfigurationId === id) {
  //         // var modalInstance = $uibModal.open({
  //         //   templateUrl: 'templates/productDetails.html',
  //         //   controller: 'ProductDetails',
  //         //   size: 'lg',
  //         //   resolve: {
  //         //              param: function () {
  //         //                  return {'productDetails' : value };
  //         //              }
  //         //             }
  //         // });
  //         console.log(value)
  //         $location.path('/productDetails/'+value)
  //       };
  //     });
  //   };

  // $scope.gridOptionForProducts = {data: 'productList', columnDefs: [
  //     { name: 'productName'},{ name: 'brand'},{ name: 'color'},{ name: 'status'},{ name: 'shopperType'},{ name: 'salePrice'},{ name: 'shippingFee'},{name: 'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.show(row.entity.retailerProductConfigurationId)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button></div>'}],};
});

// app.controller('ProductDetails', function($scope,myFactory,$stateParams) {
//   $scope.productDetails = $stateParams.data;
//   $scope.close = function () {
//     window.history.back();
//   };
// });
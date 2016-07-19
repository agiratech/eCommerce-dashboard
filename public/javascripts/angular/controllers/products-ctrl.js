app.controller('ProductList', function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("products").then(function(response) {
    $scope.productList = response.data.products;
  }, function(response) {
    alert(response.status);
    alert(response.data);
  });
  $scope.show = function(id) {
      angular.forEach($scope.productList, function(value, key){
        if (value.retailerProductConfigurationId === id) {
          $scope.productDetails = value;
          console.log(value)
          var modalInstance = $uibModal.open({
            templateUrl: 'templates/productDetails.html',
          });
        };
      });
    };
  $scope.gridOptionForProducts = {data: 'productList', columnDefs: [
      { name: 'productName'},{ name: 'brand'},{ name: 'color'},{ name: 'status'},{ name: 'shopperType'},{ name: 'salePrice'},{ name: 'shippingFee'},{name: 'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.show(row.entity.retailerProductConfigurationId)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button></div>'}],};
});
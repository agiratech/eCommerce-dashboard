
app.controller("RetailerList", function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("retailers").then(function(response) {
    $scope.retailerList = response.data.retailers;
  }, function(response) {
    alert(response.status);
    alert(response.data);
  });
  $scope.details = function(id) {
    $location.path("/retailerDetails");
    myFactory.getData("retailer/" + id).then(function(response) {
    $scope.retailerInfo = response.data.retailer;
    }, function(response) {
      alert(response.status);
      alert(response.data);
    });
  };
  $scope.open = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerCreate.html',
    controller: 'CreateRetailer',
    });
  }

  $scope.gridOptions = {data: 'retailerList', columnDefs: [
      { name: 'name', cellTemplate: '<div><a href="{{row.entity.baseUrl}}" target="_blank">{{row.entity.name}}</a></div>'},{name: 'currency'},{name: 'crawlDays'},{name: 'crawlTime'},{name: 'active'},{name: 'Events', cellTemplate: '<div><a  ng-click="grid.appScope.details(row.entity.id)">Show</a></div>'}],
  };
});

app.factory('myFactory', function($http){
    var factory = {};

    factory.getData = function(url){
        return $http.get("http://localhost:8000/v1/" + url);
    };
    factory.createData = function(url,data){
        return $http.post("http://localhost:8000/v1/" + url,data);
    };

    return factory;
});

app.controller('CreateRetailer', function($scope, $uibModalInstance,myFactory) {
  $scope.retailer = {
    "spiderId":"",
    "name":"",
    "baseUrl":"",
    "currency":"",
    "currencyFormat":"",
    "active":"",
    "emails":"",
    "shopperTypeId":""
  };
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.createRetailer = function() {
  var parameter = {"spiderId":parseInt($scope.retailer.spiderId,10),"name":$scope.retailer.name,"baseUrl":$scope.retailer.baseUrl,"currency":$scope.retailer.currency,"currencyFormat":$scope.retailer.currencyFormat,"active":Boolean($scope.retailer.active),"emails":$scope.retailer.emails,"shopperTypeId":parseInt($scope.retailer.shopperTypeId)};
    console.log($scope.retailer)
    console.log(parameter);
    myFactory.createData("retailer",parameter).then(function(response) {
    $scope.Status = response.status;
    alert($scope.Status)
    }, function(response) {
      alert(response.status);
      alert(response.data);
      console.log(response.data);
    });
  };
});

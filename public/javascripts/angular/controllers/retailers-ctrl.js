
app.controller("RetailerList", function($scope,myFactory,$location) {
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

  $scope.gridOptions = {data: 'retailerList', columnDefs: [
      { name: 'name', cellTemplate: '<div><a href="{{row.entity.baseUrl}}" target="_blank">{{row.entity.name}}</a></div>'},{name: 'currency'},{name: 'crawlDays'},{name: 'crawlTime'},{name: 'active'},{name: 'Events', cellTemplate: '<div><a  ng-click="grid.appScope.details(row.entity.id)">Show</a></div>'}],
  };
});

app.factory('myFactory', function($http){
    var factory = {};

    factory.getData = function(url){
        return $http.get("http://localhost:8000/v1/" + url);
    };

    return factory;
});

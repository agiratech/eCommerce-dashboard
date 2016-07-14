app.controller("RetailerList", function($scope,myFactory) {
  myFactory.getData().then(function(response) {
    $scope.retailerList = response.data.retailers;
  }, function(response) {
    alert(response.status);
    alert(response.data);
  });
  $scope.gridOptions = {data: 'retailerList', columnDefs: [
      { name: 'id'},{ name: 'name', cellTemplate: '<div><a href="{{row.entity.baseUrl}}" target="_blank">{{row.entity.name}}</a></div>'},{name: 'currency'},{name: 'crawlDays'},{name: 'crawlTime'},{name: 'active'}],
    };
});

app.factory('myFactory', function($http){
    var factory = {};

    factory.getData = function(){
        return $http.get("http://localhost:8000/v1/retailers");
    };

    return factory;
});
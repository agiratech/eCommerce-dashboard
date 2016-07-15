app.controller("RetaildashShippingOptionList", function($scope,myFactory,$location) {
  myFactory.getData("retaildashShippingOptions").then(function(response) {
    $scope.retaildashShippingOptionList = response.data.retaildashShippingOptions;
  }, function(response) {
    alert(response.status);
    alert(response.data);
  });
  $scope.gridOptionsForRetaildash = {data: 'retaildashShippingOptionList', columnDefs: [
      { name: 'name'},{name: 'Events', cellTemplate: '<div><a>Show</a></div>'}],
  };
});
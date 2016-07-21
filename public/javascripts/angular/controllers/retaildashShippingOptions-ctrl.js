app.controller("RetaildashShippingOptionList", function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("retaildashShippingOptions").then(function(response) {
    $scope.retaildashShippingOptionList = response.data.retaildashShippingOptions;
  }, function(response) {
    $scope.Response = response.data.description;
  });
  $scope.create = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retaildashShippingOptionCreate.html',
    controller: 'CreateRetaildashShippingOption',
    });
  };
  $scope.update = function (data) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retaildashShippingOptionUpdate.html',
    controller: 'UpdateRetaildashShippingOption',
    resolve: {
               param: function () {
                   return {'retaildashShippingOptionInfo' : data };
               }
              }
    });
  };
  $scope.delete = function (id) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retaildashShippingOptionDelete.html',
    controller: 'DeleteRetaildashShippingOption',
    resolve: {
               param: function () {
                   return {'retaildashShippingOptionId' : id };
               }
              }
    });
  };
  $scope.gridOptionsForRetaildash = {data: 'retaildashShippingOptionList', columnDefs: [
      { name: 'name'},{name: 'Events', cellTemplate: '<div class="ui-grid-cell-contents"><i class="fa fa-edit view-icon" ng-click="grid.appScope.update(row.entity)"></i> <i ng-click="grid.appScope.delete(row.entity.id)" class=" ui-grid-cell-contents fa fa-times view-icon" aria-hidden="true"></i></div>'}],
  };
});

app.controller('CreateRetaildashShippingOption', function($scope, $uibModalInstance,myFactory) {
  $scope.retaildashShippingOptionName = "";
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.createRetaildashShippingOption = function() {
    var parameter = {"name":$scope.retaildashShippingOptionName};
    console.log($scope.retaildashShippingOptionName)
    console.log(parameter);
    myFactory.createData("retaildashShippingOption",parameter).then(function(response) {
    console.log(response.data);
    window.location.reload();
    $scope.close();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

app.controller('UpdateRetaildashShippingOption', function($scope, $uibModalInstance, myFactory,param) {
  $scope.retaildashShippingOptionName = param.retaildashShippingOptionInfo.name;
  $scope.retaildashShippingOptionId = param.retaildashShippingOptionInfo.id;
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.updateRetaildashShippingOption = function() {
    var parameter = {"name":$scope.retaildashShippingOptionName};
    console.log($scope.retaildashShippingOptionName)
    console.log(parameter);
    myFactory.updateData("retaildashShippingOption/"+param.retaildashShippingOptionInfo.id,parameter).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

app.controller('DeleteRetaildashShippingOption', function($scope, $uibModalInstance, myFactory,param) {
  $scope.retaildashShippingOptionID = param.retaildashShippingOptionId;
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.deleteRetaildashShippingOption = function() {
    myFactory.deleteData("retaildashShippingOption/"+param.retaildashShippingOptionId).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});
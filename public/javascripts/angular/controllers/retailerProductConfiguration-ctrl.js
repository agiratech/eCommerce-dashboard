app.controller("RetailerProductConfigurationList", function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("retailerProductConfigurations").then(function(response) {
    $scope.retailerProductConfigurationList = response.data.retailerProductConfigurations;
  }, function(response) {
    alert(response.status);
    alert(response.data);
  });
  $scope.show = function(id) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerProductConfigurationDetails.html',
    controller: 'GetRetailerProductConfig',
    size: 'lg',
    resolve: {
               param: function () {
                   return {'retailerProductConfigId' : id };
               }
              }
    });
  };
  $scope.create = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerProductConfigurationCreate.html',
    controller: 'CreateRetailerProductConfig',
    });
  };
  $scope.update = function (id) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerProductConfigurationUpdate.html',
    controller: 'UpdateRetailerProductConfig',
    resolve: {
               param: function () {
                   return {'retailerProductConfigId' : id };
               }
              }
    });
  };
  $scope.gridOptionForRetailerProductConfig = {data: 'retailerProductConfigurationList', columnDefs: [
      { name: 'url'},{ name: 'urlType'},{ name: 'retailerName'},{ name: 'active'},{name: 'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.show(row.entity.id)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button> <button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.update(row.entity.id)"> <i class="fa fa-edit"></i> </button> </div>'}],
  };
});

app.controller('GetRetailerProductConfig', function($scope,$uibModalInstance,myFactory,param) {
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  myFactory.getData("retailerProductConfiguration/" + param.retailerProductConfigId).then(function(response) {
    $scope.retailerProductConfigInfo = response.data.retailerProductConfiguration;
    }, function(response) {
      alert(response.status);
      alert(response.data);
    });
});

app.controller('CreateRetailerProductConfig', function($scope, $uibModalInstance,myFactory) {
  $scope.RetailerProductConfig = {
    "retailerId":"",
    "url":"",
    "urlType":"",
    "keyword":"",
    "description":"",
    "active":"",
    "maxNumberOfRecords":""
  }
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.createRetailerProductConfig = function() {
    var parameter = {"retailerId":parseInt($scope.RetailerProductConfig.retailerId,10),"url":$scope.RetailerProductConfig.url,"urlType":$scope.RetailerProductConfig.urlType,"keyword":$scope.RetailerProductConfig.keyword,"description":$scope.RetailerProductConfig.description,"active":Boolean($scope.RetailerProductConfig.active),"maxNumberOfRecords":parseInt($scope.RetailerProductConfig.maxNumberOfRecords)};
    myFactory.createData("retailerProductConfiguration",parameter).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      alert(response.status);
      console.log(response.data);
    });
  };
});

app.controller('UpdateRetailerProductConfig', function($scope, $uibModalInstance, myFactory,param) {
  $scope.productConfigId = param.retailerProductConfigId;
  $scope.RetailerProductConfig = {
    "active":"",
    "maxNumberOfRecords":""
  }
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.updateRetailerProductConfig = function() {
    var parameter = {"active":Boolean($scope.RetailerProductConfig.active),"maxNumberOfRecords":parseInt($scope.RetailerProductConfig.maxNumberOfRecords)};
    myFactory.updateData("retailerProductConfiguration/"+param.retailerProductConfigId,parameter).then(function(response) {
      console.log($scope.RetailerProductConfig.active)
      console.log(parameter)
    console.log(response.data);
    // $scope.close();
    // window.location.reload();
    }, function(response) {
      alert(response.status);
      console.log(response.data);
    });
  };
});
app.controller("RetailerProductConfigurationList", function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("retailerProductConfigurations").then(function(response) {
    $scope.retailerProductConfigurationList = response.data.retailerProductConfigurations;
  }, function(response) {
    $scope.Response = response.data.description;
  });
  $scope.show = function(id) {
    $location.path('/retailerProductConfigurationDetails/'+id);
  };
  $scope.create = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerProductConfigurationCreate.html',
    controller: 'CreateRetailerProductConfig',
    });
  };
  $scope.update = function (data) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerProductConfigurationUpdate.html',
    controller: 'UpdateRetailerProductConfig',
    resolve: {
               param: function () {
                   return {'retailerProductConfigInfo' : data };
               }
              }
    });
  };
  $scope.gridOptionForRetailerProductConfig = {data: 'retailerProductConfigurationList', columnDefs: [
      { name: 'url'},{ name: 'urlType'},{ name: 'retailerName'},{ name: 'active'},{name: 'Events', cellTemplate: '<div class="ui-grid-cell-contents"><a class="fa fa-eye view-icon" ui-sref="retailerProductConfigurations.details({id: row.entity.id})"></a> <i class=" ui-grid-cell-contents fa fa-edit view-icon" ng-click="grid.appScope.update(row.entity)"></i></div>'}],
      //<i class="fa fa-eye view-icon" ng-click="grid.appScope.show(row.entity.id)" aria-hidden="true"> </i>
  };
});

app.controller('GetRetailerProductConfig', function($scope,myFactory,$stateParams) {
  $scope.close = function () {
    window.history.back();
  };
  myFactory.getData("retailerProductConfiguration/" + $stateParams.id).then(function(response) {
    $scope.retailerProductConfigInfo = response.data.retailerProductConfiguration;
    }, function(response) {
      $scope.Response = response.data.description;
    });
});

app.controller('CreateRetailerProductConfig', function($scope, $uibModalInstance,myFactory) {
  $scope.RetailerProductConfig = {
    "retailerId":"",
    "url":"",
    "urlType":"",
    "keyword":"",
    "description":"",
    "active":true,
    "maxNumberOfRecords":""
  }
  $scope.maxShow = function(type){
    if (type == "PDP"){
      $scope.maxValue = ""
    }else {
      $scope.maxValue = type
    }
  };
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  myFactory.getData("retailers").then(function(response) {
  $scope.retailerList = response.data.retailers;
  console.log($scope.retailerList)
}, function(response) {
  alert(response.status);
  alert(response.data);
});
  $scope.Urltype =["SRCH","CDP","PDP"];
  $scope.createRetailerProductConfig = function() {
    var parameter = {"retailerId":parseInt($scope.RetailerProductConfig.retailerId,10),"url":$scope.RetailerProductConfig.url,"urlType":$scope.RetailerProductConfig.urlType,"keyword":$scope.RetailerProductConfig.keyword,"description":$scope.RetailerProductConfig.description,"active":$scope.RetailerProductConfig.active,"maxNumberOfRecords":parseInt($scope.RetailerProductConfig.maxNumberOfRecords)};
    myFactory.createData("retailerProductConfiguration",parameter).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

app.controller('UpdateRetailerProductConfig', function($scope, $uibModalInstance, myFactory,param) {
  $scope.RetailerProductConfig = {
    "id":param.retailerProductConfigInfo.id,
    "active":param.retailerProductConfigInfo.active,
    "maxNumberOfRecords":param.retailerProductConfigInfo.maxNumberOfRecords
  }
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.updateRetailerProductConfig = function() {
    var parameter = {"active":$scope.RetailerProductConfig.active,"maxNumberOfRecords":parseInt($scope.RetailerProductConfig.maxNumberOfRecords)};
    myFactory.updateData("retailerProductConfiguration/"+param.retailerProductConfigInfo.id,parameter).then(function(response) {
      console.log($scope.RetailerProductConfig.active)
      // console.log(parameter)
      // console.log(response.data);
      $scope.close();
      window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});
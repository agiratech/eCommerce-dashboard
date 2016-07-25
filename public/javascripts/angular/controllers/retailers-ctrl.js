
app.controller("RetailerList", function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("retailers").then(function(response) {
    $scope.retailerList = response.data.retailers;
  }, function(response) {
    $scope.Response = response.data.description;
  });
  $scope.show = function(id) {
    console.log(id)
    myFactory.getData("retailer/" + id).then(function(response) {
        console.log("asfdddd")
          // $scope.date = response.data.crawlDays
          // $scope.time = response.data.crawlTime
          // console.log(9875541)
          // $scope.time_hour = $scope.time.split(":")
          // if (len($scope.time_hour) <= 2){
          //   $scope.time_hours = $scope.time_hour[0]
          //   $scope.time_munite = $scope.time_hour[1]
          //   console.log(777777)
          // }
          // }, function(response) {
          });
    // $location.path('/retailerDetails/'+id);
  };
  $scope.create = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerCreate.html',
    controller: 'CreateRetailer',
    });
  };
  $scope.update = function (data) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerUpdate.html',
    controller: 'UpdateRetailer',
    resolve: {
               param: function () {
                   return {'retailerInfo' : data };
               }
              }
    });
  };
  $scope.delete = function (data) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/retailerDelete.html',
    controller: 'DeleteRetailer',
    resolve: {
               param: function () {
                   return {'retailerInfo' : data };
               }
              }
    });
  };

  $scope.gridOptions = {data: 'retailerList', columnDefs: [
      { name: 'name', cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{row.entity.baseUrl}}" target="_blank">{{row.entity.name}}</a></div>'},{name: 'currency'},{name: 'active'},{name:'Events', cellTemplate: '<div class="ui-grid-cell-contents"> <a class="fa fa-eye view-icon" ui-sref="retailers.details({id: row.entity.id})"></a></div>'}],
      //  <i class="fa fa-eye view-icon" ng-click="grid.appScope.show(row.entity.id)" aria-hidden="true"></i> <i class="fa fa-edit edit-icon" ng-click="grid.appScope.update(row.entity)"></i> <i ng-click="grid.appScope.delete(row.entity)" class="fa fa-times delete-icon" aria-hidden="true"></i>
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
    factory.updateData = function(url,data){
        return $http.put("http://localhost:8000/v1/" + url,data);
    };
    factory.deleteData = function(url){
        return $http.delete("http://localhost:8000/v1/" + url);
    };

    return factory;
});

app.controller('GetRetailer', function($scope,myFactory,$stateParams) {
  $scope.close = function () {
    window.history.back();
  };
  myFactory.getData("retailer/" + $stateParams.id).then(function(response) {
        console.log("asfdddd")
          $scope.date = response.data.retailer.crawlDays
          $scope.time = response.data.retailer.crawlTime
          $scope.time_hours =[];
          $scope.time_munite = [];
          var timeAndHour = $scope.time.split(",");
          for(var i = 0; i < timeAndHour.length; i++){
          console.log($scope.time_hour)
          $scope.time_hour = timeAndHour[i].split(":")
          $scope.time_hours.push($scope.time_hour[0])
          $scope.time_munite.push($scope.time_hour[1])
          }
          }, function(response) {
  });
  myFactory.getData("retailer/" + $stateParams.id).then(function(response) {
    $scope.retailerInfo = response.data.retailer;
    }, function(response) {
      $scope.Response = response.data.description;
    });
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
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

app.controller('UpdateRetailer', function($scope, $uibModalInstance, myFactory,param) {
  $scope.retailer = {
    "id":param.retailerInfo.id,
    "spiderId":param.retailerInfo.spiderId,
    "name":param.retailerInfo.name,
    "baseUrl":param.retailerInfo.baseUrl,
    "currency":param.retailerInfo.currency,
    "currencyFormat":param.retailerInfo.currencyFormat,
  };
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.updateRetailer = function() {
    var parameter = {"spiderId":parseInt($scope.retailer.spiderId,10),"name":$scope.retailer.name,"baseUrl":$scope.retailer.baseUrl,"currency":$scope.retailer.currency,"currencyFormat":$scope.retailer.currencyFormat};
    console.log($scope.retailer)
    console.log(parameter);
    myFactory.updateData("retailer/"+param.retailerInfo.id,parameter).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

app.controller('DeleteRetailer', function($scope, $uibModalInstance, myFactory,param) {
  $scope.retailerName = param.retailerInfo.name;
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.deleteRetailer = function() {
    myFactory.deleteData("retailer/"+param.retailerInfo.id).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

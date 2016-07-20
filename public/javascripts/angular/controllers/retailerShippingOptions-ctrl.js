/**
sample RetailerShippingOptions controler
**/

app.controller("RetailerShippingOptions", ['$uibModal','$location','$rootScope','$scope','$http', function ($uibModal,$location,$rootScope,$scope,$http) {
        // $rootScope.row = "";
        // $scope.keyword = '';
        $scope.form = [];
        $scope.GetAllData = function () {
            console.log(11111111111)
            $http.get('http://localhost:8000/v1/retailerShippingOptions')
            .success(function (data, status, headers, config) {
                $scope.value = data.retailerShippingOptions;

            })
            .error(function (data, status, header, config) {
              console.log(11111111111)
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
        };
        // show the shipping option detail
        $scope.showRow = function(show) {
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/retailerShippingOptionShow.html',
          controller: 'ShowShippingOption',
          resolve: {
             param: function(){
                return { "show" : show };
               }
            }
          });
          }
        // add to form button
        $scope.addRow = function() {
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/retailerShippingOptionCreate.html',
          controller: 'CreateShippingOption',
          });
          }
        // update row details
        $scope.updateRow = function(update) {
          $scope.updateValue = update
          console.log($scope.updateValue)
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/retailerShippingOptionUpdate.html',
          controller: 'UpdateShippingOption',
          resolve: {
             param: function(){
                return { "update" : update };
               }
            }
          });
          }
        $scope.deleteRow = function(deleterow) {
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/retailerShippingOptionDelete.html',
          controller: 'DeleteShippingOption',
          resolve: {
             param: function(){
                return { "deleterow" : deleterow };
               }
            }
          });
          }
        console.log($scope.GetAllData())
        $scope.gridOptions = { data: 'value', columnDefs: [ {name: 'name'},{name: 'retailerName'}, {name: 'retaildashShippingOptionName'}, {name:'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.showRow(row.entity)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button>  <button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.updateRow(row.entity)"> <i class="fa fa-edit"></i> </button> <button value="remove" class = "btn btn-xs btn-primary" ng-click="grid.appScope.deleteRow(row.entity)"><i class="fa fa-times" aria-hidden="true"></i></button></div>'}],
        };
      }])
      .controller('CreateShippingOption', function($scope, $uibModalInstance,$http) {
        $scope.retailerShippingOption = {
          "retailerId": "",
          "retaildashShippingOptionId": "",
          "name": "",
          "retailerName": "",
          "retaildashShippingOptionName": ""
        };
        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.CreateShippingOptionValue = function() {
        var parameter = {"retailerId":parseInt($scope.retailerShippingOption.retailerId,10),"retaildashShippingOptionId":parseInt($scope.retailerShippingOption.retaildashShippingOptionId,10),"name":$scope.retailerShippingOption.name,"retailerName":$scope.retailerShippingOption.retailerName,"retaildashShippingOptionName":$scope.retailerShippingOption.retaildashShippingOptionName};
          console.log($scope.retailerShippingOption)
          console.log(parameter);
          $http.post('http://localhost:8000/v1/' + "retailerShippingOption",parameter)
              .success(function (data, status, headers, config) {
                  console.log($scope.data)
                  $uibModalInstance.dismiss('cancel');
                  window.location.reload()
              })
              .error(function (data, status, header, config) {
                console.log(data)
                $scope.Response = data.description;
          });
          };
    })
    .controller('UpdateShippingOption', function($scope, $uibModalInstance,$http,param) {
        $scope.updateValue = parseInt(param.id)
        $scope.retailerShippingOption = {
          "id": param.update.id,
          "retailerId": param.update.retailerId,
          "retaildashShippingOptionId": param.update.retaildashShippingOptionId,
          "name": param.update.name,
          "retailerName": param.update.retailerName,
          "retaildashShippingOptionName": param.update.retaildashShippingOptionName
        };
        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.UpdateShippingOptionValue = function() {
        var parameter = {"retailerId":parseInt($scope.retailerShippingOption.retailerId,10),"retaildashShippingOptionId":parseInt($scope.retailerShippingOption.retaildashShippingOptionId,10),"name":$scope.retailerShippingOption.name,"retailerName":$scope.retailerShippingOption.retailerName,"retaildashShippingOptionName":$scope.retailerShippingOption.retaildashShippingOptionName};
          console.log($scope.retailerShippingOption)
          console.log(parameter);
          $http.put('http://localhost:8000/v1/' + "retailerShippingOption/"+param.update.id,parameter)
              .success(function (data, status, headers, config) {
                  console.log($scope.data)
                  $uibModalInstance.dismiss('cancel');
                  window.location.reload()
              })
              .error(function (data, status, header, config) {
                console.log(data)
                $scope.Response = data.description;
              });
          };
    })
    .controller('ShowShippingOption', function($scope, $uibModalInstance,$http,param) {
        $scope.updateValue = parseInt(param.show)
        $scope.retailerShippingOption = {
          "name": param.show.name,
          "retailerName": param.show.retailerName,
          "retaildashShippingOptionName": param.show.retaildashShippingOptionName
        };
        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('DeleteShippingOption', function($scope,$templateCache, $uibModalInstance,$location,$http,param) {
        $scope.updateValue = parseInt(param.id)
        $scope.retailerShippingOption = {
          "id": param.deleterow.id,
          "retailerId": param.deleterow.retailerId,
          "retaildashShippingOptionId": param.deleterow.retaildashShippingOptionId,
          "name": param.deleterow.name,
          "retailerName": param.deleterow.retailerName,
          "retaildashShippingOptionName": param.deleterow.retaildashShippingOptionName
        };
        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };
        $scope.DeleteShippingOptionValue = function() {
        var parameter = {"id":parseInt($scope.retailerShippingOption.id,10),"retailerId":parseInt($scope.retailerShippingOption.retailerId,10),"retaildashShippingOptionId":parseInt($scope.retailerShippingOption.retaildashShippingOptionId,10),"name":$scope.retailerShippingOption.name,"retailerName":$scope.retailerShippingOption.retailerName,"retaildashShippingOptionName":$scope.retailerShippingOption.retaildashShippingOptionName};
          console.log($scope.retailerShippingOption)
          $http.delete('http://localhost:8000/v1/' + "retailerShippingOption/"+param.deleterow.id,parameter)
              .success(function (data, status, headers, config) {
                  console.log($scope.data)
                  // $route.$location.path();
                  console.log($location.path()) //need to add the path of calendar page
                  $uibModalInstance.dismiss('cancel');
                  window.location.reload()
              })
              .error(function (data, status, header, config) {
                console.log(data)
                $scope.Response = data.description;
              });
          };
    });
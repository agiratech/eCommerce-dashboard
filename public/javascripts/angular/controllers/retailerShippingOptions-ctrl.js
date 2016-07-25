/**
sample RetailerShippingOptions controler
**/
app.controller("RetailerShippingOptions", ['$uibModal','$location','$rootScope','$scope','$http', function ($uibModal,$location,$rootScope,$scope,$http) {
        // $rootScope.row = "";
        // $scope.keyword = '';
        $scope.GetAllData = function () {
            $http.get('http://localhost:8000/v1/retailerShippingOptions')
            .success(function (data, status, headers, config) {
                $scope.value = data.retailerShippingOptions;

            })
            .error(function (data, status, header, config) {
                $scope.Response = data.description;
            });
        };
        $scope.GetAllData()
        // show the shipping option detail
        $scope.showRow = function(show) {
          $location.path('/retailerShippingOptionDetails/'+show.id);
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
        // console.log($scope.GetAllData())
        $scope.gridOptions = { data: 'value', columnDefs: [ {name: 'name'},{name: 'retailerName'}, {name: 'retaildashShippingOptionName'}, {name:'Events', cellTemplate: '<div class="ui-grid-cell-contents"><a class="fa fa-eye view-icon" ui-sref="retailerShippingOptions.details({id: row.entity.id})"></a> <i class="ui-grid-cell-contents fa fa-edit view-icon" ng-click="grid.appScope.updateRow(row.entity)"></i> <i ng-click="grid.appScope.deleteRow(row.entity)" class=" ui-grid-cell-contents fa fa-times view-icon" aria-hidden="true"></i></div>'}],
        };
        // <i class="fa fa-eye view-icon" ng-click="grid.appScope.showRow(row.entity)" aria-hidden="true"> </i>
      }])
      .controller('CreateShippingOption', function($scope, $uibModalInstance,$http,myFactory) {
        $scope.retailerShippingOption = {
          "retailerId": "",
          "retaildashShippingOptionId": "",
          "name": "",
          "retailerName": "",
          "retaildashShippingOptionName": ""
        };
        myFactory.getData("retailers").then(function(response) {
          $scope.retailerList = response.data.retailers;
          console.log($scope.retailerList)
        }, function(response) {
        });

        $scope.retailerData = function(id) {
        myFactory.getData("retailer/" + id).then(function(response) {
          $scope.retailerShippingDetail = response.data.retailer.shippingOptions

          console.log($scope.retailerShippingDetail)
          }, function(response) {
          });
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
    .controller('UpdateShippingOption', function($scope, $uibModalInstance,$http,param,myFactory) {
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
    .controller('ShowShippingOption', function($scope,myFactory,$stateParams) {
        $scope.close = function () {
          window.history.back();
        };
        myFactory.getData("retailerShippingOption/" + $stateParams.id).then(function(response) {
          $scope.retailerShippingOption = response.data.retailerShippingOptions;
          }, function(response) {
            $scope.Response = response.data.description;
          });
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
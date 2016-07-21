/**
sample ShippingAddresses controller
**/
app.controller("ShippingAddresses", ['$location','$uibModal','$scope','$http', function($location,$uibModal,$scope,$http) {
        $scope.rowship = '';
        $scope.GetAllData = function () {
            $http.get('http://localhost:8000/v1/shippingAddresses')
            .success(function (data, status, headers, config) {
                $scope.valueship = data.shippingAddresses;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
        };
        // show the shipping option detail
        $scope.showRow = function(show) {
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/shippingAddressShow.html',
          controller: 'ShowShippingAddress',
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
          templateUrl: 'templates/shippingAddressCreate.html',
          controller: 'CreateShippingAddress',
          });
          }
        // update row details
        $scope.updateRow = function(update) {
          $scope.updateValue = update
          console.log($scope.updateValue)
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/shippingAddressUpdate.html',
          controller: 'UpdateShippingAddress',
          resolve: {
             param: function(){
                return { "update" : update };
               }
            }
          });
          }
        // delete the row detail
        $scope.deleteRow = function(deleterow) {
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/shippingAddressDelete.html',
          controller: 'DeleteShippingAddress',
          resolve: {
             param: function(){
                return { "deleterow" : deleterow };
               }
            }
          });
          }
        console.log($scope.GetAllData())
        $scope.gridOptions = { data: 'valueship', columnDefs: [ {name: 'address1'},{name: 'address2'}, {name: 'city'},{name: 'state'},{name: 'country'},{name: 'zipCode'},{name:'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.showRow(row.entity)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button>  <button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.updateRow(row.entity)"> <i class="fa fa-edit"> </i> </button> <button class = "btn btn-xs btn-primary" ng-click="grid.appScope.deleteRow(row.entity)"><i class="fa fa-times" aria-hidden="true"></i></button></div>'}],
        };
      }])
      .controller('ShowShippingAddress', function($scope, $uibModalInstance,$http,param) {
        $scope.updateValue = parseInt(param.show)
        $scope.shippingAddress = {
          "address1": param.show.address1,
          "address2": param.show.address2,
          "city": param.show.city,
          "state": param.show.state,
          "country": param.show.country,
          "zipCode": param.show.zipCode
        };
        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };
    })
      .controller('CreateShippingAddress', function($scope, $uibModalInstance,$http,myFactory) {
        $scope.shippingAddress = {
          "id":"",
          "retailerId": "",
          "address1": "",
          "address2": "",
          "city": "",
          "state": "",
          "country":"",
          "zipCode":""
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

        $scope.CreateShippingAddressValue = function() {
        var parameter = {"id":parseInt($scope.shippingAddress.id,10),"retailerId":parseInt($scope.shippingAddress.retailerId,10),"address1":$scope.shippingAddress.address1,"retailerName":$scope.shippingAddress.retailerName,"address2":$scope.shippingAddress.address2,"city":$scope.shippingAddress.city,"state":$scope.shippingAddress.state,"country":$scope.shippingAddress.country,"zipCode":$scope.shippingAddress.zipCode};
          console.log($scope.shippingAddress)
          console.log(parameter);
          $http.post('http://localhost:8000/v1/' + "shippingAddress",parameter)
              .success(function (data, status, headers, config) {
                  console.log($scope.data)
                  $uibModalInstance.dismiss('cancel');
                  window.location.reload()
              })
              .error(function (data, status, header, config) {
                console.log(data)
                  $scope.ResponseDetails = "Data: " + data +
                      "<br />status: " + status +
                      "<br />headers: " + jsonFilter(header) +
                      "<br />config: " + jsonFilter(config);
              });
          };
    })
      .controller('UpdateShippingAddress', function($scope, $uibModalInstance,$http,param) {
          $scope.updateValue = parseInt(param.id)
          $scope.shippingAddress = {
            "id":param.update.id,
            "retailerId": param.update.retailerId,
            "address1": param.update.address1,
            "address2": param.update.address2,
            "city": param.update.city,
            "state": param.update.state,
            "country": param.update.country,
            "zipCode": param.update.zipCode
          };
          $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
          };
          $scope.UpdateShippingAddressValue = function() {
          var parameter = {"id":parseInt($scope.shippingAddress.id,10),"retailerId":parseInt($scope.shippingAddress.retailerId,10),"address1":$scope.shippingAddress.address1,"retailerName":$scope.shippingAddress.retailerName,"address2":$scope.shippingAddress.address2,"city":$scope.shippingAddress.city,"state":$scope.shippingAddress.state,"country":$scope.shippingAddress.country,"zipCode":$scope.shippingAddress.zipCode};
            console.log($scope.retailerShippingOption)
            console.log(parameter);
            $http.put('http://localhost:8000/v1/' + "shippingAddress/"+param.update.id,parameter)
                .success(function (data, status, headers, config) {
                    console.log($scope.data)
                    $uibModalInstance.dismiss('cancel');
                    window.location.reload()
                })
                .error(function (data, status, header, config) {
                  console.log(data)
                    $scope.ResponseDetails = "Data: " + data +
                        "<br />status: " + status +
                        "<br />headers: " + jsonFilter(header) +
                        "<br />config: " + jsonFilter(config);
                });
            };
      })
      .controller('DeleteShippingAddress', function($scope,$templateCache, $uibModalInstance,$location,$http,param) {
          $scope.updateValue = parseInt(param.id)
          $scope.shippingAddress = {
            "id":param.deleterow.id,
            "retailerId": param.deleterow.retailerId,
            "address1": param.deleterow.address1,
            "address2": param.deleterow.address2,
            "city": param.deleterow.city,
            "state": param.deleterow.state,
            "country": param.deleterow.country,
            "zipCode": param.deleterow.zipCode
          };
          $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
          };
          $scope.DeleteShippingAddressValue = function() {
          var parameter = {"id":parseInt($scope.shippingAddress.id,10),"retailerId":parseInt($scope.shippingAddress.retailerId,10),"address1":$scope.shippingAddress.address1,"retailerName":$scope.shippingAddress.retailerName,"address2":$scope.shippingAddress.address2,"city":$scope.shippingAddress.city,"state":$scope.shippingAddress.state,"country":$scope.shippingAddress.country,"zipCode":$scope.shippingAddress.zipCode};
            console.log($scope.retailerShippingOption)
            $http.delete('http://localhost:8000/v1/' + "shippingAddress/"+param.deleterow.id,parameter)
                .success(function (data, status, headers, config) {
                    console.log($scope.data)
                    console.log($location.path()) //need to add the path of calendar page
                    $uibModalInstance.dismiss('cancel');
                    window.location.reload()
                })
                .error(function (data, status, header, config) {
                  console.log(data)
                    $scope.ResponseDetails = "Data: " + data +
                        "<br />status: " + status +
                        "<br />headers: " + jsonFilter(header) +
                        "<br />config: " + jsonFilter(config);
                });
            };
      });
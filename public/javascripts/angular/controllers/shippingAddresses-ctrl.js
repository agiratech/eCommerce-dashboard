/**
sample ShippingAddresses controller
**/

app.controller("ShippingAddresses", ['$location','$scope','$http', function($location,$scope,$http) {
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
        $scope.generateDetails = function(rows) {
            console.log(rows)
            $http.get('http://localhost:8000/v1/shippingAddress/' + rows)
              .success(function (data, status, headers, config) {
                  $scope.rowship = data.shippingAddress;
                  console.log($scope.rowship)
                  $location.path('/shippingAddress/show')
              })
              .error(function (data, status, header, config) {
                  $scope.ResponseDetails = "Data: " + data +
                      "<br />status: " + status +
                      "<br />headers: " + jsonFilter(header) +
                      "<br />config: " + jsonFilter(config);
              });
          console.log($scope.rowship);
        };
        console.log($scope.GetAllData())
        $scope.gridOptions = { data: 'valueship', columnDefs: [ {name: 'address1'},{name: 'address2'}, {name: 'city'},{name: 'state'},{name: 'country'},{name: 'zipCode'},{name:'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.generateDetails(row.entity.id)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button>  <button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.generateEdit(grid, row.entity)"> <i class="fa fa-edit"> </i> </button> <button class = "btn btn-xs btn-primary" ng-click="grid.appScope.generateDelete(row.entity)"><i class="fa fa-times" aria-hidden="true"></i></button></div>'}],
        };
      }]);
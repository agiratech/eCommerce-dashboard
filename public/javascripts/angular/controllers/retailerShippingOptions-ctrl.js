/**
sample RetailerShippingOptions controler
**/

app.controller("RetailerShippingOptions", ['$uibModal','$location','$scope','$http', function ($uibModal,$location,$scope,$http) {
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

        $scope.generateDetails = function(row) {
            console.log(row.retailerId)
            $http.get('http://localhost:8000/v1/retailerShippingOption/' + row)
              .success(function (data, status, headers, config) {
                  $scope.row = data.retailerShippingOptions;
                  console.log($scope.row)
                  $location.path('/retailerShippingOption/show')
              })
              .error(function (data, status, header, config) {
                console.log(data)
                  $scope.ResponseDetails = "Data: " + data +
                      "<br />status: " + status +
                      "<br />headers: " + jsonFilter(header) +
                      "<br />config: " + jsonFilter(config);
              });
          console.log($scope.row);
          // alert("Test");
        };
        // add to form button
        $scope.addRow = function() {
          var modalInstance = $uibModal.open({
          templateUrl: 'templates/retailerShippingOptionCreate.html',
          controller: 'CreateShippingOption',
          });
          }

        // $scope.generateEdit = function(grid,row) {
        //   console.log(row.retailerId)
        //   $scope.row = row;
        //   console.log($scope.row);
        //   $location.path('/retailerShippingOptions/show')
        // // alert("Test");
        // };

        $scope.generateDelete = function(row) {
          $http.delete('http://localhost:8000/v1/retailerShippingOption/' + row.id, {params: {row:row}})
              .success(function (data, status, headers, config) {
                  $scope.row1 = data.retailerShippingOptions;
                  console.log(11111111111)
                  console.log($scope.row1)
              })
              .error(function (data, status, header, config) {
                  $scope.ResponseDetails = "Data: " + data +
                      "<br />status: " + status +
                      "<br />headers: " + jsonFilter(header) +
                      "<br />config: " + jsonFilter(config);
              });
          // alert("Test");
        };
        console.log($scope.GetAllData())
        $scope.gridOptions = { data: 'value', columnDefs: [ {name: 'name'},{name: 'retailerName'}, {name: 'retaildashShippingOptionName'}, {name:'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.generateDetails(row.entity.id)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button>  <button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.generateEdit(row.entity.id)"> <i class="fa fa-edit"></i> </button> <button value="remove" class = "btn btn-xs btn-primary" ng-click="grid.appScope.generateDelete(row.entity)"><i class="fa fa-times" aria-hidden="true"></i></button></div>'}],
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
    // .service('UrlService', function($http){
    //   service.createData = function(url,data){
    //      return
    //   };

    // });


// .controller("RetailerShippingOptionsShow", ['$location','$rootScope','$scope','$http', function ($location,$rootScope,$scope,$http) {
//         $scope.generateDetails = function(row) {
//             console.log(row.retailerId)
//             $http.get('http://localhost:8000/v1/retailerShippingOption/' + row)
//               .success(function (data, status, headers, config) {
//                   $rootScope.row = data.retailerShippingOptions;
//                   console.log($scope.row)
//                   $location.path('/retailerShippingOptions/show')
//               })
//               .error(function (data, status, header, config) {
//                 console.log(11111111111)
//                   $scope.ResponseDetails = "Data: " + data +
//                       "<br />status: " + status +
//                       "<br />headers: " + jsonFilter(header) +
//                       "<br />config: " + jsonFilter(config);
//               });
//           console.log($scope.row);
//           // alert("Test");
//         };
//         console.log($scope.GetAllData())
//       }])
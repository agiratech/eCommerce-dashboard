/**
sample website Login Accounts controler
**/

app.controller("RetailerLoginAccounts", ['$location','$uibModal','$scope','$http', function ($location,$uibModal,$scope,$http) {
        // $rootScope.row = "";
        // $scope.keyword = '';
        $scope.names = ["centauro","walmart","passarela","dafiti","centauro-light","marisa"];
        // $scope.names = [{model:"centauro"},{model:"walmart"},{model:"passarala"},{model: "dafiti"},{model: "centauro-light"},{model:"marisa"}];
        $scope.GetAllData = function () {
            console.log(11111111111)
            $http.get('http://localhost:8000/v1/retailerProductConfigurationUrls/centauro')
            .success(function (data, status, headers, config) {
                $scope.value = data.accounts;

            })
            .error(function (data, status, header, config) {
              console.log(11111111111)
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
        };
        $scope.GetAllData();
        $scope.getData = function (data) {
            console.log(222222222222)
            console.log(data)
            $http.get('http://localhost:8000/v1/retailerProductConfigurationUrls/' + data)
            .success(function (data, status, headers, config) {
                $scope.value = data.accounts;
                console.log($scope.value)
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
          templateUrl: 'templates/retailerLoginAccountShow.html',
          controller: 'ShowLoginAccount',
          resolve: {
             param: function(){
                return { "show" : show };
               }
            }
          });
          }

        $scope.gridOptions = { data: 'value', columnDefs: [ {name: 'userName'},{name: 'password'}, {name:'Events', cellTemplate: '<div><button class = "btn btn-xs btn-primary" ng-click="grid.appScope.showRow(row.entity)" type="button"> <i class="fa fa-eye" aria-hidden="true"> </i> </button> </div>'}],
        };
      }])
      .controller('ShowLoginAccount', function($scope, $uibModalInstance,$http,param) {
        $scope.updateValue = parseInt(param.show)
        $scope.retailerLoginAccount = {
          "userName": param.show.userName,
          "password": param.show.password,
        };
        $scope.close = function () {
          $uibModalInstance.dismiss('cancel');
        };
      });
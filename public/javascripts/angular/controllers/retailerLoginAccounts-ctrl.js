/**
sample website Login Accounts controler
**/

app.controller("RetailerLoginAccounts", ['$location','$uibModal','$scope','$http', function ($location,$uibModal,$scope,$http) {
        // $rootScope.row = "";
        // $scope.keyword = '';
        $scope.names = ["centauro","walmart","passarela","dafiti","centauro-light","marisa"];
        // $scope.names = [{model:"centauro"},{model:"walmart"},{model:"passarala"},{model: "dafiti"},{model: "centauro-light"},{model:"marisa"}];
        $scope.GetAllData = function () {
            $http.get('http://localhost:8000/v1/retailerProductConfigurationUrls/centauro')
            .success(function (data, status, headers, config) {
                $scope.value = data.accounts;

            })
            .error(function (data, status, header, config) {
              $scope.Response = data.description;
            });
        };
        $scope.GetAllData();
        $scope.getData = function (data) {
            console.log(data)
            $http.get('http://localhost:8000/v1/retailerProductConfigurationUrls/' + data)
            .success(function (data, status, headers, config) {
                $scope.value = data.accounts;
                console.log($scope.value)
            })
            .error(function (data, status, header, config) {
              $scope.Response = data.description;
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

        $scope.gridOptions = { data: 'value', columnDefs: [ {name: 'userName'},{name: 'password'}, {name:'Events', cellTemplate: '<div class="ui-grid-cell-contents"> <i class="fa fa-eye view-icon" ng-click="grid.appScope.showRow(row.entity)" aria-hidden="true"> </i></div>'}],
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
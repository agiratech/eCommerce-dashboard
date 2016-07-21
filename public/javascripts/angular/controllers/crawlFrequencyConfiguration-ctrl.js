app.controller('CrawlFrequencyConfigurationList', function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("crawlFrequencyConfigurations").then(function(response) {
    $scope.crawlFrequencyConfigList = response.data.crawlFrequencyConfigurationList;
  }, function(response) {
  });
  $scope.create = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/crawlFrequencyConfigurationCreate.html',
    controller: 'CreateCrawlFrequencyConfig',
    });
  };
  $scope.update = function (data) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/crawlFrequencyConfigurationUpdate.html',
    controller: 'UpdateCrawlFrequencyConfig',
    resolve: {
               param: function () {
                   return {'crawlFrequencyConfigInfo' : data };
               }
              }
    });
  };
  $scope.gridOptionForCrawlFreqConfig = {data: 'crawlFrequencyConfigList', columnDefs: [
      { name: 'name'},{ name: 'month'},{ name: 'day'},{ name: 'dayOfMonth'},{ name: 'hour'},{ name: 'minutes'},{ name: 'disabled'},{ name: 'priority'},{ name: 'jobKey'},{name: 'Events', cellTemplate: '<div><i class="fa fa-edit edit-icon" ng-click="grid.appScope.update(row.entity)"></i></div>'}],
  };
});

app.controller('CreateCrawlFrequencyConfig', function($scope, $uibModalInstance,myFactory) {

});

app.controller('UpdateCrawlFrequencyConfig', function($scope, $uibModalInstance, myFactory,param) {

});
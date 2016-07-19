app.controller('CrawlFrequencyConfigurationList', function($uibModal,$scope,myFactory,$location) {
  myFactory.getData("crawlFrequencyConfigurations").then(function(response) {
    $scope.crawlFrequencyConfigList = response.data.crawlFrequencyConfigurationList;
  }, function(response) {
    alert(response.status);
    alert(response.data);
  });
  $scope.create = function () {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/crawlFrequencyConfigurationCreate.html',
    controller: 'CreateCrawlFrequencyConfig',
    });
  };
  $scope.update = function (id) {
    var modalInstance = $uibModal.open({
    templateUrl: 'templates/crawlFrequencyConfigurationUpdate.html',
    controller: 'UpdateCrawlFrequencyConfig',
    resolve: {
               param: function () {
                   return {'crawlFrequencyConfigId' : id };
               }
              }
    });
  };
  $scope.gridOptionForCrawlFreqConfig = {data: 'crawlFrequencyConfigList', columnDefs: [
      { name: 'name'},{ name: 'month'},{ name: 'day'},{ name: 'dayOfMonth'},{ name: 'hour'},{ name: 'minutes'},{ name: 'disabled'},{ name: 'priority'},{ name: 'jobKey'},{name: 'Events', cellTemplate: '<div> <button type="button" class="btn btn-xs btn-primary" ng-click="grid.appScope.update(row.entity.id)"> <i class="fa fa-edit"></i> </button> </div>'}],
  };
});

app.controller('CreateCrawlFrequencyConfig', function($scope, $uibModalInstance,myFactory) {

});

app.controller('UpdateCrawlFrequencyConfig', function($scope, $uibModalInstance, myFactory,param) {

});
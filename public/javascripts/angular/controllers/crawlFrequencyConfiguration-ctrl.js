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
      { name: 'name'},{ name: 'month'},{ name: 'day'},{ name: 'dayOfMonth'},{ name: 'hour'},{ name: 'minutes'},{ name: 'disabled'},{ name: 'priority'},{ name: 'jobKey'},{name: 'Events', cellTemplate: '<div class="ui-grid-cell-contents" ><i class="fa fa-edit view-icon" ng-click="grid.appScope.update(row.entity)"></i></div>'}],
  };
});

app.controller('CreateCrawlFrequencyConfig', function($scope, $uibModalInstance,myFactory) {
  $scope.tags = "";
  $scope.crawlFreq = {
    "spiderId": "",
    "name": "",
    "month": "",
    "day": "",
    "dayOfMonth": "",
    "hour": "",
    "minutes": "",
    "disabled": "",
    "priority": "",
    "addtags" :$scope.tags.split(",")

  };
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.createCrawlFreq = function() {
    var parameter = {"spiderId":parseInt($scope.crawlFreq.spiderId,10),"name":$scope.crawlFreq.name,"month":$scope.crawlFreq.month,"day":$scope.crawlFreq.day,"dayOfMonth":$scope.crawlFreq.dayOfMonth,"hour":$scope.crawlFreq.hour,"minutes":$scope.crawlFreq.minutes,"disabled":$scope.crawlFreq.disabled,"priority":parseInt($scope.crawlFreq.priority),"addtags":$scope.crawlFreq.addtags};
    console.log($scope.retailer)
    console.log(parameter);
    myFactory.createData("crawlFrequencyConfiguration",parameter).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});

app.controller('UpdateCrawlFrequencyConfig', function($scope, $uibModalInstance, myFactory,param) {
  $scope.tags = "";
  $scope.crawlFreq = {
    "spiderId": param.crawlFrequencyConfigInfo.spiderId,
    "name": param.crawlFrequencyConfigInfo.name,
    "month": param.crawlFrequencyConfigInfo.month,
    "day": param.crawlFrequencyConfigInfo.day,
    "dayOfMonth": param.crawlFrequencyConfigInfo.dayOfMonth,
    "hour": param.crawlFrequencyConfigInfo.hour,
    "minutes": param.crawlFrequencyConfigInfo.minutes,
    "disabled": param.crawlFrequencyConfigInfo.disabled,
    "priority": param.crawlFrequencyConfigInfo.priority,
    "addtags" :$scope.tags.split(",")

  };
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.updateCrawlFreq = function() {
    var parameter = {"spiderId":parseInt($scope.crawlFreq.spiderId,10),"name":$scope.crawlFreq.name,"month":$scope.crawlFreq.month,"day":$scope.crawlFreq.day,"dayOfMonth":$scope.crawlFreq.dayOfMonth,"hour":$scope.crawlFreq.hour,"minutes":$scope.crawlFreq.minutes,"disabled":$scope.crawlFreq.disabled,"priority":parseInt($scope.crawlFreq.priority),"addtags":$scope.crawlFreq.addtags};
    console.log($scope.retailer)
    console.log(parameter);
    myFactory.updateData("crawlFrequencyConfiguration/"+param.crawlFrequencyConfigInfo.id,parameter).then(function(response) {
    console.log(response.data);
    $scope.close();
    window.location.reload();
    }, function(response) {
      console.log(response.data);
      $scope.Response = response.data.description;
    });
  };
});
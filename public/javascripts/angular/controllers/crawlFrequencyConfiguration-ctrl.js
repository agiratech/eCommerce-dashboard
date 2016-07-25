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
  console.log($scope.tags)
  console.log(8888888888888888)
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
    "addtags" : ""
    // "addtags" :$scope.tags.split(",")

  };
  myFactory.getData("spiders").then(function(response) {
          $scope.crawlFreqData = response.data.spiders;
        }, function(response) {
          alert(response.status);
          alert(response.data);
        });

  $scope.months = { Every_months:"*",January:"1",February:"2",March:"3",April:"4",May:"5",June:"6",July:"7",August:"8",September:"9",October:"10",November:"11",December:"12"}
  $scope.priorityType = {Highest:4,High:3,Normal:2,Low:1,Lowest:0}
  $scope.days = {Every_days:"*",Monday:"1",Tuesday:"2",Wednesday:"3",Thursday:"4",Friday:"5",Saturday:"6",Sunday:"7"}
  $scope.daysofMonth = {Every_days:"*",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",14:"14",15:"15",16:"16",17:"17",18:"18",19:"19",20:"20",21:"21",22:"22",23:"23",24:"24",25:"25",26:"26",27:"27",28:"28",29:"29",30:"30",31:"31"}
  $scope.munites = {Every_minutes:"*",00:"0",05:"5",10:"10",15:"15",20:"20",25:"25",30:"30",35:"35",40:"40",45:"45",50:"50",55:"55"}
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $scope.spiderData = function(id) {
   myFactory.getData("spider/"+ id).then(function(response) {
          $scope.testdata = response.data.spider;

          console.log($scope.testdata)
          console.log(565685)
        }, function(response) {
          alert(response.status);
          alert(response.data);
        });
    };
  $scope.createCrawlFreq = function() {
    var parameter = {"spiderId":parseInt($scope.crawlFreq.spiderId,10),"name":$scope.crawlFreq.name,"month":$scope.crawlFreq.month,"day":$scope.crawlFreq.day,"dayOfMonth":$scope.crawlFreq.dayOfMonth,"hour":$scope.crawlFreq.hour,"minutes":$scope.crawlFreq.minutes,"disabled":$scope.crawlFreq.disabled,"priority":parseInt($scope.crawlFreq.priority),"addtags":$scope.crawlFreq.addtags.split(",")};
    console.log($scope.retailer)
    console.log($scope.crawlFreq.addtags)
    console.log(parameter.addtags);
    console.log(66666666)
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
    myFactory.getData("spiders").then(function(response) {
          $scope.spiderIdandName = response.data.spiders;
        }, function(response) {
          alert(response.status);
          alert(response.data);
        });
  // $scope.tags = "";
  $scope.crawlFreqency = {
    "spiderId": param.crawlFrequencyConfigInfo.spiderId,
    "name": param.crawlFrequencyConfigInfo.name,
    "month": param.crawlFrequencyConfigInfo.month,
    "day": param.crawlFrequencyConfigInfo.day,
    "dayOfMonth": param.crawlFrequencyConfigInfo.dayOfMonth,
    "hour": param.crawlFrequencyConfigInfo.hour,
    "minutes": param.crawlFrequencyConfigInfo.minutes,
    "disabled": param.crawlFrequencyConfigInfo.disabled,
    "priority": param.crawlFrequencyConfigInfo.priority,
    "addtags" : param.crawlFrequencyConfigInfo.addtags

  };
  $scope.months = {Every_months:"*",January:"1",February:"2",March:"3",April:"4",May:"5",June:"6",July:"7",August:"8",September:"9",October:"10",November:"11",December:"12"}
  $scope.days = {Every_days:"*",Monday:"1",Tuesday:"2",Wednesday:"3",Thursday:"4",Friday:"5",Saturday:"6",Sunday:"7"}
  $scope.priorityType = {Highest:4,High:3,Normal:2,Low:1,Lowest:0}
  $scope.daysofMonth = {Every_days:"*",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",14:"14",15:"15",16:"16",17:"17",18:"18",19:"19",20:"20",21:"21",22:"22",23:"23",24:"24",25:"25",26:"26",27:"27",28:"28",29:"29",30:"30",31:"31"}
  $scope.munites = {Every_minutes:"*",00:"0",05:"5",10:"10",15:"15",20:"20",25:"25",30:"30",35:"35",40:"40",45:"45",50:"50",55:"55"}
  console.log($scope.crawlFreqency.addtags)
  console.log(555555555555)
  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.updateCrawlFreq = function() {
    var parameter = {"spiderId":parseInt($scope.crawlFreqency.spiderId,10),"name":$scope.crawlFreqency.name,"month":$scope.crawlFreqency.month,"day":$scope.crawlFreqency.day,"dayOfMonth":$scope.crawlFreqency.dayOfMonth,"hour":$scope.crawlFreqency.hour,"minutes":$scope.crawlFreqency.minutes,"disabled":$scope.crawlFreqency.disabled,"priority":parseInt($scope.crawlFreqency.priority),"addtags":$scope.crawlFreqency.addtags.split(",")};
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
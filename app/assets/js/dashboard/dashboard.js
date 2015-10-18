var app = angular.module('noteSth');
app.controller('dashboard', ['$scope', 'dataS', 'localStorageService', '$location', '$rootScope', 'config',

  function($scope, dataS, localStorageService, $location, $rootScope, config) {
    dataS.getData('/websites', true)
      .success(function(data) {
        $scope.websites = data;
        for (var i = 0, len = $scope.websites.length; i < len; i++) {
            $scope.responses[$scope.websites[i].website] = {data: [], series: ['']};
            $scope.charts[$scope.websites[i].website] = {data: [], series: ['']};
          getXRecords(20, $scope.websites[i]);
          new Status($scope.websites[i]);
          fillChart($scope.websites[i]);
        }
      })
    $scope.statuses = [];
    $scope.responses = {};
    $scope.charts = {};
    var indexes = 0;

    function fillChart(wb) {
      var data = [];
      if(wb.up != 0 && wb.up != null) {
         data.push({x: 'up', y: [wb.up]});
      }
      if(wb.down != 0 && wb.down != null) {
        data.push({x: 'down', y: [wb.down]});
      }
      if (data !== []) {
        $scope.charts[wb.website]['data'] = data;
      } else {
        $scope.charts[wb.website]['data'] = null;
      }
      indexes++;
    }

    function Status(website) {

      dataS.getData('/status/' + website._id, true)
        .success(function(data) {
          if (data && data.hasOwnProperty('website') && data.response !== null) {
            $scope.statuses.push(data);
            $scope.responses[data.website]['data'].push({
              x: indexes,
              y: [data.response]
            });
            indexes++;

            if ($scope.responses[data.website]['data'].length >= 25) {
              $scope.responses[data.website]['data'].splice(0, 1);

            }
          }
        })

      setTimeout(function() {
        Status(website)
      }, website.timeout * 60000);
    }
    function getXRecords(nmb, website) {
        dataS.getData('/xstatus/' + website._id +'/'+ nmb , true)
        .success(function(data){
          for (var i = 0, len = data.length; i < len; i++) {
            if (data[i] && data[i].hasOwnProperty('website') && data[i].response != null) {
              $scope.responses[data[i]['website']]['data'].push({
                x: indexes,
                y: [data[i].response]
              });
              indexes++;
            }
          }

        })
    }

    $scope.getStat = function(ele) {
      for (var i = 0, len = $scope.statuses.length; i < len; i++) {
        if ($scope.statuses[i] !== null && $scope.statuses[i].website == ele) {
          return {
            status: $scope.statuses[i].status,
            response: $scope.statuses[i].response
          };
        }
      }
      return null;
    }
    $scope.server = config.IMG + '/';

  }
]);

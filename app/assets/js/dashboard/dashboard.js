var app = angular.module('noteSth');
app.controller('dashboard', ['$scope', 'dataS', 'localStorageService', '$location', '$rootScope', 'config',

  function($scope, dataS, localStorageService, $location, $rootScope, config) {
    dataS.getData('/websites', true)
      .success(function(data) {
        $scope.websites = data;
        status();
      })
    $scope.statuses = [];
    $scope.responses = {};
    var indexes = 0;
    function status() {
      $scope.statuses = [];
      for (var i = 0, len = $scope.websites.length; i < len; i++) {
        var that = i;
        dataS.getData('/status/' + $scope.websites[i]._id, true)
          .success(function(data) {

            if (data && data.hasOwnProperty('website') && !$scope.responses[data.website]) {
              $scope.responses[data.website] = {};
              $scope.responses[data.website]['data'] = [];
              $scope.responses[data.website]['series'] = [''];

            }

            if (data && data.hasOwnProperty('website')) {
              $scope.statuses.push(data);
              $scope.responses[data.website]['data'].push({x: indexes, y: [data.response]});
              indexes++;

              if($scope.responses[data.website]['data'].length >= 25) {
                $scope.responses[data.website]['data'].splice(0,5);

              }
            }
          })
      }
      setTimeout(function() {
        status()
      }, 10000);
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

var app = angular.module('noteSth');
app.controller('single', ['$scope', 'dataS', '$cookieStore', '$location', '$rootScope', 'config',

  function($scope, dataS, $cookieStore, $location, $rootScope, config) {
    dataS.getData(window.location.pathname, true)
      .success(function(data) {
        $scope.web = data;

        $scope.responses[data.website] = {data: [], series: ['']};
        getXRecords(40, data);
        new Status(data);

      })

      $scope.statuses = [];
      $scope.responses = {};
      var indexes = 0;

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
      $scope.chartconf = {
        legend: {
          display: false,
          position: 'left',
          // you can have html in series name
          htmlEnabled: false,
           waitForHeightAndWidth: false
        }
      }
      
      $scope.sitemap = ['http://test.pl', 'http://test.pl/demo', 'http://test.pl/demo/asdlas/1234', 'http://test.pl/demo/asdlas/12342', 'http://test.pl/demo/asdlas/12346', 'http://test.pl/demo/asdlas/1234e', 'http://test.pl/demo/asdlas/1234wq', 'http://test.pl/demo/asdlas/1234azxczx', 'http://test.pl/demo/asdlas/123asd4', 'http://test.pl/demo/asdlas/123412', 'http://test.pl/demo/asdlas/1234ccc', 'http://test.pl/demo/asdlas/1234sa']


  }
]);

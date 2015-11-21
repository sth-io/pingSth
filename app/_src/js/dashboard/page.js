var app = angular.module('noteSth');
app.controller('page', ['$scope', 'dataS', '$cookieStore', '$location',

    function($scope, dataS, $cookieStore, $location) {
        var id = '';
        if ($location.$$path.indexOf('/page') > -1) {
            id = $location.$$path.substr(6, $location.$$path.length);
        }

        if (id.length > 0) {
            dataS.getData('/websites/' + id, true)
                .success(function(data) {
                    $scope.website = data;
                    acessibility(data);
                    getXRecords(40, data);
                });
        }
        $scope.acessibility;
        acessibility = function(website) {
            var val = website.up / (website.up + website.down) * 100;
            if (val > 90) {
                $scope.acessibility = 'ok';
            }
            if (val >= 60 && val <= 90) {
                $scope.acessibility = 'mid';
            }
            if (val < 60) {
                $scope.acessibility = 'bad';
            }
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

        $scope.responses = {data: [], series: [""]};
        var indexes = 0;
        function getXRecords(nmb, website) {
            dataS.getData('/xstatus/' + website._id +'/'+ nmb , true)
            .success(function(data){
              for (var i = 0, len = data.length; i < len; i++) {
                if (data[i] && data[i].hasOwnProperty('website') && data[i].response != null) {
                  $scope.responses.data.push({
                    x: indexes,
                    y: [data[i].response]
                  });
                  indexes++;
                }
              }

            })
        }
    }
]);

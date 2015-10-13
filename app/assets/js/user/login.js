var app = angular.module('noteSth');
app.controller('login', ['$scope', 'dataS', 'localStorageService', '$location',

    function($scope, dataS, localStorageService, $location) {

        $scope.logindo = function() {
                dataS.postData('/auth', $scope.login)
                .success(function(data) {

                    localStorageService.set('token', data.token);
                    if(data.token) {
                         $location.path('/dash');
                    }
                })

        }
    }
]);

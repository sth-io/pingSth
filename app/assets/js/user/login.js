var app = angular.module('noteSth');
app.controller('login', ['$scope', 'dataS', 'localStorageService', '$location',

    function($scope, dataS, localStorageService, $location) {

        $scope.logindo = function() {
                dataS.postData('/auth', $scope.login)
                .success(function(data) {
                    if(data.token) {
                        localStorageService.set('token', data.token);
                        localStorageService.set('id', data.id);
                        $location.path('/dash');
                    }
                })

        }
    }
]);

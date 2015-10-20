var app = angular.module('noteSth');
app.controller('login', ['$scope', 'dataS', '$cookieStore', '$location',

    function($scope, dataS, $cookieStore, $location) {

        $scope.logindo = function() {
                dataS.postData('/auth', $scope.login)
                .success(function(data) {
                    if(data.token) {
                        $cookieStore.put('token', data.token);
                        $cookieStore.put('id', data.id);
                        $location.path('/dash');
                    }
                })

        }
    }
]);

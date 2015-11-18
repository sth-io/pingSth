var app = angular.module('noteSth');
app.controller('base', ['$scope', 'dataS', '$cookieStore', '$location', '$rootScope',

    function($scope, dataS, $cookieStore, $location, $rootScope) {
        function CheckLog() {
            var token = $cookieStore.get('token');
            if (token && token.length > 2) {
                dataS.getData('/user', token)
                    .success(function(data) {
                        $scope.usr = data;
                    })
            }
        }
        CheckLog();
        $rootScope.$on("userlogin", function(){
            CheckLog();
        })
        $scope.callmodal = function(type) {
            $scope.modal = type;
        }
        $scope.logout = function() {
            $cookieStore.put('token', null);
            $cookieStore.put('id', null);
            $scope.usr = false;
            $location.path('/');
        }

    }
]);

var app = angular.module('noteSth');
app.controller('register', ['$scope', 'dataS', '$location',

    function($scope, dataS, $location) {
        $scope.msg = false;
        $scope.registerdo = function() {
            if (validateEmail($scope.login.email)) {
                dataS.postData('/user', $scope.login)
                    .success(function(data) {
                        $location.path('/login');
                    })
                    .error(function(data) {
                        $scope.msg = data.error;
                    })
            } else {
                $scope.msg ='Email is not valid';
            }

        }

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
    }
]);

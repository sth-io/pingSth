var app = angular.module('noteSth');
app.controller('register', ['$scope', 'dataS',

    function($scope, dataS) {
       
        $scope.registerdo = function() {
                dataS.postData('http://localhost:4000/api/user', $scope.login)
                .success(function(data) {
                    console.log(data);
                })
                
        }
    }
]);  
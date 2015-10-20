var app = angular.module('noteSth');
app.controller('base', ['$scope', 'dataS', '$cookieStore', '$location',

    function($scope, dataS, $cookieStore, $location) {
       var token = $cookieStore.get('token');
        if(token && token.length > 2) {
           dataS.getData('/user', token)
           .success(function(data){
               $scope.usr = data;
           })
       }
       $scope.callmodal = function(type) {
           $scope.modal = type;
       }
    }
]);

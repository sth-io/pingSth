var app = angular.module('noteSth');
app.controller('base', ['$scope', 'dataS', 'localStorageService', '$location',

    function($scope, dataS, localStorageService, $location) {
       var token = localStorageService.get('token');
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

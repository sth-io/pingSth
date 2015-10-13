var app = angular.module('noteSth');
app.controller('home', ['$scope', 'dataS', 'localStorageService', '$location',

    function($scope, dataS, localStorageService, $location) {
       if(localStorageService.get('token').length > 2) {
           $location.path('/dash');
       }
       
    }
]);   
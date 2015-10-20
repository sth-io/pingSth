var app = angular.module('noteSth');
app.controller('home', ['$scope', 'dataS', '$cookieStore', '$location',

    function($scope, dataS, $cookieStore, $location) {
       if($cookieStore.get('token').length > 2) {
           $location.path('/dash');
       }

    }
]);

var app = angular.module('noteSth');
app.controller('websites', ['$scope', 'dataS', 'localStorageService', '$location', '$rootScope',

    function($scope, dataS, localStorageService, $location, $rootScope) {
       $scope.website = {
           body: {},
           send: function() {
               dataS.postData('/websites', $scope.website.body, true)
               .success(function(data) {
                   $rootScope.$emit('noteAdd', data);
               })
           }
       }

    }
]);

var app = angular.module('noteSth');
app.controller('dashboard', ['$scope', 'dataS', 'localStorageService', '$location', '$rootScope', 'config',

    function($scope, dataS, localStorageService, $location, $rootScope, config) {
       dataS.getData('/websites', true)
       .success(function(data) {
           $scope.websites = data;
           console.log(data)
           status();
       })
       $scope.statuses = [];

       function status() {
         $scope.statuses = [];
         for (var i = 0, len = $scope.websites.length; i < len; i++) {
           dataS.getData('/status/'+$scope.websites[i]._id, true)
           .success(function(data) {
             $scope.statuses.push(data.website);
           })
         }
         setTimeout(function() {
               status()
           }, 5000);
       }

       $scope.getStat = function(ele) {
         for (var i = 0, len = $scope.statuses.length; i < len; i++) {
           if($scope.statuses[i] !== null && $scope.statuses[i].website == ele) {
            return $scope.statuses[i].status;
           }
         }
         return null;
       }
       $scope.server = config.IMG+'/';

      //  $rootScope.$on('noteAdd', function (event, data) {
      //     $scope.notes.push(data); // 'Data to send'
      //   });
    }
]);

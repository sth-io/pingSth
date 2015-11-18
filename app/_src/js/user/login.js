var app = angular.module('noteSth');
app.controller('login', ['$scope', 'dataS', '$cookieStore', '$location', '$rootScope',

    function($scope, dataS, $cookieStore, $location, $rootScope) {
      var token = $cookieStore.get('token');
       if(token && token.length > 2) {
          dataS.getData('/user', token)
          .success(function(data){
            console.log(data);
              if(data) {
                $location.path('/dash');
              }
          })
      }
        $scope.logindo = function() {
                dataS.postData('/auth', $scope.login)
                .success(function(data) {
                    if(data.token) {
                        $cookieStore.put('token', data.token);
                        $cookieStore.put('id', data.id);
                        $rootScope.$emit( "userlogin", true);
                        $location.path('/dash');
                    }
                })
                .error(function(data) {
                    $scope.msg = data.error;
                })

        }
    }
]);

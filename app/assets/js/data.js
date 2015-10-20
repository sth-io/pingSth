angular.module('noteSth').service('dataS',  function ($http, config, $cookieStore) {
    var headers = function(token) {
        if(token) {
            return {
                'Content-type': 'application/json',
                'x-access-token': $cookieStore.get('token')
            }
        } else {
            return {
                'Content-type': 'application/json'
            }
        }
    }
    return {
        getData: function (url, token) {
            return $http({
                method: 'GET',
                url: config.API + url,
                headers: headers(token)
            });
        },
        postData: function (url, data, token) {
            return $http({
                method: 'POST',
                url: config.API + url,
                data: data,
                headers: headers(token)
            });
        },
        editData: function (url, data, token) {
            return $http({
                method: 'PUT',
                url: config.API + url,
                data: data,
                headers: headers(token)
            });
        },
        delData: function (url, hash, token) {
            return $http({
                method: 'DELETE',
                data: hash,
                url: config.API + url,
                headers: headers(token)
            });
        }
    };
});

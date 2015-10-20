angular.module('noteSth', [
    'ngRoute',
    'angularCharts',
    'ngCookies'
])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'login'
        })
        .when('/register', {
            templateUrl: '/views/register.html',
            controller: 'register'
        })
        .when('/dash', {
            templateUrl: '/views/dash.html',
            controller: 'dashboard'
        })
        .when('/', {
            templateUrl: '/views/index.html',
            controller: 'home'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})

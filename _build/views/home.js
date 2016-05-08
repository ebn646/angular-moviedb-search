'use strict';

angular.module('movies.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'MovieSearchCtrl'
        });
    }])

    .controller('MovieSearchCtrl', [function() {

    }]);

'use strict';

angular.module('movies.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'MovieSearchCtrl'
        });
    }])
    .controller('MovieSearchCtrl', function ($scope) {
    var self = this;
    $scope.query = '';

    $scope.search = function () {
        BoxOfficeService.get({method: 'search', what: 'movie', query: $scope.query}, function (result) {
            $scope.movies = result.results;
        });
    }
});

angular.module('movieSearchApp')
    .controller('MovieListCtrl', function ($scope, $stateParams, $routeParams, $sanitize, $timeout,BoxOfficeService, DetailService, RatingService) {
        $scope.query = '';

        $scope.search = function () {
            BoxOfficeService.get({method: 'search', what: 'movie', query: $scope.query}, function (result) {
                $scope.movies = result.results;
            });
        }
    })
    .controller('CarouselCtrl', function ($scope, $stateParams, $timeout, BoxOfficeService) {
        $scope.topRated;
        $scope.dataLoaded;

        BoxOfficeService.get({method: 'movie', what: 'top_rated'}, function (result) {
            $scope.toprated = result.results;

            $timeout(function () {
                $scope.dataLoaded = true;
            });
        });
    })
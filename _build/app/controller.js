angular.module('movies')
    .controller('MovieListCtrl', function ($scope, $http, $sanitize, $timeout, LocalStorage, BoxOfficeService, DetailService, RatingService) {
        var self = this;
        $scope.query = '';

        $scope.search = function () {
            BoxOfficeService.get({method: 'search', what: 'movie', query: $scope.query}, function (result) {
                $scope.movies = result.results;
            });
        }
    })
    .controller('DetailsCtrl', function ($scope, $stateParams, $routeParams, $timeout, DetailService, RatingService) {
        $scope.fresh;
        $scope.audienceHasScore;

        var id = $stateParams.id;
        DetailService.get({id: id, append_to_response: 'casts,trailers,images,similar_movies'}, function (result) {
            $scope.details = result;
            $scope.title = result.original_title;
            $scope.release_date = result.release_date;
            $scope.imdb = result.imdb_id;
            $scope.getVideo();
        });

        $scope.getVideo = function (e) {
            var self = this;
            $scope.hasVideo;

            $timeout(function () {
                if ($scope.details.trailers.youtube.length >= 1) {
                    $scope.$apply(function () {
                        $scope.hasVideo = true;
                        $scope.theBestVideo = $scope.details.trailers.youtube[0].source;
                    });

                } else {
                    $scope.$apply(function () {
                        $scope.hasVideo = false;
                    });
                }
            }, 2000);

            $scope.getRating()
        }

        $scope.getRating = function () {
            RatingService.callRottenTomatoes($scope.imdb)
                .then(function (data) {
                    if(data.ratings){
                        $scope.audienceHasScore = true;
                        $scope.audience_score = data.ratings.audience_score;
                        $scope.rating = data.mpaa_rating;
                    }
                });
        }

    })
    .factory('BoxOfficeService', function ($log, $resource) {
        var url = 'http://api.themoviedb.org/3/:method/:what';
        var apikey = 'a47daf25c6cd4e3f68c4ebee27270542';
        return $resource(url,
            {api_key: apikey, callback: 'JSON_CALLBACK'},
            {get: {method: 'JSONP', requestType: 'json'}}
        );
    })
    .factory('RatingService', function ($http, $q) {
        var service = {};
        var baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?apikey=fgknsgt8gv4hwfumspgerrmk&type=imdb&id=';
        var _id = '';
        var _finalUrl = '';
        var makeUrl = function (id) {
            _url = baseUrl + id + '&callback=JSON_CALLBACK';
            return _url;
        }

        service.setMovie = function (id) {
            _id = id.substr(2);
        }

        service.getMovie = function () {
            return _id;
        }

        service.callRottenTomatoes = function (id) {
            _id = id.substr(2);
            makeUrl(_id);
            var deferred = $q.defer();
            $http({
                method: 'JSONP',
                url: _url
            }).success(function (data) {
                deferred.resolve(data)
            }).error(function () {
                deferred.reject('There was an error')
            })
            return deferred.promise;
        }

        return service;
    })
    .factory('DetailService', function ($log, $resource) {
        var url = 'http://api.themoviedb.org/3/movie/:id';
        var apikey = 'a47daf25c6cd4e3f68c4ebee27270542';

        return $resource(url,
            {
                api_key: apikey,
                callback: 'JSON_CALLBACK'
            },
            {
                get: {
                    method: 'JSONP',
                    requestType: 'json'
                }
            }
        );
    })
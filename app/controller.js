angular.module('movies')
    .controller('MovieListCtrl', function ($scope, $http, $sanitize, $timeout, LocalStorage, BoxOfficeService, DetailService, RatingService) {
        var self = this;
        $scope.query = '';

        $scope.search = function () {
            BoxOfficeService.get({method: 'search', what: 'movie', query: $scope.query}, function (result) {
                $scope.movies = result.results;
            });

            RatingService.get({query: $scope.query}, function (result) {
                $scope.ratings = result;
            });
        }
    })
    .controller('DetailsCtrl', function ($scope, $routeParams, $timeout, DetailService,RatingService,rottenTomatoes) {
        $scope.fresh;
        var id = $routeParams.id;
        DetailService.get({id: id, append_to_response: 'casts,trailers,images,similar_movies'}, function (result) {
            $scope.details = result;
            $scope.title = result.original_title;
            $scope.release_date = result.release_date;
            $scope.getVideo();
        });

        //RatingService.get({query: $scope.title}, function (result) {
        //    $scope.audience_score = result.movies[0].ratings.audience_score;
        //    $scope.rating = result.movies[0].mpaa_rating;
        //    $scope.release_date = result.movies[0].release_dates.theater;
        //});

        $scope.getVideo = function (e) {
            var self = this;
            $scope.hasVideo = true;

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

            $scope.getDetail()
        }

        $scope.getDetail = function(){
            var apikey = "fgknsgt8gv4hwfumspgerrmk";
            var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
            $q = encodeURIComponent($scope.title);
            var moviesSearchUrl = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fgknsgt8gv4hwfumspgerrmk&q='+$q+'&page_limit=10';

            $.ajax({
                url: moviesSearchUrl,
                dataType: "jsonp",
                success: detCallback
            });
            function detCallback(result) {
                var d = new Date($scope.release_date);
                var y = d.getFullYear();
                var match;
                var i = 0;

                while(i < result.movies.length){
                    var yr = result.movies[i].year;
                    if(yr == y) {
                        match = result.movies[i];
                        break;
                    }
                    i++;
                }

                $scope.audience_score = match.ratings.audience_score;
                $scope.rating = match.mpaa_rating;
                $scope.fresh = $scope.audience_score >= 50  ? true : false;
            }
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
    .factory('RatingService', function ($log, $resource) {
        var query = encodeURIComponent('batman');
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=fgknsgt8gv4hwfumspgerrmk&q=' + encodeURIComponent(query) + '&page_limit=1';
        var apikey = 'fgknsgt8gv4hwfumspgerrmk';

        return $resource(
            url, {
                apikey: apikey,
                callback: 'JSON_CALLBACK'
            },
            {
                get: {
                    q: query,
                    method: 'JSONP'
                }
            }
        );
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
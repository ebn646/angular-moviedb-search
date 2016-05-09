angular.module('movieSearchApp')
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
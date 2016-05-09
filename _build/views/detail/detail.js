angular.module('movieSearchApp')
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


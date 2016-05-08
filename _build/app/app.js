myMovieApp = angular.module('movieSearchApp', [
        'ngRoute',
        'ngSanitize',
        'ngResource',
        'ui.router',
        'youtube-embed',
        'slick'
])
    .value('lubTmdbApiKey', '1cec0394fa447a1f03d7a744faf9cbc9')
    .config(config);
// this prevents minification issues
config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$stateProvider'];

function config($urlRouterProvider, $locationProvider, $httpProvider, $compileProvider, $stateProvider) {
    $locationProvider.html5Mode(false);
    //$httpProvider.interceptors.push('authInterceptor');
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            views: {
                "": {
                    templateUrl: 'views/home/home.html',
                    controller: 'MovieListCtrl'
                },
                "carousel@home": {
                    templateUrl: 'views/home/carousel.html',
                    controller: 'CarouselCtrl'
                    }
                }
            })
        .state('detail', {
            url: "/detail/{id}",
            templateUrl: "views/detail/detail.html",
            controller: 'DetailsCtrl',
        });

}
angular.module('movieSearchApp')
    .factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

        // intercept every request
        request: function (config) {
            config.headers = config.headers || {};
            return config;
        },

        // Catch 404 errors
        responseError: function (response) {
            if (response.status === 404) {
                $location.path('/');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
}

angular.module('movieSearchApp')
    .run(run);

run.$inject = ['$rootScope', '$location'];

function run($rootScope, $location) {

    // put here everything that you need to run on page load

}

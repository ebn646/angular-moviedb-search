angular.module('movies', [
      'ngRoute',
      'ngSanitize',
      'ngResource',
      'ui.router',
      'youtube-embed'
    ])
      .value('lubTmdbApiKey', '1cec0394fa447a1f03d7a744faf9cbc9')
      .config(config);
 // this prevents minification issues
  config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$compileProvider','$stateProvider'];

  function config($urlRouterProvider, $locationProvider, $httpProvider, $compileProvider,$stateProvider) {

    $locationProvider.html5Mode(false);
    // routes
    //$routeProvider
    //  .when('/', {
    //    templateUrl: 'views/home.html',
    //    controller: 'MovieListCtrl',
    //    controllerAs: 'main'
    //  })
    //  .when('/detail/:id', {
    //    templateUrl: 'views/detail.html',
    //    controller: 'DetailsCtrl',
    //    controllerAs: 'main'
    //  })
    //  .otherwise({
    //    redirectTo: '/'
    //  });
    //
    //$httpProvider.interceptors.push('authInterceptor');
    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
          url: '/home',
          templateUrl: 'views/home/home.html',
          controller:'MovieListCtrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('detail', {
          url: "/detail/{id}",
          templateUrl: "views/detail.html",
          controller:'DetailsCtrl'
        });

  }

  angular.module('movies')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

  angular.module('movies')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }

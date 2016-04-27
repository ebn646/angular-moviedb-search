angular.module('movies', [
      'ngRoute',
      'ngSanitize',
      'ngResource',
      'youtube-embed',
      'ngRottenTomatoes'
    ])
      .value('lubTmdbApiKey', '1cec0394fa447a1f03d7a744faf9cbc9')
      .config(config);
 // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider','rottenTomatoesProvider'];

  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider,rottenTomatoesProvider) {

    $locationProvider.html5Mode(false);
    rottenTomatoesProvider.setKey('fgknsgt8gv4hwfumspgerrmk');
    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MovieListCtrl',
        controllerAs: 'main'
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailsCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('authInterceptor');
    rottenTomatoesProvider.setKey('YOUR_TOKEN');
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

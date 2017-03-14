angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  
  $routeProvider
  // home page
  .when('/', {
    templateUrl: 'views/rendered/home.html',
    controller: 'MainController'
  })
  // about me page
  .when('/about', {
    templateUrl: 'views/rendered/about.html',
    controller: 'AboutController'
  })
  // portfolio page
  .when('/portfolio', {
    templateUrl: 'views/rendered/portfolio.html',
    controller: 'PortfolioController'
  })
  // API docs page
  .when('/docs', {
    templateUrl: 'views/rendered/docs.html',
    controller: 'DocsController'
  })
  // contact me page
  .when('/contact', {
    templateUrl: 'views/rendered/contact.html',
    controller: 'ContactController'
  });
  
  $locationProvider.html5Mode(true);
  
}]);
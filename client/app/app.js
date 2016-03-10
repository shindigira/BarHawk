angular.module('asyncdrink', [
  'ui.router',
  'asyncdrink.customerAuth',
  'asyncdrink.options',
  'asyncdrink.barAuth',
  'asyncdrink.barQueue'
])

.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('customerSignup', {
      url: "/signup",
      templateUrl: "/app/auth/patron/patronSignup.html",
      controller: 'customerController',
      authenticate: false
    })
    .state('options', {
      url: "/options",
      templateUrl: "/app/customer/options.html",
      controller: 'optionsController',
      authenticate: true
    })
    .state('barSignin', {
      url: '/barsignin',
      templateUrl: '/app/auth/bar/barSignin.html',
      controller: 'BarAuthController',
      authenticate: false
    })
    .state('barQueue', {
      url: '/barqueue',
      templateUrl: '/app/bartender/barQueue.html',
      controller: 'BarQueueController',
      authenticate: true
    })
    .state('customerLogin', {
      url: "/login",
      templateUrl: "/app/auth/patron/patronSignin.html",
      controller: 'customerController',
      authenticate: false
    });
});

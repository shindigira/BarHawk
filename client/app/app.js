angular.module('asyncdrink', [
  'ui.router',
  'asyncdrink.customerAuth',
  'asyncdrink.options',
  'asyncdrink.barAuth',
  'asyncdrink.barQueue'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('customerSignup', {
      url: "/signup",
      templateUrl: "/app/auth/patron/patronSignup.html",
      controller: 'customerController'
    })
    .state('options', {
      url: "/options",
      templateUrl: "/app/customer/options.html",
      controller: 'optionsController'
    })
    .state('barSignin', {
      url: '/barsignin',
      templateUrl: '/app/auth/bar/barSignin.html',
      controller: 'BarAuthController'
    })
    .state('barQueue', {
      url: '/barqueue',
      templateUrl: '/app/bartender/barQueue.html',
      controller: 'BarQueueController'
    })
});

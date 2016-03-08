angular.module('asyncdrink', [
  'ui.router',
  'asyncdrink.customerAuth',
  'asyncdrink.options'
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
    });
});

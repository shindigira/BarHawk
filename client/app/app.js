angular.module('asyncdrink', [
  'ui.router'
  'asyncdrink.customerAuth'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('customerSignup', {
      url: '/signup',
      templateURL: "patronSignup.html",
      controller: 'customerController'
    })
});

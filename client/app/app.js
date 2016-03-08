angular.module('asyncdrink', [
  'ui.router',
  'asyncdrink.customerAuth'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('customerSignup', {
      url: "/signup",
      templateUrl: "/app/auth/patron/patronSignup.html",
      controller: 'customerController'
    });



});

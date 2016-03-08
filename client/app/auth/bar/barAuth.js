angular.module('asyncdrink.barAuth')

.controller('BarAuthController', function($scope, BarAuthFactory) {
    $scope.barUser = {};
    $scope.barSignin = BarAuthFactory.signin($scope.barUser)
      .then(function() {
        $location.path('/barQueue');
      })
      .catch(function(error) {
        console.error(error);
      });
  })
  .factory('BarAuthFactory', function($location, $http) {
    var signin = function(barUser) {
      return $http({
          method: POST,
          url: '/api/barUsers/barSignin',
          data: barUser
        })
        .then(function(resp) {
          return resp;
        })
    };

    return {
      signin: signin
    };
  });

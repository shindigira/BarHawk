angular.module('asyncdrink.barAuth', [])

.controller('BarAuthController', function ($scope, $location, BarAuthFactory) {
    $scope.barUser = {};
    $scope.invalidLogIn = false;
    $scope.barLogin = function () {
      BarAuthFactory.signin($scope.barUser)
        .then(function () {
          $location.path('/barqueue');
        })
        .catch(function (error) {
          $scope.invalidLogIn = true;
        });
    };
  })
  .factory('BarAuthFactory', function ($location, $http) {
    var signin = function (barUser) {
      return $http({
        method: 'POST',
        url: '/api/barUsers/barSignin',
        data: barUser
      });
    };

    return {
      signin: signin
    };
  });

angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function($scope, customerFactory) {
    $scope.newUser = {};

    $scope.newUser.username = 'Michael'
    $scope.newUser.password = "pass"
    $scope.newUser.age = "25"
    $scope.newUser.weight = '160'

    $scope.signUp = function() {
      customerFactory.signUp($scope.newUser);
    };
  })
  .factory('customerFactory', function($http) {

    var signUp = function(userInfo) {
      console.log("userInfo", userInfo);
      return $http({
          method: "POST",
          url: '/api/users/signup',
          data: userInfo
        }).then(function(resp) {
          res.send(resp.data);
        })
        .catch(function(err) {
          throw err;
        });
    };
    return {
      signUp: signUp
    };
  });

angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function($scope, customerFactory) {
    $scope.newUser = {};

    $scope.newUser.username = 'Michael';
    $scope.newUser.password = "pass";
    $scope.newUser.age = "25";
    $scope.newUser.weight = '160';

    $scope.signUp = function() {
      customerFactory.signUp($scope.newUser)
        .then(function(response) {
          //go to options page
          $scope.invalidSignup = false;
          console.log(response);
        })
        .catch(function(error) {
          $scope.invalidSignup = true;
        });
    };
  })
  .factory('customerFactory', function($http) {
    //var currentUser = userInfo;
    var invalidSignup = false;

    var signUp = function(userInfo) {
      console.log("userInfo", userInfo);
      return $http({
        method: "POST",
        url: '/api/users/signup',
        data: userInfo
      });
    };
    return {
      signUp: signUp,
      invalidSignup: invalidSignup
    };
  });

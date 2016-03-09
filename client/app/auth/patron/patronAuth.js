angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function($scope, $state, customerFactory, optionsFactory) {
    //newUser obj will hold all sign up inputs and set drinkCount to 0
    $scope.newUser = {};

    $scope.newUser.username = 'Michael';
    $scope.newUser.password = "pass";
    $scope.newUser.age = "25";
    $scope.newUser.weight = '160';
    $scope.newUser.drinkCount = 0;
    $scope.newUser.totalPrice = 0;

    $scope.signUp = function() {
      customerFactory.signUp($scope.newUser)
        .then(function(response) {
          //go to options page if successfully signed up
          $scope.invalidSignup = false;
          //giving optionsFactory access to newUser.username
          optionsFactory.currentUser = $scope.newUser.username;
          //change state to options, which is configured on app.js
          $state.go('options');
        })
        .catch(function(error) {
          //show user that they failed to signup successfully
          $scope.invalidSignup = true;
        });
    };
  })
  .factory('customerFactory', function($http) {

    var invalidSignup = false;

    var signUp = function(userInfo) {
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

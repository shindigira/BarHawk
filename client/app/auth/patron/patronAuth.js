angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function($scope, customerFactory) {
    $scope.newUser = {};

    $scope.newUser.username = 'Michael';
    $scope.newUser.password = "pass";
    $scope.newUser.age = "25";
    $scope.newUser.weight = '160';
    $scope.invalidSignup = customerFactory.invalidSignup;



    $scope.signUp = function() {
      customerFactory.signUp($scope.newUser);
      customerFactory.currentUser = $scope.newUser.username;
      $scope.invalidSignup;
      // $scope.checkIfUserExists = function() {
      //   customerFactory.checkIfUserExists()
      //   console.log('hit checkIfUserExists fn')
      // }
    };
  })
  .factory('customerFactory', function($http) {
    //var currentUser = userInfo;
    var invalidSignup;
    // var checkIfUserExists = function() {
    //   return $http({
    //     method: 'GET',
    //     url: '/api/users/signup',
    //     data: users
    //   }).then(function(data) {
    //     console.log('data', data)
    //   }).catch(function(err) {
    //     throw err;
    //   })
    // }
    var signUp = function(userInfo) {
      console.log("userInfo", userInfo);
      return $http({
          method: "POST",
          url: '/api/users/signup',
          data: userInfo
        }).then(function(res) {
          //go to options page
          invalidSignup = false;
        })
        .catch(function(err) {
          invalidSignup = true;
          throw err;
        });
    };
    return {
      signUp: signUp,
      invalidSignup: invalidSignup,
      checkIfUserExists: checkIfUserExists
    };
  });

angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function($scope, customerFactory) {
    $scope.newUser = {};

    $scope.signUp = function() {
      console.log($scope.newUser)
      customerFactory.signUp($scope.newUser);
    };
  })
  .factory('customerFactory', function($http) {
    //var userInfo = {};

    // userInfo.username;
    // userInfo.password;
    // userInfo.age;
    // userInfo.weight;
    // userInfo.gender;

    var signUp = function(userInfo) {
      console.log('hit signup')
      console.log("userInfo", userInfo)
      return $http({
          method: "POST",
          url: '/api/users/signup',
          data: JSON.stringify(userInfo)
        }).then(function(data) {
          res.send(data)
        })
        .catch(function(err) {
          console.log(err);
        })
    };
    return {
      signUp: signUp
    };
  });

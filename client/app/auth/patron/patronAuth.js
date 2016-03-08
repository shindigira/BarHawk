angular.module('customerAuth', [])

.controller('customerController', function($scope, customerFactory){
  $scope.customerFactory

})
.factory('customerFactory', function(){
  var userInfo = {};
  
  userInfo.username = username;
  userInfo.password = password;
  userInfo.age = age;
  userInfo.weight = weight;
  userInfo.gender = gender;

  return userInfo;
});

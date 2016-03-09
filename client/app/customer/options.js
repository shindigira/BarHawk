angular.module('asyncdrink.options', [])

.controller('optionsController', function($scope, customerFactory, optionsFactory) {
  $scope.currentUser = optionsFactory.currentUser;
  $scope.order = {};
  $scope.order.username = optionsFactory.currentUser;
  $scope.order.time = new Date();
  $scope.order.currentPrice = 5;
  $scope.orderSuccess = false;
  $scope.orderFail = false;


  $scope.orderOnly = function() {
    $scope.order.closeout = false;
    optionsFactory.orderOnly($scope.order)
      .then(function(response) {
        $scope.orderSuccess = true;

        //set drinkType to empty string after successfully placing order
        $scope.order.drinkType = "";
        console.log($scope.order);
      }).catch(function(err) {
        $scope.orderFail = true;
      });
  };

  $scope.logOut = function() {
    optionsFactory.logOut()
      .then(function(response) {
        //state.go('login')
      }).catch(function(err) {
        throw err;
      });
  };

  $scope.closeTabOnly = function() {
    optionsFactory.closeTabOnly()
      .then(function(response) {
        //state.go('tab')
      }).catch(function(err) {
        throw err;
      });
  };

  $scope.orderAndCloseTab = function() {
    optionsFactory.orderAndCloseTab()
      .then(function(resp) {
        //state.go('tab')
      }).catch(function(err) {
        throw err;
      });
  };
})

.factory('optionsFactory', function($http) {
  //current user is set by 'optionsFactory.currentUser = $scope.newUser.username' on patronAuth.js
  var currentUser;

  var orderOnly = function(order) {
    return $http({
      method: "POST",
      url: '/api/customer/order',
      data: order
    });
  };
  var logOut = function() {
    return $http({
      method: "POST",
      url: "",
    });
  };

  var closeTabOnly = function() {
    return $http({
      method: "Post"
    });
  };

  var orderAndCloseTab = function() {
    return $http({
      method: 'POST',
      url: '',
      data: order
    });
  };


  return {
    currentUser: currentUser,
    orderOnly: orderOnly,
    logOut: logOut,
    closeTab: closeTab,
    orderAndCloseTab: orderAndCloseTab
  };
});

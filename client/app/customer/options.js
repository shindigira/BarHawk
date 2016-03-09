angular.module('asyncdrink.options', [])

.controller('optionsController', function ($scope, $state, customerFactory, optionsFactory) {
  $scope.currentUser = optionsFactory.currentUser;
  $scope.order = {};
  $scope.order.username = optionsFactory.currentUser;
  $scope.order.time = new Date();
  $scope.order.currentPrice = 5;
  $scope.orderSuccess = false;
  $scope.orderFail = false;
  $scope.tabSuccess = false;
  $scope.tabSuccessIncludingOrder = false;
  $scope.clear = function () {
    $scope.orderSuccess = false;
  };
  //$scope.order.userTab

  $scope.orderOnly = function () {
    $scope.order.closeout = false;
    optionsFactory.orderOnly($scope.order)
      .then(function (response) {
        $scope.orderSuccess = true;

        //set drinkType to empty string after successfully placing order
        $scope.order.savedDrinkType = $scope.order.drinkType;
        $scope.order.drinkType = "";
      }).catch(function (err) {
        $scope.orderFail = true;
      });
  };

  $scope.logOut = function () {
    optionsFactory.logOut();
    $scope.currentUser = null;
    $state.go('customerLogin');
  };

  $scope.closeTabOnly = function () {
    optionsFactory.closeTabOnly($scope.order)
      .then(function (response) {
        //state.go('tab')
        $scope.tabSuccess = true;
        $scope.order.closeout = true;

        var userTab;
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].username === $scope.order.username) {
            $scope.order.userTab = response.data[i];
          }
        }
      }).catch(function (err) {
        $scope.tabSuccess = false;
        throw err;
      });
  };

  $scope.orderAndCloseTab = function () {
    optionsFactory.orderAndCloseTab($scope.order)
      .then(function (response) {
        $scope.tabSuccessIncludingOrder = true;
        $scope.order.closeout = true;

        var userTab;
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].username === $scope.order.username) {
            $scope.order.userTab = response.data[i];
          }
        }
      }).catch(function (err) {
        $scope.tabSuccessIncludingOrder = false;
        throw err;
      });
  };
})

.factory('optionsFactory', function ($http) {
  //current user is set by 'optionsFactory.currentUser = $scope.newUser.username' on patronAuth.js
  var currentUser;

  var orderOnly = function (order) {
    return $http({
      method: "POST",
      url: '/api/customer/order',
      data: order
    });
  };
  var logOut = function () {

  };

  var closeTabOnly = function (order) {
    return $http({
      method: "POST",
      url: '/api/customer/closetab',
      data: order
    });
  };

  var orderAndCloseTab = function (order) {
    return $http({
      method: 'POST',
      url: '/api/customer/closetab',
      data: order
    });
  };


  return {
    currentUser: currentUser,
    orderOnly: orderOnly,
    logOut: logOut,
    closeTabOnly: closeTabOnly,
    orderAndCloseTab: orderAndCloseTab
  };
});

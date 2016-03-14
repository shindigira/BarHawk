angular.module('asyncdrink.options', [])

.controller('optionsController', function ($scope, $state, $window, customerFactory, optionsFactory) {
  //set current user
  $scope.currentUser = optionsFactory.currentUser;
  //prepare order object before submit to server
  $scope.order = {};
  $scope.order.username = optionsFactory.currentUser;
  $scope.order.currentPrice = 5;

  //success/fail messages
  $scope.orderSuccess = false;
  $scope.orderFail = false;
  $scope.tabFail = false;
  $scope.tabSuccess = false;
  $scope.tabSuccessIncludingOrder = false;


  $scope.clear = function () {
    $scope.orderSuccess = false;
  };

  //Order only process
  $scope.orderOnly = function () {
    $scope.order.time = new Date();
    $scope.order.closeout = false;
    optionsFactory.orderOnly($scope.order)
      .then(function (response) {
        $scope.orderSuccess = true;
        //set drinkType to empty string after successfully placing order
        $scope.order.savedDrinkType = $scope.order.drinktype;
        console.log("savedDrinkType ", $scope.order.savedDrinkType);
        $scope.order.drinktype = "";

      }).catch(function (err) {
        $scope.orderFail = true;
      });
  };

  //log out
  $scope.logOut = function () {
    optionsFactory.currentUser = undefined;
    $window.localStorage.removeItem('com.barhawk');
    $state.go('customerLogin');
  };

  //Close only process
  $scope.closeTabOnly = function () {
    $scope.order.time = new Date();
    $scope.order.closeout = true;
    $scope.order.currentPrice = 0;
    optionsFactory.closeTabOnly($scope.order)
      .then(function (response) {
        $scope.tabSuccess = true;
        //display tab information from server
        $scope.userTab = response.data;
        //navigate back to login
        // setTimeout(function () {
        //     optionsFactory.currentUser = undefined;
        //     $state.go('customerLogin')
        //   },
        //   5000);
      }).catch(function (err) {
        $scope.tabFail = true;
        console.log(err);
      });
  };

  //Order and close process
  $scope.orderAndCloseTab = function () {
    $scope.order.time = new Date();
    $scope.order.closeout = true;

    optionsFactory.orderAndCloseTab($scope.order)
      .then(function (response) {
        $scope.tabSuccessIncludingOrder = true;
        $scope.userTab = response.data;
        //navigate back to login
        // setTimeout(function () {
        //     optionsFactory.currentUser = undefined;
        //     $state.go('customerLogin')
        //   },
        //   5000);
      }).catch(function (err) {
        $scope.tabSuccessIncludingOrder = false;
        throw err;
      });
  };
})

.factory('optionsFactory', function ($http) {
  //current user is set by 'optionsFactory.currentUser = $scope.newUser.username' on patronAuth.js
  var currentUser;
  var userid;

  var orderOnly = function (order) {
    return $http({
      method: "POST",
      url: '/api/customer/order',
      data: order
    });
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
      url: '/api/customer/order/close',
      data: order
    });
  };


  return {
    currentUser: currentUser,
    orderOnly: orderOnly,
    closeTabOnly: closeTabOnly,
    orderAndCloseTab: orderAndCloseTab
  };
});
angular.module('asyncdrink.options', [])

.controller('optionsController', function ($scope, $state, $window, customerFactory, optionsFactory) {
  //set up drinks
  $scope.drinks = {};

  //set current user
  $scope.currentUser = optionsFactory.currentUser;

  //prepare order object before submit to server

  $scope.order = {};
  $scope.order.username = optionsFactory.currentUser.username;

  //success/fail messages
  $scope.orderSuccess = false;
  $scope.orderFail = false;
  $scope.tabFail = false;
  $scope.tabSuccess = false;
  $scope.tabSuccessIncludingOrder = false;

  //get all drinks from db
  $scope.getDrinks = function() {
    optionsFactory.getDrinksList()
    .then(function(drinks) {
      $scope.drinks.list = drinks;
    });
  };

  $scope.getDrinks();
  console.log($scope.drinks.list);
  //Order only process
  $scope.orderOnly = function () {
    $scope.order.time = new Date();
    $scope.order.closeout = false;
    console.log($scope.order);
    $scope.savedDrinkType = $scope.order.drinkType;
    optionsFactory.orderOnly($scope.order)
      .then(function (response) {
        $scope.orderSuccess = true;
        //set drinkType to empty string after successfully placing order
        $scope.drinkType = "";

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

  var getDrinksList = function () {
    return $http({
      method: "GET",
      url: '/api/customer/drink'
    }).then(function (response) {
      return response.data;
    });
  };

  var orderOnly = function (order) {
    return $http({
      method: "POST",
      url: '/api/menu/order',
      data: order
    });
  };

  var closeTabOnly = function (order) {
    return $http({
      method: "POST",
      url: '/api/menu/closetab',
      data: order
    });
  };

  var orderAndCloseTab = function (order) {
    return $http({
      method: 'POST',
      url: '/api/menu/orderandclosetab',
      data: order
    });
  };


  return {
    currentUser: currentUser,
    orderOnly: orderOnly,
    closeTabOnly: closeTabOnly,
    orderAndCloseTab: orderAndCloseTab,
    getDrinksList: getDrinksList
  };
});

angular.module('asyncdrink.options', [])

.controller('optionsController', function ($scope, $state, $window, customerFactory, optionsFactory) {
  //set up drinks
  $scope.drinks = {};

  //set current user (object with all user info)
  $scope.currentUser = optionsFactory.currentUser;

  //prepare order object before submit to server
  $scope.order = {
    username: $scope.currentUser.username
  };

  //success/fail messages
  $scope.orderSuccess = false;
  $scope.orderFail = false;
  $scope.tabFail = false;
  $scope.tabSuccess = false;
  $scope.tabSuccessIncludingOrder = false;

  //get all drinks from db
  $scope.getDrinks = function () {
    optionsFactory.getDrinksList()
      .then(function (drinks) {
        $scope.drinks.list = drinks;
      });
  };
  $scope.getDrinks();

  //Order only process
  $scope.orderOnly = function () {

    $scope.savedDrinkType = $scope.order.drinkType;
    optionsFactory.orderOnly($scope.order)
      .then(function (response) {
        $scope.orderSuccess = true;
        $scope.orderFail = false;
        $scope.tabFail = false;
        $scope.tabSuccess = false;
        $scope.tabSuccessIncludingOrder = false;
        //set drinkType to empty string after successfully placing order
        $scope.drinkType = "";
        console.log("RESPONSE", response);
        $scope.currentUser.drinkCount = response.data.drinkcount;
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

    optionsFactory.closeTabOnly($scope.order)
      .then(function (response) {
        $scope.tabSuccess = true;
        //display tab information from server
        $scope.userTab = response.data;
        $scope.orderSuccess = false;
        $scope.orderFail = false;
        $scope.tabFail = false;
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
    console.log($scope.order);
    optionsFactory.orderAndCloseTab($scope.order)
      .then(function (response) {
        console.log("THIS IS ORDERCLOSE RESPONSE", response);
        $scope.savedDrinkType = $scope.order.drinkType;
        $scope.currentUser.drinkCount = response.data.drinkcount;
        $scope.tabSuccessIncludingOrder = true;
        $scope.userTab = response.data;
        $scope.orderSuccess = false;
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

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
      }).catch(function(err) {
        $scope.orderFail = true;
      });

  };
})

.factory('optionsFactory', function($http) {
  var currentUser;

  var orderOnly = function(order) {
    return $http({
      method: "POST",
      url: '/api/customer/order',
      data: order
    });
  };

  return {
    currentUser: currentUser,
    orderOnly: orderOnly,
  };
});

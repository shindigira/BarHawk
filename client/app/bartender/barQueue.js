angular.module('asyncdrink.barQueue', [])

.controller('BarQueueController',
  function($scope, OrdersFactory) {
    $scope.data = {};
    $scope.getOrders = function() {
      OrdersFactory.getAll()
        .then(function(orders) {
          $scope.data.orders = orders;
        })
        .catch(function(error) {
          console.error(error);
        });
    };
    $scope.getOrders();
  })

.factory('OrdersFactory', function($http) {
  var getAll = function() {
    return $http({
        method: 'GET',
        url: '/api/barUsers/barQueue'
      })
      .then(function(resp) {
        console.log(resp);
        return resp.data;
      });
  };

  return {
    getAll: getAll
  }
})

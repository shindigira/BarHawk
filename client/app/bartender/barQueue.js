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

    $scope.dequeue = function(){
      OrdersFactory.removeOrder()
        .then(function(){
          $scope.getOrders();
        })
        .catch(function(error){
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

  var removeOrder = function(){
    return $http({
        method: 'POST',
        url: '/api/barUsers/barQueue/dequeue',
        data: {orderToBeDequeued: 0}
    })
    .then(function(resp) {
      return resp.data;
    });
    
  };

  return {
    getAll: getAll,
    removeOrder: removeOrder
  }
})

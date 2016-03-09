angular.module('asyncdrink.barQueue', [])

.controller('BarQueueController',
  function ($scope, OrdersFactory) {
    $scope.data = {};


    //scope function to retrieve all the orders from the server
    $scope.getOrders = function () {
      OrdersFactory.getAll()
        //after all orders retrieved from server, add them to scope
        .then(function (orders) {
          $scope.data.orders = orders;
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.dequeue = function () {
      OrdersFactory.removeOrder()
        //on success of removeOrder (server.js), getOrders is called to submit get request for updated queue
        .then(function () {
          $scope.getOrders();
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.getOrders();
  })

.factory('OrdersFactory', function ($http) {

  //factory function to send http GET request to server for all orders
  var getAll = function () {
    return $http({
        method: 'GET',
        url: '/api/barUsers/barQueue'
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var removeOrder = function () {
    //sending post request with data object populated with index to be removed from queue
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

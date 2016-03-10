angular.module('asyncdrink.barQueue', [])

.controller('BarQueueController',
  function ($scope, OrdersFactory) {
    $scope.data = {};


    //scope function to retrieve all the orders from the server
    $scope.getOrders = function () {
      OrdersFactory.getAll()
        //after all orders retrieved from server, add them to scope
        .then(function (orders) {
          console.log(orders);
          $scope.data.orders = orders;
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.dequeue = function (completedOrder) {
      //completedOrder passed in on the view as ng-repeat order in orders in html 
      OrdersFactory.removeOrder(completedOrder)
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

  var removeOrder = function (completedOrder) {
    //sending post request with the specific drink order object whose button was clicked to be removed
    return $http({
        method: 'POST',
        url: '/api/barUsers/barQueue/dequeue',
        data: completedOrder
      })
      .then(function (resp) {
        return resp.data;
      });

  };

  return {
    getAll: getAll,
    removeOrder: removeOrder
  }
})

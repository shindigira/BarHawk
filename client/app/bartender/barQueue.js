//var models = require('./../../../server/models');

angular.module('asyncdrink.barQueue', [])

.controller('BarQueueController',
    function($scope, OrdersFactory, $window, $state, $interval, optionsFactory) {
        $scope.data = {};

        $scope.bartenderLogout = function() {
            $interval.cancel(poll);
            optionsFactory.currentUser = undefined;
            $window.localStorage.removeItem('com.barhawk');
            $state.go('barSignin');
        };
        
        var showPendingOrders = function(){
            OrdersFactory.getAll()
                //after all orders retrieved from server, add them to scope
                .then(function(orders) {
                    $scope.data.orders = orders;
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        //poll all pending orders from the server
        var poll = $interval(showPendingOrders, 3000);

        $scope.completeOrder = function(completedOrder) {

            var textMessDetails = {
                customerName: completedOrder.username,
                customerDrinkType: completedOrder.drinktype,
                customerCloseout: completedOrder.closeout
            };
            OrdersFactory.sendTextMessage(textMessDetails);
            OrdersFactory.removeOrder(completedOrder)
                //on success of removeOrder, showPendingOrders is called to submit get request for updated queue
                .then(function() {
                    showPendingOrders();
                })
                .catch(function(error) {
                    console.error(error);
                });
        };
    })

.factory('OrdersFactory', function($http, optionsFactory) {

    //factory function to send http GET request to server for all orders
    var getAll = function() {
        return $http({
                method: 'POST',
                url: '/api/barqueue/showPendingOrders',
                data: optionsFactory.currentUser
            })
            .then(function(resp) {
                return resp.data;
            });
    };

    var sendTextMessage = function(textMessInfo) {
        return $http({
            method: 'POST',
            url: '/api/barqueue/orderCompleteTextMessage',
            data: textMessInfo
        })
    };

    var removeOrder = function(completedOrder) {
        //sending post request with the specific drink order object whose button was clicked to be removed
        return $http({
                method: 'POST',
                url: '/api/barqueue/completeOrder',
                data: completedOrder
            })
            .then(function(resp) {
                return resp.data;
            });

    };

    return {
        sendTextMessage: sendTextMessage,
        getAll: getAll,
        removeOrder: removeOrder
    }
})
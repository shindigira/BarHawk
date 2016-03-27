//var models = require('./../../../server/models');

angular.module('asyncdrink.barQueue', [])

.controller('BarQueueController',
    function($scope, OrdersFactory, $window, $state, $interval, optionsFactory) {
        $scope.data = {};

        $scope.bartenderLogout = function() {
            $interval.cancel(poll);
            optionsFactory.currentUser = undefined;

            //remove currentUser and token from local storage upon bartender logout
            $window.localStorage.removeItem('com.barhawk.currentUser');
            $window.localStorage.removeItem('com.barhawk');
            $state.go('barSignin');
        };

        var showPendingOrders = function() {
            OrdersFactory.getAll()
                //after all orders retrieved from server, add them to scope
                .then(function(orders) {

                    $scope.data.orders = orders;
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        //show pending orders immediately upon rendering this state
        showPendingOrders();

        $scope.barClosingWarning = function(){
            OrdersFactory.showAllLoggedInUser();
        }

        $scope.getTaxi = function(){
            OrdersFactory.getTaxi();
            $scope.taxi = true;
        }

        //poll all pending orders from the server every fifteen seconds
        var poll = $interval(showPendingOrders, 15000);

        $scope.cancelOrder = function(cancelledOrder) {

            var textMessDetails = {
                customerName: cancelledOrder.username,
                customerDrinkType: cancelledOrder.drinktype,
                customerCloseout: cancelledOrder.closeout,
                cancelled: true
            };
            OrdersFactory.cancelOrder(cancelledOrder)
                //on success of removeOrder, showPendingOrders is called to submit get request for updated queue
                .then(function() {
                    showPendingOrders();
                    OrdersFactory.sendTextMessage(textMessDetails);
                })
                .catch(function(error) {
                    console.error(error);
                });
        };

        $scope.completeOrder = function(completedOrder) {

            var textMessDetails = {
                customerName: completedOrder.username,
                customerDrinkType: completedOrder.drinktype,
                customerCloseout: completedOrder.closeout
            };
            OrdersFactory.removeOrder(completedOrder)
                //on success of removeOrder, showPendingOrders is called to submit get request for updated queue
                .then(function() {
                    showPendingOrders();
                    OrdersFactory.sendTextMessage(textMessDetails);
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

    var getTaxi = function(){
        return $http({
            method:'POST',
            url:'api/barqueue/getTaxi'

        })

    };

    var showAllLoggedInUser = function(){
        return $http({
            method: 'POST',
            url:'api/barqueue/showAllLoggedInUser'
        })
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

    var cancelOrder = function(cancelledOrder) {

        return $http({
            method: 'POST',
            url: '/api/barqueue/cancelOrder',
            data: cancelledOrder
        })
        .then(function(resp) {
            return resp.data;
        });
    }

    return {
        getTaxi:getTaxi,
        showAllLoggedInUser: showAllLoggedInUser,
        sendTextMessage: sendTextMessage,
        getAll: getAll,
        removeOrder: removeOrder,
        cancelOrder: cancelOrder
    }
})

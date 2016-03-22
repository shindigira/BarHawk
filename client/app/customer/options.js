angular.module('asyncdrink.options', [])

.controller('optionsController', function($scope, $state, $window, $interval, customerFactory, optionsFactory) {
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
    $scope.orderCloseSuccess = false;

    $scope.test = function() {
        console.log("TESTING TESTING");
    };

    $scope.clickImage = function() {
        $scope.order.drinkType = drink.name;
        $scope.order.drinkid = drink.id;
    }

    //get all drinks from db
    $scope.getDrinks = function() {
        optionsFactory.getDrinksList()
            .then(function(drinks) {
                $scope.drinks.list = drinks;
                //console.log('$scope.drinks.list[0]: ', $scope.drinks.list[0]);
            });
    };
    $scope.getDrinks();

    //get user's drink count on load
    $scope.getDK = function() {
        optionsFactory.getDrinkCount($scope.currentUser)
            .then(function(response) {
                $scope.currentUser.drinkCount = response.drinkcount;
                $scope.currentUser.BAC = response.BAC;

                $scope.order.BAC = response.BAC;
                //BAC spectrum slider
          var spectrum = document.getElementById('spectrum');
          var t = Math.floor(($scope.currentUser.BAC / 0.4) * 100);
          spectrum.value = t;
          var spectrumText = document.getElementById('spectrumText');
          var x;
          if( $scope.currentUser.BAC >= 0 && $scope.currentUser.BAC < 0.08){
            x = 'sober';
          }
          else if(  $scope.currentUser.BAC === 0.08 ){
            x = 'keep drinking. but DONT DRIVE!';
          }
          else if($scope.currentUser.BAC > 0.08 && $scope.currentUser.BAC < 0.4){
            x = 'start dancing';
          }
          else{
            x = 'your in a COMMA';
          }
          spectrumText.value = x;

                $scope.order.BAC = response.BAC


                var chartdata = [$scope.currentUser.BAC * 400];
                console.log('bac', chartdata)
                    //var data = [4, 8, 15, 16, 23, 42];
                    //var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
                    //  the size of the overall svg element
                var height = 200;
                var width = 200;

                //  the width of each bar and the offset between each bar
                var barWidth = 40;
                var barOffset = 20;






                // Add
                // d3.select('#bar-chart').enter().append('rect').style('fill', 'orange');

                d3.select('#bar-chart').append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('background', '#dff0d8')
                    .selectAll('rect').data(chartdata)
                    .enter().append('rect')
                    .style({ 'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5' })
                    .attr('width', barWidth)
                    .attr('height', function(data) {
                        return data;
                    })
                    .attr('x', function(data, i) {
                        return i * (barWidth + barOffset);
                    })
                    .attr('y', function(data) {
                        return height - data;
                    });





            })
    };
    $scope.getDK();


    //Order only process
    $scope.orderOnly = function() {
        // console.log("ORDER ONLY $scope.order.drinkType: ", $scope.order.drinkType);
        // console.log("ORDER ONLY $scope.order.drinkid: ", $scope.order.drinkid);
        $scope.savedDrinkType = $scope.order.drinkType;
        $scope.savedDrinkid = $scope.order.drinkid;

        optionsFactory.orderOnly($scope.order)
            .then(function(response) {
                //reset response messages
                $scope.orderSuccess = true;
                $scope.orderFail = false;
                $scope.tabFail = false;
                $scope.tabSuccess = false;
                $scope.tabSuccessIncludingOrder = false;
                //set drinkType to empty string after successfully placing order
                $scope.order.drinkType = "";
                $scope.getDK();
                // $scope.currentUser.drinkCount = response.data.drinkcount;


                // Remove
                d3.selectAll('svg').remove();

            }).catch(function(err) {
                $scope.orderFail = true;
            });
    };
    //log out
    $scope.logOut = function() {
        optionsFactory.currentUser = undefined;
        //delete currentUser object from localStorage
        $window.localStorage.removeItem('com.barhawk.currentUser');

        //delete token from localStorage

        $window.localStorage.removeItem('com.barhawk');
        $state.go('customerLogin');
    };

    //Close only process
    $scope.closeTabOnly = function() {

        optionsFactory.closeTabOnly($scope.order)
            .then(function(response) {
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
            }).catch(function(err) {
                $scope.tabFail = true;
                console.log(err);
            });
    };

    //Order and close process
    $scope.orderAndCloseTab = function() {
        console.log("$scope.order.drinkType: ", $scope.order.drinkType);

        optionsFactory.orderAndCloseTab($scope.order)
            .then(function(response) {
                //display stats and success msgs
                $scope.savedDrinkType = $scope.order.drinkType;
                $scope.currentUser.drinkCount = response.data.drinkcount;
                $scope.tabSuccessIncludingOrder = true;
                $scope.userTab = response.data;
                $scope.orderSuccess = false;
                $scope.order.drinkType = "";
                $scope.getDK();

            }).catch(function(err) {
                $scope.tabSuccessIncludingOrder = false;
                throw err;
            });
    };
    $interval($scope.getDK, 3600000);

})

.factory('optionsFactory', function($http) {
    //current user is set by 'optionsFactory.currentUser = $scope.newUser.username' on patronAuth.js
    var currentUser;

    var getDrinksList = function() {
        return $http({
            method: "GET",
            url: '/api/menu/drinks'
        }).then(function(response) {
            return response.data;

        });
    };

    var getDrinkCount = function(currentUser) {
        return $http({
            method: "POST",
            url: '/api/customers/drinkcount',
            data: currentUser
        }).then(function(response) {
            return response.data
        })
    }

    var orderOnly = function(order) {
        return $http({
                method: "POST",
                url: '/api/menu/order',
                data: order
            })
            .then(function(response) {
                return response.data;
            })
    };

    var closeTabOnly = function(order) {
        return $http({
            method: "POST",
            url: '/api/menu/closetab',
            data: order
        });
    };

    var orderAndCloseTab = function(order) {
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
        getDrinksList: getDrinksList,
        getDrinkCount: getDrinkCount


    };
})
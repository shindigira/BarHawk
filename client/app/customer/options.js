angular.module('asyncdrink.options', [])

.controller('optionsController', function($scope, $state, $window, $interval, customerFactory, optionsFactory, $filter) {
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
    $scope.canDrive = true;
    $scope.clickImage = function() {
        $scope.order.drinkType = drink.name;
        $scope.order.drinkid = drink.id;
    }

    $scope.isLowCal = function(drinkObj) {
        return function(drinkObj) {
            return drinkObj.calories<150;
        }
    }

    $scope.reset = function(drinkObj) {
        return function(drinkObj) {
            console.log("reset");
            return drinkObj;
        }
    }

    $scope.isZeroCarb = function(num) {
        return function(num) {
            return num === 0;
        }
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
                // var spectrum = document.getElementById('spectrum');
                // var t = Math.floor(($scope.currentUser.BAC / 0.4) * 100);
                // spectrum.value = t;
                // var spectrumText = document.getElementById('spectrumText');
                // var x;
                // if ($scope.currentUser.BAC >= 0 && $scope.currentUser.BAC < 0.08) {
                //     x = 'sober';
                // } else if ($scope.currentUser.BAC === 0.08) {
                //     x = 'keep drinking. but DONT DRIVE!';
                // } else if ($scope.currentUser.BAC > 0.08 && $scope.currentUser.BAC < 0.4) {
                //     x = 'start dancing';
                // } else {
                //     x = 'your in a COMMA';
                // }
                // spectrumText.value = x;

                $scope.order.BAC = response.BAC

                if(chartdata>=.08){
                    $scope.canDrive  = false;
                }

                var chartdata = [$scope.currentUser.BAC];

                if(chartdata>=.08){
                    $scope.canDrive  = false;
                }
                    //var data = [4, 8, 15, 16, 23, 42];
                    //var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
                    //  the size of the overall svg element
                    // var height = 350;
                    // var width = 200;

                // //  the width of each bar and the offset between each bar
                // var barWidth = 40;
                // var barOffset = 20;


                var margin = { top: -5, right: 10, bottom: 30, left: 170 }

                var height = 400;
                var width = 420 - margin.left - margin.right;
                var barWidth = 40;
                var barOffset = 170;


                // Add
                // d3.select('#bar-chart').enter().append('rect').style('fill', 'orange');

                d3.select('#bar-chart').append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('background', 'transparent')
                    .selectAll('rect').data(chartdata)

                    .enter().append('rect')
                    //.style({ 'fill': 'red', 'stroke': 'red', 'stroke-width': '1' })

   //                  .each("start", function() {      // <-- Executes at start of transition
   //     d3.select(this)
   //       .attr("fill", "magenta")
   //       .attr("r", 3);
   // })


                    .attr("fill", function(d) {

                        if (d < .08) {
                            console.log('this is d', d)
                            return 'green'
                        } else if (d >= .08 && d < .2) {
                            return 'orange'
                        } else {
                            return 'red'
                        }
                    })
                    .attr('width', barWidth)
                    .attr('height', function(data) {
                        return data * 1000;
                    })
                    .attr('x', function(data, i) {
                        return 180;
                        //return i * (barWidth + barOffset)
                    })

                    .transition()
                    .duration(1500)
                    .ease('bounce')
                    .attr('y', function(data) {
                        //return 204
                        return height - data * 823;
                        //return height - data *  1000;
                        //return data
                    })
                    // .on('mouseover', function(data) {
                    //     dynamicColor = this.style.fill;
                    //     d3.select(this)
                    //         .style('fill', 'blue')
                    // })
                    // .on('mouseout', function(data) {
                    //     d3.select(this)
                    //         .style('fill', dynamicColor)
                    // })

                var maxBAC = [.5]

                var verticalGuideScale = d3.scale.linear()
                    .domain([0, d3.max([maxBAC])])
                    .range([height, 0])

                var vAxis = d3.svg.axis()
                    .scale(verticalGuideScale)
                    .tickValues([0.0, 0.03, 0.06, 0.08, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3, 0.33, 0.36, 0.39, 0.42 ,0.45, 0.48])
                    .tickSize(5)
                    .orient("left")
                    //.innerTickSize([size])
                    .tickFormat(function(d) {
                        if(d === 0.0){
                            return 'sober ' + d;
                       // }
                        //if (d === 0.03) {
                            //return 'mild euphoria ' + d;
                        //} else if (d === 0.06) {
                            //return 'blunted feelings ' + d;
                        } else if (d === 0.08) {
                            return "exceeded legal limit " +d;
                       // } else if (d === 0.12) {
                        //     return 'boisterousness ' + d;
                        // } else if (d === 0.15) {
                        //     return 'slurred speech ' + d;
                        // } else if (d === 0.18) {
                        //     return 'motor impairment' + d;
                        } else if (d === 0.21) {
                            return 'decreased libido ' + d;
                        } else if (d === 0.24) {
                        //     return 'possible vomiting ' + d;
                        // } else if (d === 0.27) {
                        //     return 'bladder dysfunction ' + d;
                        }else if (d === 0.3) {
                            return 'memory blackout '+d;
                        } //else if (d === 0.33) {
                        //     return 'dysequilibrium ' + d;
                        // } else if (d === 0.36) {
                        //     return 'coma ' + d;
                        // } else if (d === 0.39) {
                        //     return 'possible death ' + d;
                        // }
                        return d
                    })
                    .tickSubdivide(true);

                var verticalGuide = d3.select('svg').append('g')
                vAxis(verticalGuide)
                verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + -5 + ')')
                verticalGuide.selectAll('path')
                    .style({ fill: 'none', stroke: "black" })
                verticalGuide.selectAll('line')
                    .style({ stroke: "black" });
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
                var dateAsString;
                console.log(response.drinkcount)
                console.log(typeof response.drinkcount)
                 if(response.drinkcount === 0){
                    dateAsString = $filter('date')(response.createdAt, "shortTime");
                    $scope.timeOfFirstDrink = dateAsString;
                    console.log(dateAsString)
                 }

                 //$scope.first = $scope.timeOfFirstDrink

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

                // Remove
                d3.selectAll('svg').remove();

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
});
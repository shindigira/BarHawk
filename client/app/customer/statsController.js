angular.module('asyncdrink.statistics', ['chart.js'])

.controller('statsController', function($scope, $timeout, statsFactory) {

    $scope.currentUser = {
        username: "dnovo"
    };

    $scope.getData = function() {
        statsFactory.getBarChartData($scope.currentUser)
        .then(function(barData) {
          console.log(barData);
          $scope.barLabels = barData.labels;
    $scope.series = barData.series;
    $scope.barData = barData.data;
        })

      };

// $scope.barLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
//     $scope.series = ['Series A', 'Series B'];

//     $scope.barData = [
//         [65, 59, 80, 81, 56, 55, 40],
//         [28, 48, 40, 19, 86, 27, 90]
//     ];
    $scope.getData();

    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };


    // Simulate async data update
    // $timeout(function () {
    //   $scope.data = [
    //     [28, 48, 40, 19, 86, 27, 90],
    //     [65, 59, 80, 81, 56, 55, 40]
    //   ];
    // }, 3000);


})

.factory('statsFactory', function($http, $window) {
    var currentUser = JSON.parse($window.localStorage.getItem('com.barhawk.currentUser'));
    var getBarChartData = function(currentUser) {
        return $http({
            method: "post",
            url: 'api/customers/statistics',
            data: currentUser
        }).then(function(response) {
          return response.data
        })
    }


    return {
        getBarChartData: getBarChartData
    }

});

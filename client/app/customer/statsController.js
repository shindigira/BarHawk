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
          $scope.lineLabels = barData.labels;
    $scope.barSeries = barData.series;
    $scope.lineSeries = ['BAC'];
    $scope.barData = barData.data;
    console.log("SERVER BAC", barData.bac, "SCOPE SERIES", $scope.lineSeries, "SCOPE BAC", $scope.lineData);
    $scope.lineData = barData.bac;
        })
      };

    $scope.getData();

    $scope.onClick = function(points, evt) {
        console.log(points, evt);
    };

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  }

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

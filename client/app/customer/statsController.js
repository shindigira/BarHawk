angular.module('asyncdrink.statistics', ['chart.js'])

.controller('statsController', function($scope, $timeout, statsFactory) {

    $scope.getData = function() {
        statsFactory.getBarChartData(statsFactory.currentUser)
            .then(function(barData) {

                //x-axis tick labels
                $scope.barLabels = barData.labels;
                $scope.lineLabels = barData.labels;
                //series
                $scope.barSeries = barData.series;
                $scope.lineSeries = ['BAC'];
                //data points
                $scope.barData = barData.data;
                $scope.lineData = barData.bac;
            })
    };

    $scope.getData();

    $scope.onClick = function(points, evt) {
    };
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
        getBarChartData: getBarChartData,
        currentUser: currentUser
    }

});

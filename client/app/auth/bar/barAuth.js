angular.module('asyncdrink.barAuth', [])

.controller('BarAuthController', function($scope, $window, $location, BarAuthFactory, optionsFactory) {
        $scope.barUser = {};
        $scope.barUser.barUsername = 'baradmin';
        $scope.barUser.barPassword = 'barpassword';
        $scope.invalidLogIn = false;
        $scope.barLogin = function() {
            BarAuthFactory.signin($scope.barUser)
                .then(function(response) {
                    optionsFactory.currentUser = response.currentUser;

                    //store currentUser in localStorage in case of hard refresh
                    $window.localStorage.setItem('com.barhawk.currentUser', JSON.stringify(response.currentUser));

                    //store token in localStorage to navigate to restricted auth states
                    $window.localStorage.setItem('com.barhawk', response.token);

                    $location.path('/barqueue');
                })
                .catch(function(error) {
                    $scope.invalidLogIn = true;
                });
        };
    })
    .factory('BarAuthFactory', function($location, $http) {
        var signin = function(barUser) {
            return $http({
                    method: 'POST',
                    url: '/api/bartenders/signin',
                    data: barUser
                })
                .then(function(resp) {
                    return resp.data;
                })
        };

        return {
            signin: signin
        };
    });
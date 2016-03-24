angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function($scope, $state, $window, customerFactory, optionsFactory) {

    //newUser obj will hold all sign up inputs and set drinkCount to 0
    $scope.newUser = {
        drinkCount: 0,
        totalPrice: 0
    };

    $scope.loginAttempt = {
        username: 'JaneDoe85',
        password: 'janedoepassword'
    };

    $scope.invalidLogIn = false;

    $scope.clear = function() {
        $scope.invalidLogIn = false;
    };

    $scope.signUp = function() {

        customerFactory.signUp($scope.newUser)
            .then(function(response) {
                //hide error message, if displayed
                $scope.invalidSignup = false;

                optionsFactory.currentUser = response.currentUser;

                //remember currentUser in local storage in case of hard refresh
                $window.localStorage.setItem('com.barhawk.currentUser', JSON.stringify(response.currentUser));

                //remember token in local storage for navigation between restricted states
                $window.localStorage.setItem('com.barhawk', response.token);

                //navigate to options page
                $state.go('options');
            })
            .catch(function(error) {
                //show user that they failed to signup successfully
                $scope.invalidSignup = true;
            });
    };

    $scope.logIn = function() {
        customerFactory.signIn($scope.loginAttempt)
            .then(function(response) {

                //hide error message, if displayed
                $scope.invalidLogIn = false;
                //persist logged in user

                optionsFactory.currentUser = response.currentUser;

                //remember currentUser in local storage in case of hard refresh
                $window.localStorage.setItem('com.barhawk.currentUser', JSON.stringify(response.currentUser));

                //remember token in local storage for navigation between restricted states
                $window.localStorage.setItem('com.barhawk', response.token);

                //navigate to options page
                $state.go('options');
            })
            .catch(function(error) {
                //display invalid login message
                $scope.invalidLogIn = true;
            });
    };
})

.factory('customerFactory', function($http, $window) {
    var signIn = function(loginAttempt) {
        return $http({
                method: "POST",
                url: '/api/customers/login',
                data: loginAttempt
            })
            .then(function(resp) {
                return resp.data;
            })
    };

    var signUp = function(userInfo) {
        return $http({
                method: "POST",
                url: '/api/customers/signup',
                data: userInfo
            })
            .then(function(resp) {
                return resp.data;
            });
    };

    var isAuth = function() {
        return !!$window.localStorage.getItem('com.barhawk');

        //the below is a way to check if token exists and is correct for that particular user

        // return $http({
        //   method: "GET",
        //   url: 'api/users/signedin'
        // })
        // .then(function(resp){
        //   return resp.status;
        // })
        // .catch(function(resp){
        //   return resp.status;
        // })
    }

    return {
        signUp: signUp,
        signIn: signIn,
        isAuth: isAuth
    };

})

.directive('compareTo', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel){
            ngModel.$validators.compareTo = function(modelValue){
                return modelValue === scope.otherModelValue;
            };
            scope.$watch('otherModelValue', function(){
                ngModel.$validate();
            });
        }
    };
});




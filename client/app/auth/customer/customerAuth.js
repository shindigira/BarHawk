angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function ($scope, $state, $window, customerFactory, optionsFactory) {

  //newUser obj will hold all sign up inputs and set drinkCount to 0
  $scope.newUser = {
    // drinkCount: 0,
    // totalPrice: 0
  };
  //dummy data for easy submit
  // $scope.newUser.username= 'Beyonce';
  // $scope.newUser.password = "pass";
  // $scope.newUser.age = 27;
  // $scope.newUser.weight = 160;

  $scope.loginAttempt = {};

  $scope.invalidLogIn = false;



  $scope.clear = function() {
    $scope.invalidLogIn = false;
  };

  // $scope.validateSignIn = function(){
  //   if(!$scope.loginAttempt.username){
  //     alert('you forgot to enter your username');
  //     return;
  //   }
  //   if(!$scope.loginAttempt.password){
  //     alert('you forgot to enter your password');
  //     return;
  //   }
  //   console.log('validateSignIn passed both if statements');
  //   $scope.logIn();

  // }


   $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      alert('our form is amazing');
    }


  };


  // $scope.validateSignUp = function() {
  //   console.log($scope.newUser);

  //   if (!$scope.newUser.username) {
  //     alert('you forgot to setup your username');
  //     return;
  //   }
  //   if (!$scope.newUser.password) {
  //     alert('you forgot to setup your password');
  //     return;
  //   }
  //   if (!$scope.newUser.age) {
  //     alert('you forgot to enter your age');
  //     return;
  //   }
  //   if (!$scope.newUser.weight) {
  //     alert('you forgot to enter your weight');
  //     return;
  //   }
  //   if (!$scope.newUser.gender) {
  //     alert('you forgot to select your gender');
  //     return;
  //   }
  //   console.log('else happen')
  //   $scope.signUp();

  // };

  $scope.signUp = function() {

    customerFactory.signUp($scope.newUser)
      .then(function (response) {
        //hide error message, if displayed
        $scope.invalidSignup = false;

        optionsFactory.currentUser = response.currentUser;

        $window.localStorage.setItem('com.barhawk', response.token);

        //navigate to options page
        $state.go('options');
      })
      .catch(function (error) {
        //show user that they failed to signup successfully
        $scope.invalidSignup = true;
      });
  };

  $scope.logIn = function() {

    customerFactory.signIn($scope.loginAttempt)
      .then(function (response) {
        //hide error message, if displayed
        $scope.invalidLogIn = false;
        //persist logged in user
        optionsFactory.currentUser = response.currentUser;

        $window.localStorage.setItem('com.barhawk', response.token);
        //navigate to options page
        $state.go('options');
      })
      .catch(function (error) {
        //display invalid login message
        $scope.invalidLogIn = true;
      });
  };
})

.factory('customerFactory', function ($http, $window) {
  var signIn = function (loginAttempt) {

    return $http({
        method: "POST",
        url: '/api/users/login',
        data: loginAttempt
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var signUp = function (userInfo) {
    console.log('we are inside signUP HTTP');
    return $http({
        method: "POST",
        url: '/api/users/signup',
        data: userInfo
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var isAuth = function () {
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

});

angular.module('asyncdrink.customerAuth', [])

.controller('customerController', function ($scope, $state, $window, customerFactory, optionsFactory) {
  //newUser obj will hold all sign up inputs and set drinkCount to 0
  $scope.newUser = {
    drinkCount: 0,
    totalPrice: 0
  };
  //dummy data for easy submit
  // $scope.newUser.username= 'Beyonce';
  // $scope.newUser.password = "pass";
  // $scope.newUser.age = 27;
  // $scope.newUser.weight = 160;

  $scope.loginAttempt = {};

  $scope.invalidLogIn = false;

  $scope.clear = function () {
    $scope.invalidLogIn = false;
  };

  $scope.genderValidate = function() {
    console.log($scope.newUser);
    if (!$scope.newUser.gender) {
        alert('invalid');
    }
  }
    
    
    // $scope.choices = [{"id":1, "value":"1", "label":"Good"}, {"id":2, "value":"2","label":"Ok"},{"id":3, "value":"3","label":"Bad"}];
    // $scope.value = [];
    // $scope.updateQuestionValue = function(choice){
    //   console.log('john is here')
    //     $scope.value = $scope.value || [];
    //     if(choice.checked){
    //         $scope.value.push(choice.value);
    //         $scope.value = _.uniq($scope.value);
    //     }else{
    //         $scope.value = _.without($scope.value, choice.value);
    //     }
    // };


  $scope.signUp = function () {
    console.log('anything here????')
    // var reader = new FileReader();
            
    //         reader.onload = function (e) {
    //             $('#blah').attr('src', e.target.result);
    //         }
            
    //         reader.readAsDataURL(input.files[0]);
    //     }
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

  $scope.logIn = function () {
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
    .then(function(resp){
      return resp.data;
    })
  };

  var signUp = function (userInfo) {
    return $http({
      method: "POST",
      url: '/api/users/signup',
      data: userInfo
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var isAuth = function(){
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

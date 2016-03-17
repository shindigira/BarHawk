describe('customerController', function () {
  var $scope;
  var $rootScope;
  var $state;
  var $window;
  var customerFactory;
  var optionsFactory;

  beforeEach(module('asyncdrink'));

  beforeEach(inject(function ($injector) {
    // mock out dependencies
    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    $window = $injector.get('$window');
    customerFactory = $injector.get('customerFactory');
    optionsFactory = $injector.get('optionsFactory');
    var $controller = $injector.get('$controller');
    $scope = $rootScope.$new();

    createController = function () {
      return $controller('customerController', {
        $scope: $scope,
        $state: $state,
        $window: $window,
        customerFactory: customerFactory,
        optionsFactory: optionsFactory
      });
    };
    createController();
  }));

  it('should have a newUser property on the $scope', function () {
    expect($scope.newUser).toEqual(jasmine.any(Object));
  });

  it('should have a loginAttempt property on the $scope', function () {
    expect($scope.loginAttempt).toEqual(jasmine.any(Object));
  });

  it('should have an invalidLogin property set to false', function () {
    expect($scope.invalidLogIn).toEqual(false);
  });

  it('should have a clear function', function () {
    expect($scope.clear).toEqual(jasmine.any(Function));
  })

  it('should have a signUp function', function () {
    expect($scope.signUp).toEqual(jasmine.any(Function));
  })

  it('should have a logIn function', function () {
    expect($scope.logIn).toEqual(jasmine.any(Function));
  })

});
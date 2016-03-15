describe("this testing suite", function () {
  it("should show that true is true", function () {
    expect(true).toEqual(true);
  })
  it("should show that false is not true", function () {
    expect(false).not.toBe(true);
  })
});

describe('customerController', function () {
  var $scope;
  var $state; 
  var $window; 
  var customerFactory;
  var optionsFactory;

  beforeEach(module('asyncdrink'));

  
  // beforeEach(inject(function ($injector) {
  //   //mock out dependencies
  //   $state = $injector.get('$state');
  //   $window = $injector.get('$window');
  //   customerFactory = $injector.get('customerFactory');
  //   optionsFactory = $injector.get('optionsFactory');
  //   $scope = $rootScope.$new();
  //   var $controller = $injector.get('$controller');

  //   createController = function () {
  //     return $controller('customerController', {
  //       $scope: $scope,
  //       $state: $state,
  //       $window: $window,
  //       customerFactory: customerFactory,
  //       optionsFactory: optionsFactory
  //     });
  //   };
  //   createController();
  // }));

  // it('should have a newUser property on the $scope', function () {
  //   expect($scope.newUser).to.be.an('object');
  // });

  // it('should have a loginAttempt property on the $scope', function () {
  //   expect($scope.loginAttempt).to.be.an('object');
  // });

  // it('should have an invalidLogin property set to false', function () {
  //   expect($scope.invalidLogin).to.be(false);
  // });

})
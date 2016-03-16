describe('BarAuthController', function () {
  var $scope;
  var $rootScope;
  var $window;
  var $location;
  var BarAuthFactory;
  var optionsFactory;

  beforeEach(module('asyncdrink'));

  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $window = $injector.get('$window');
    BarAuthFactory = $injector.get('BarAuthFactory');
    optionsFactory = $injector.get('optionsFactory');
    var $controller = $injector.get('$controller');
    $scope = $rootScope.$new();

    createController = function () {
      return $controller('BarAuthController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        BarAuthFactory: BarAuthFactory,
        optionsFactory: optionsFactory
      });
    };
    createController();
  }));

  it('should have a barLogin function', function () {
    expect($scope.barLogin).toEqual(jasmine.any(Function));
  });
});
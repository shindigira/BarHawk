describe('BarQueueController', function () {

  var $scope;
  var $rootScope;
  var $window;
  var $state;
  var OrdersFactory;
  var optionsFactory;

  beforeEach(module('asyncdrink'));

  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $state = $injector.get('$state');
    $window = $injector.get('$window');
    optionsFactory = $injector.get('optionsFactory');
    OrdersFactory = $injector.get('OrdersFactory');
    var $controller = $injector.get('$controller');
    $scope = $rootScope.$new();

    createController = function () {
      return $controller('BarQueueController', {

        $scope: $scope,
        $window: $window,
        $state: $state,
        optionsFactory: optionsFactory,
        OrdersFactory: OrdersFactory
      });
    };
    createController();
  }));

  it('should have a bartenderLogout function', function () {
    expect($scope.bartenderLogout).toEqual(jasmine.any(Function));
  });

  it('should have a getOrders function', function () {
    expect($scope.getOrders).toEqual(jasmine.any(Function));
  });

  it('should have a dequeue function', function () {
    expect($scope.dequeue).toEqual(jasmine.any(Function));
  });

});
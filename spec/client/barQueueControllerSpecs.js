describe('BarQueueController', function() {

    var $scope;
    var $rootScope;
    var $window;
    var $state;
    var OrdersFactory;
    var optionsFactory;

    beforeEach(module('asyncdrink'));

    beforeEach(inject(function($injector) {

        $rootScope = $injector.get('$rootScope');
        $state = $injector.get('$state');
        $window = $injector.get('$window');
        optionsFactory = $injector.get('optionsFactory');
        OrdersFactory = $injector.get('OrdersFactory');
        var $controller = $injector.get('$controller');
        $scope = $rootScope.$new();

        createController = function() {
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

    it('should have a bartenderLogout function', function() {
        expect($scope.bartenderLogout).toEqual(jasmine.any(Function));
    });

    it('should have a data object as a property', function() {
        expect($scope.data).toEqual(jasmine.any(Object));
    });

    it('should have a completeOrder function', function() {
        expect($scope.completeOrder).toEqual(jasmine.any(Function));
    });

});
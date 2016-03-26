angular.module('asyncdrink', ['ui.router', 'asyncdrink.customerAuth',
    'asyncdrink.options', 'asyncdrink.barAuth', 'asyncdrink.barQueue', 'asyncdrink.statistics', 'chart.js'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('customerSignup', {
            url: "/signup",
            templateUrl: "/app/auth/customer/customerSignup.html",
            controller: 'customerController'
        })
        .state('options', {
            url: "/options",
            templateUrl: "/app/customer/options.html",
            controller: 'optionsController',
            authenticate: true
        })
        .state('barSignin', {
            url: '/barsignin',
            templateUrl: '/app/auth/bar/barSignin.html',
            controller: 'BarAuthController'
        })
        .state('barQueue', {
            url: '/barqueue',
            templateUrl: '/app/bartender/barQueue.html',
            controller: 'BarQueueController',
            authenticate: true
        })
        .state('customerLogin', {
            url: "/login",
            templateUrl: "/app/auth/customer/customerSignin.html",
            controller: 'customerController'
        })
        .state('statistics', {
            url: "/stats",
            templateUrl: "/app/customer/statistics.html",
            controller: 'statsController',
            authenticate: true

        });

    //Inject the AttachTokens factory into $http's interceceptors array so
    //all outgoing requests are stopped and AttachTokens runs on every
    //ajax call, similar to how middleware works on incoming server-side requests.
    $httpProvider.interceptors.push('AttachTokens');
})

//Attach a jwt token to the request headers so the server can validate the request
//if no token exists, server won't be able to validate.
//Also allow for CORS in headers.
.factory('AttachTokens', function($window) {
    var attach = {
        request: function(object) {
            var jwt = $window.localStorage.getItem('com.barhawk');
            if (jwt) {
                object.headers['x-access-tokens'] = jwt;
            }
            object.headers['Allow-Control-Allow-Origin'] = '*';
            return object;
        }
    };

    return attach;
})

//Listener for changing routes, check user's token, if user does not have a valid token then redirect to customer login
.run(function($rootScope, $state, $window, customerFactory, optionsFactory) {

    //if refresh or manually enter URL, localStorage remembers currentUser as long as they haven't logged out
    optionsFactory.currentUser = JSON.parse($window.localStorage.getItem('com.barhawk.currentUser'));

    //when state change detected, make sure user has the correct token stored to access states that require auth
    $rootScope.$on('$stateChangeStart', function(evt, next, current) {

        if (next.url && next.authenticate && !customerFactory.isAuth()) {
            evt.preventDefault();
            $state.go('customerLogin');
        }
    });
});
var testServer = require('../../server/server.js');
var barqueueController = require('../../server/barqueue/barqueueController.js');

describe('Server', function(){
  // beforeAll(function(){
  //   testServer ;
  // });

  // afterAll(function(){
  //   console.log('xxx this is test server: ', testServer);
  //   testServer.close();
  // });

  describe('barqueueController', function(){
    
    describe('showPendingOrders', function(){

      it('should be a function', function(){
        expect(typeof barqueueController.showPendingOrders).toBe('function');
      });
    });
  });
});
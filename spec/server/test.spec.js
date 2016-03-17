var app = require('../../server/server.js');
var barqueueController = require('../../server/barqueue/barqueueController.js');

describe('Server', function(){
  beforeAll(function(done){
    this.server = app.listen(3001, function(){
      console.log('server now listening on 3001');
      done();
    });
  });

  afterAll(function(done){
    this.server.close(function(){
      console.log('the server is now closed');
      done();
    });

  });

  describe('barqueueController', function(){
    
    describe('showPendingOrders', function(){

      it('should be a function', function(done){
        expect(typeof barqueueController.showPendingOrders).toBe('function');
          done();
      });
    });
  });
});
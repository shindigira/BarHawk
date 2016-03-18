var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../server/server.js');

describe('Server', function(){

  before(function(done){
    this.server = app.listen(3001, function(){
      console.log('test server is now listening on port 3001');
      done();
    });
  });

  after(function(done){
    this.server.close(function(){
      console.log('test server is now closed');
      done();
    });
  });

  describe('barqueueController', function(){

    describe('showPendingOrders', function(){


//       it('should be a function', function(done){
//         expect(typeof barqueueController.showPendingOrders).toBe('function');
//           done();
//       });
//     });
//   });
// });

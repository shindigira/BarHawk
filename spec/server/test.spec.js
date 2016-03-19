var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../server/server.js');

var randomNum = Math.floor(Math.random() * 1001);
var randomNumAsString = randomNum.toString();
var testUser = 'testuser' + randomNumAsString;
var testUser2 = testUser + '2';

var fakeCustomerSignup = {
  drinkCount: 0,
  totalPrice: 0,
  firstname: 'test',
  lastname: 'test',
  username: testUser,
  password: 'testpassword',
  phonenumber: 5059342914,
  photo: null,
  age: 45,
  weight: 150,
  gender: 'female'
};

var fakeCustomerLogin = {
  username: fakeCustomerSignup.username,
  password: fakeCustomerSignup.password
};

var fakeBarLogin = {
  username: 'baradmin',
  password: 'barpassword'
};

var fakeOrderToBeRemoved = {
  id: 1,
  username: testUser,
  drinktype: 'Chardonnay',
  createdAt: '2016-03-17 14:36:51.958-07',
  closeout: 'f',
  currentprice: 9,
  totalprice: 30,
  drinkcount: 1,
};

var fakeOrder = {
  username: testUser,
  BAC: 0.16,
  drinkType: 'Merlot'
};

var fakeOrder2 = {
  username: testUser2,
  BAC: 0.16,
  drinkType: 'Merlot'
};

var invalidCloseTab = {
  username: testUser,
  BAC: 0.16,
  drinkType: null
};

var fakeTextMessDetails = {
  customerName: 'champagnepapi2',
  customerDrinkType: 'Chardonnay',
  customerCloseout: false
};

var faultyTextMessDetails = {
  customerName: 'nonExistentUser',
  customerDrinkType: 'Chardonnay',
  customerCloseour: false
}

describe('Testing Suite', function () {

  it('Passes true tests', function (done) {
    expect(true).to.equal(true);
    done();
  });

  it('Fails false tests', function (done) {
    expect(2 + 2).to.not.equal(5);
    done();
  });
});

  describe('Customer Routes', function () {

    describe('Signing up: POST to /api/customers/signup', function () {

      it('should return 200, currentUser, and token', function (done) {
        request(app)
          .post('/api/customers/signup')
          .send(fakeCustomerSignup)
          .expect(200)
          .end(function (err, res) {
            expect(res.body).to.have.property('currentUser');
            expect(res.body).to.have.property('token');
            expect(res.body).to.not.have.property('notAProperty');
            done();
          })
      });

      it('should return 401 if user already signed up', function (done) {
        request(app)
          .post('/api/customers/signup')
          .send(fakeCustomerSignup)
          .expect(401, done)
      })
    });

    describe('Logging in: POST to /api/customers/login', function () {

      it('should return 401 if no user sent', function (done) {
        request(app)
          .post('/api/customers/login')
          .send({})
          .expect(401, done)
      });

      it('should return 200 if user sent', function (done) {
        request(app)
          .post('/api/cusotmers/login')
          .send(fakeCustomerLogin)
          .end(function (err, res) {
            done();
          });
      });
    });
  });

  describe('Menu Routes', function () {

    describe('Show Drinks: GET to /api/menu/drinks', function () {

      it('should return 200 upon successful query of drinks table in db', function (done) {
        request(app)
          .get('/api/menu/drinks')
          .expect(200, done);
      });

      it('should return an array of menu items', function (done) {
        request(app)
          .get('/api/menu/drinks')
          .end(function (err, res) {
            expect(res.body).to.have.length.above(0);
            done();
          });
      });
    });

    describe('Ordering Drink Only: POST to /api/menu/order', function () {

      it('should return 200 for successful order', function (done) {
        request(app)
          .post('/api/menu/order')
          .send(fakeOrder)
          .expect(200, done);
      });

      it('should return the user order with properties currentprice, totalprice, drinkcount, bac, and closeout', function (done) {
        request(app)
          .post('/api/menu/order')
          .send(fakeOrder)
          .end(function (err, res) {
            expect(res.body).to.have.property('currentprice');
            expect(res.body).to.have.property('totalprice');
            expect(res.body).to.have.property('totalprice');
            expect(res.body).to.have.property('drinkcount');
            expect(res.body).to.have.property('bac');
            expect(res.body).to.have.property('closeout');
            done();
          });
      });

      it('should return 400 if drinkType not specified', function(done){
        request(app)
          .post('/api/menu/order')
          .send({})
          .expect(400, done);
      });
    });
    describe('Closing tab only: POST to /api/menu/closetab', function(){

      it('should return receipt details', function(done){
        request(app)
          .post('/api/menu/closetab')
          .send(fakeOrder)
          .end(function(err, res){
            expect(200);
            expect(res.body.closeout).to.equal(true);
            expect(res.body).to.have.property('totalprice');
            expect(res.body).to.have.property('drinkcount');
            done();
          });
      });    

      it('should return 400 if customer didn\'t order a drink', function(done){
        request(app)
          .post('/api/menu/closetab')
          .send(invalidCloseTab)
          .expect(400, done);
      });
    });

    describe('Ordering drink and closing tab: POST to /api/menu/orderandclosetab', function(){

      it('should return 200 and receipt details', function(done){
        request(app)
          .post('/api/menu/orderandclosetab')
          .send(fakeOrder)
          .end(function(err, res){
            expect(200);
            expect(res.body.closeout).to.equal(true);
            expect(res.body).to.have.property('totalprice');
            expect(res.body).to.have.property('drinkcount');
            done();
          })
      })
    })
  });

  describe('Bar Queue Routes', function () {

    describe('Showing pending orders: POST to /api/barqueue/showPendingOrders', function () {

      it('should return 200 to logged in bartender', function (done) {
        request(app)
          .post('/api/barqueue/showPendingOrders')
          .send(fakeBarLogin)
          .expect(200, done);
      });

      it('should return 401 to non-bartenders', function (done) {
        request(app)
          .post('/api/barqueue/showPendingOrders')
          .send(fakeCustomerLogin)
          .expect(401, done);
      });
    });

    describe('Completing orders: POST to /api/barqueue/completeOrder', function () {

      it('should return 200 when orders table updated', function (done) {
        request(app)
          .post('/api/barqueue/completeOrder')
          .send(fakeOrderToBeRemoved)
          .expect(200, done);
      });

      it('should return 404 if orders table not updated', function (done) {
        request(app)
          .post('/api/barqueue/completeOrder')
          .send({})
          .expect(404, done);
      });
    });

    describe('Text messages when order ready: POST to /api/barqueue/orderCompleteTextMessage', function () {

      it('should return 200 after text sent', function (done) {
        request(app)
          .post('/api/barqueue/orderCompleteTextMessage')
          .send(fakeTextMessDetails)
          .expect(200, done);
      });

      it('should return 401 if text not sent', function (done) {
        request(app)
          .post('/api/barqueue/orderCompleteTextMessage')
          .send(faultyTextMessDetails)
          .expect(404, done);
      });
    });


  });

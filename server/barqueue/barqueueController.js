var accountSid = 'AC6d9b063b61c76d9588fb5d9df7bb845a';
var authToken = 'fa527f9341b3fef301c01b4db35ae87e';
var client = require('twilio')(accountSid, authToken);
var models = require('../models')
var db = require('../models/index.js')

//dummy orders table
var ordersArray = [{
  username: 'zeebow',
  drinkType: 'beer',
  time: 'Tue Mar 08 2016 16:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 60,
  drinkCount: 1,
  showInQueue: true
}, {
  username: "Nadine",
  drinkType: "beer",
  time: 'Tue Mar 08 2016 17:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 100,
  drinkCount: 4,
  showInQueue: true
}, {
  username: "Collin",
  drinkType: "wine",
  time: 'Tue Mar 08 2016 18:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 15,
  drinkCount: 8,
  showInQueue: true
}];

module.exports = {

  showPendingOrders: function (req, res) {
    if (req.body.username === 'baradmin' && req.body.password === 'barpassword') {
      //only send back to bar queue those orders which have not yet been completed
      db.sequelize.query("Select * from orders where completed = 'f';")
      .then( function(pendingOrder){
        res.status(200);
        res.send(pendingOrder[0]);
      })

    } else {
      res.status(401).send();
    }
  },

  completeOrder: function (req, res) {
    //Search ordersArray for order object that matches time and username properties of completedOrder object in req.body.
    //This protects against edge case of modifying more than one order object in ordersArray.
    ordersArray
      .filter(function (order) {
        return (req.body.time === order.time && req.body.username === order.username);
      })
      //Set showInQueue property to false for the completedOrder
      .map(function (completedOrder) {
        completedOrder.showInQueue = false;
      });

    res.sendStatus(200);
  },

  orderCompleteTextMessage: function (req, res) {
    console.log(req.body);
    var toPhoneNum = req.body.customerPhoneNum;
    var customerName = req.body.customerName;
    var drinkType = req.body.customerDrinkType;

    client.messages.create({
      to: '+1' + toPhoneNum,
      from: '+15104557842',
      body: 'hey ' + customerName + ', your ' + drinkType + ' is ready.'
    }, function (err, message) {
      if (err) {
        console.log(err);
      } else {
        console.log(message);
        res.end();
      }
    });
  }
};

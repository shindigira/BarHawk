var accountSid = 'AC68614f28addcc82ca25a94fa00c12e18';
var authToken = '6eb7ad33bde4db24242e898205bc9a8a';
var client = require('twilio')(accountSid, authToken);
var models = require('../models');
var db = require('../models/index.js');
var moment = require("moment");


module.exports = {

  showPendingOrders: function(req, res) {
    if (req.body.username === 'baradmin' && req.body.password === 'barpassword') {
      //only send back to bar queue those orders which have not yet been completed
      db.sequelize.query("Select * from orders where completed = 'f';")
        .then(function(pendingOrder) {
          for (var i = 0; i < pendingOrder[0].length; i++) {
            pendingOrder[0][i].createdAt = moment(pendingOrder[0][i].createdAt).fromNow();
          }
          res.status(200);
          res.send(pendingOrder[0]);
        })

    } else {
      res.status(401).send();
    }
  },

  showAllLoggedInUser: function(req, res) {

    db.sequelize.query("Select * from users;")
      .then(function(users) {

        for(var i = 0; i < users[0].length;  i++){
             client.messages.create({
          to: '+1' + users[0][i].phone,
          from: '+15754485544',
          body: "the bar is closing soon. hurry up and finish your business"
        }, function(err, message) {
          if (err) {
            console.log(err);
          } else {
            console.log(message);
            res.end();
          }
        });
        }
      })
  },

    cancelOrder: function(req, res) {

        db.sequelize.query("Delete from orders where orders.id = '" + req.body.id + "';")
            .then(function(deletedOrder) {
                res.sendStatus(200);
            })
            .catch(function(err) {
                res.sendStatus(404);
            })
    },

   
  getTaxi:function(){
    //Below is the texting function to text a taxi
    // client.messages.create({
    //       to: '+1619777222',
    //       from: '+15754485544',
    //       body: "a taxi is coming to the bar"
    //     }, function(err, message) {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log(message);
    //         res.end();
    //       }
    //     });

  },

  completeOrder: function(req, res) {

    db.sequelize.query("Update orders set completed = 't' where id = '" + req.body.id + "';")

    .then(function(orderToBeCompleted) {
      res.sendStatus(200);
    })

    .catch(function(err) {
      res.sendStatus(404);
    })

  },

  orderCompleteTextMessage: function(req, res) {
    var customerName = req.body.customerName;
    var drinkType = req.body.customerDrinkType;
    var closeout = req.body.customerCloseout;
    var toPhoneNum;

    var messageBody;

    db.sequelize.query("Select firstname, phone from users where username = '" + customerName + "';")
      .then(function(targetPhoneNum) {
        messageBody = 'Hey ' + targetPhoneNum[0]['0'].firstname + ', ';
        if (!(drinkType)) {
          messageBody += 'your check is ready to be picked up and paid at the bar. Thank you!'
        } else if (closeout === true) {
          messageBody += 'your ' + drinkType + ' and check are ready to be picked up at the bar. Thank you and enjoy!'
        } else if (closeout === false) {
          messageBody += 'your ' + drinkType + ' is ready to be picked up at the bar. Enjoy!'
        }

        client.messages.create({
          to: '+1' + targetPhoneNum[0]['0'].phone,
          from: '+15754485544',
          body: messageBody
        }, function(err, message) {
          if (err) {
            console.log(err);
          } else {
            console.log(message);
            res.end();
          }
        });
      })
      .catch(function(err) {
        res.sendStatus(404);
      });
  }
};

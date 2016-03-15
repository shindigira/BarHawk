var models = require('../models');
var db = require('../models/index.js');

module.exports = {

  // closeTab: function(req, res){

  // },

  order: function (req, res) {
    //assigning drink order to variable
    var ord = req.body;
    if (!ord.drinkType) {
      res.sendStatus(400);
    } else {
      var DK;
      var drinkPrice;
      var currentTab;
      //finding price associated with drink name in drinks table of DB
      models.drinks.findOne({ where: { name: ord.drinkType } }).then(function (drink) {
        drinkPrice = drink.dataValues.price;
      }).then(function () {
        models.orders.findAll({
          where: ["username = ?", ord.username],
          attributes: [
            [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'drinkCount'],
            [db.sequelize.fn('SUM', db.sequelize.col('currentprice')), 'userTab']
          ]
        }).then(function (results) {
          var userData = results[0].dataValues;

          models.orders.create({
            username: ord.username,
            drinktype: ord.drinkType,
            closeout: ord.closeout,
            currentprice: drinkPrice,
            totalprice: userData.userTab,
            drinkcount: userData.drinkCount
          }).then(function (userorder) {
            console.dir("SOMETHING THIS DOES", userorder.get());
            res.json(userorder);
          });
        });
      })
    }
  },

  // order: function (req, res) {
  //   //assigning drink order to varible
  //   var ord = req.body;
  //   //if no username or drink was not specified, throw err
  //   if (ord.username === undefined || ord.drinkType === undefined) {
  //     res.sendStatus(400);
  //   } else {
  //     //increment user's drinkCount
  //     users[ord.username].drinkCount++;
  //     //recalculate user's tab
  //     users[ord.username].totalPrice += ord.currentPrice;
  //     //prepare order with pertinent user information for bar queue
  //     var newOrder = {
  //       username: ord.username,
  //       drinkType: ord.drinkType,
  //       time: ord.time,
  //       closeout: ord.closeout,
  //       currentPrice: ord.currentPrice,
  //       totalPrice: users[ord.username].totalPrice,
  //       drinkCount: users[ord.username].drinkCount
  //     };
  //     //push order to bar queue
  //     ordersArray.push(newOrder);
  //     res.sendStatus(200);
  //   }
  // },

  orderAndCloseTab: function (req, res) {
    //assigning drink order to varible
    var ord = req.body;
    //if no username or drink was not specified, throw err
    if (ord.username === undefined || ord.drinkType === undefined) {
      res.sendStatus(400);
    } else {
      //increment user's drinkCount
      users[ord.username].drinkCount++;
      //recalculate user's tab
      users[ord.username].totalPrice = users[ord.username].totalPrice + drinkPrices[ord.drinkType];

      //prepare order with pertinent user information for bar queue
      var newOrder = {
        username: ord.username,
        drinkType: ord.drinkType,
        time: ord.time,
        closeout: ord.closeout,
        currentPrice: drinkPrices[ord.drinkType],
        totalPrice: users[ord.username].totalPrice,
        drinkCount: users[ord.username].drinkCount
      };
      //push order to bar queue
      ordersArray.push(newOrder);
      //prepare user's final tab
      var userTab = {
        drinkCount: users[ord.username].drinkCount,
        tabTotal: users[ord.username].totalPrice
      }
      res.json(userTab);
      //res.sendStatus(200);
    }
  }
};

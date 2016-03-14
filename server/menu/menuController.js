var models = require('../models');

//dummy users table
var users = {
  Michael: {
    username: 'Michael',
    password: "password",
    age: 25,
    weight: 160,
    gender: "Male",
    drinkCount: 0,
    totalPrice: 0
  }
};

//dummy drinks table
var drinkPrices = {
  AnchorSteam: 5,
  Heineken: 7,
  SamAdams: 7,
  CoronaExtra: 7,
  CoronaLight: 7,
  MillerLight: 7,
  Budweiser: 4,
  BudLight: 4,
  Guiness: 8,
  Merlot: 10,
  Chardonnay: 9,
  Champagne: 8,
  LongIslandIcedTea: 10,
  GinTonic: 10,
  Mojito: 14,
  RedBullVodka: 12,
  Cosmo: 11,
  Whiskey: 9,
  VodkaSoda: 13,
  WhiteRussian: 15
};

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

  // closeTab: function(req, res){

  // },

  order: function (req, res) {
    //assigning drink order to variable
    var ord = req.body;
    var ordUser = ord.username;
    if (!ord.drinkType) {
      res.sendStatus(400);
    } else {
      //console.log("-----(server.js /api/customer.order) ord: ", ord);
      var currentUsername = ord.username.username;
      var DK;
      var drinkPriceFromDB;
      //finding price associated with drink name in drinks table of DB
      models.drinks.findOne({ where: { name: ord.drinkType } }).then(function (drink) {
        drinkPriceFromDB = drink.dataValues.price;
      }).then(function () {
        models.orders.count({
          where: ["username = ?", currentUsername]
        }).then(function (drinkcount) {
          DK = drinkcount;
          models.orders.create({
            username: currentUsername,
            drinktype: ord.drinkType,
            closeout: ord.closeout,
            currentprice: drinkPriceFromDB,
            totalprice: 5,
            drinkcount: DK
          }).then(function (userorder) {
            console.dir(userorder.get());
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

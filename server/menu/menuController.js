var models = require('../models');
var db = require('../models/index.js');

module.exports = {

  getDrinks: function (req, res) {
    db.sequelize.query('Select name, type, price, volume from drinks;')
      .then(function (drinks) {
        //return
        res.send(drinks[0]);
      })
      .catch(function (err) {
        res.sendStatus(404);
      })
  },

  closeTab: function (req, res) {
    var tab = req.body;
    //query user's past drinks
    models.orders.findAll({
      where: {
        username: tab.username,
        drinktype: {
          $not: null
        }
      },
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'drinkCount']
      ]
    }).then(function (result) {
      //if user has not ordered
      if (result[0].dataValues.drinkCount === 0) {
        res.sendStatus(400);
      } else {
        tab.drinkCount = result[0].dataValues.drinkCount
          //find user's last closeTab order
        models.orders.max('id', {
          where: {
            username: tab.username,
            closeout: true
          }
        }).then(function (lastClosedTab) {

          //if no closed tabs
          if (!lastClosedTab) {
            lastClosedTab = 0
          }
          models.orders.findAll({
            where: {
              username: tab.username,
              id: {
                $gt: lastClosedTab
              }
            },
            attributes: [
              [db.sequelize.fn('SUM', db.sequelize.col('currentprice')), 'tabTotal']
            ]
          }).then(function (userorders) {
            var receipt = userorders[0].dataValues
            if (!receipt.tabTotal) {
              res.sendStatus(400);
            } else {
              models.orders.create({
                username: tab.username,
                drinktype: null,
                closeout: true,
                currentprice: null,
                totalprice: receipt.tabTotal,
                drinkcount: tab.drinkCount
              }).then(function (closed) {
                res.json(closed.dataValues);
              })
            }
          })
        })
      }
    })
  },

  order: function (req, res) {
    //assigning drink order to varible
    var ord = req.body;

    if (!ord.drinkType) {
      res.sendStatus(400);
    } else {

      var drinkPrice;
      var currentTab;
      //finding price associated with drink name in drinks table of DB
      models.drinks.findOne({
          where: { name: ord.drinkType }
        })
        .then(function (drink) {
          drinkPrice = drink.dataValues.price;
        })
        .then(function () {
          //find all user orders for drinks count
          models.orders.findAll({
              where: { username: ord.username },
              attributes: [
                [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'drinkCount'],
                // [db.sequelize.fn('SUM', db.sequelize.col('currentprice')), 'userTab']
              ]
            })
            .then(function (results) {
              var userData = results[0].dataValues;
              //insert order into db
              models.orders.create({
                  username: ord.username,
                  drinktype: ord.drinkType,
                  closeout: false,
                  currentprice: drinkPrice,
                  totalprice: null,
                  drinkcount: userData.drinkCount,
                  bac: ord.BAC
                })
                .then(function (userorder) {
                  res.json(userorder.dataValues);
                });
            });
        })
    }
  },



  orderAndCloseTab: function (req, res) {
    //assigning drink order to variable
    var ord = req.body;
    var drinkPrice;
    var currentTab;

    if (!ord.drinkType) {
      res.sendStatus(400);
    } else {

      //finding price associated with drink name in drinks table of DB
      models.drinks.findOne({
        where: { name: ord.drinkType }
      }).then(function (drink) {
        //get current drink's price
        drinkPrice = drink.dataValues.price;
      }).then(function () {
        //get drink count
        models.orders.findAll({
          where: { username: ord.username },
          attributes: [
            [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'drinkCount']
          ]
        }).then(function (drinks) {
          var drinkCount = drinks[0].dataValues.drinkCount;

          //get id of user's last closeout order
          models.orders.max('id', {
            where: {
              username: ord.username,
              closeout: true
            }
          }).then(function (lastClosedTab) {

            if (!lastClosedTab) {
              lastClosedTab = 0;
            }
            //get current tab total
            models.orders.findAll({
              where: {
                username: ord.username,
                id: {
                  $gt: lastClosedTab
                }
              },
              attributes: [
                [db.sequelize.fn('SUM', db.sequelize.col('currentprice')), 'tabTotal']
              ]
            }).then(function (tabTotal) {
              //submit order
              var finalTab = tabTotal[0].dataValues.tabTotal;
              if (finalTab === null) {
                finalTab = 0;
              }
              models.orders.create({
                username: ord.username,
                drinktype: ord.drinkType,
                closeout: true,
                currentprice: drinkPrice,
                totalprice: finalTab + drinkPrice,
                drinkcount: drinkCount,
                bac: ord.BAC
              }).then(function (order) {
                res.json(order);
              })
            })
          })
        })
      })
    }
  }

};

var jwt = require('jwt-simple');
var models = require('../models');
var db = require('../models/index.js');
var bcrypt = require('bcrypt');

module.exports = {
  login: function (req, res) {
    //set username/password request to attempt variable
    var attempt = req.body;

    console.log(attempt);
    models.users.findOne({
      where: { username: attempt.username },
    }).then(function (result) {
      var hashedPassword = result.dataValues.password;
      //check attempted password with password saved in db
      bcrypt.compare(attempt.password, hashedPassword, function (err, success) {
        if (success) {
          var token = jwt.encode(attempt.username, 'barHawksecret444');
          res.json({
            currentUser: result,
            token: token
          });
        } else {
          res.sendStatus(401);
        }
      })
    }).catch(function (err) {
      res.sendStatus(401);
    })
  },

  signup: function (req, res) {
    //assigning drink order to variable
    var attempt = req.body;
    var hashedPW;
    //hash passwords
    bcrypt.hash(attempt.password, 10, function (err, hash) {
      hashedPW = hash;

      //find existing user (err) or create new (success)
      models.users.findOrCreate({
        where: { username: attempt.username },
        defaults: {
          firstname: attempt.firstname,
          lastname: attempt.lastname,
          password: hashedPW,
          age: attempt.age,
          weight: attempt.weight,
          gender: attempt.gender,
          photo: attempt.photo,
          phone: attempt.phonenumber
        }
      }).spread(function (user, created) {
        console.log("able to create new user " + attempt.username + "?", created);
        // //returns preexisting user
        var userObj = user.get({
          plain: false
        });
        if (created) {
          var token = jwt.encode(user, 'barHawksecret444');

          res.json({
            currentUser: attempt,
            token: token
          });
          //res.send(userObj);
        } else {
          res.sendStatus(401);
        }
      });
    });
  },

  drinkcount: function (req, res) {
    var user = req.body.username;
    var drinkCount;
    var lastOrder;
    //set current time
    var time = new Date();
    var now = new Date();
    //insert this into query of camel-case column
    var timeFulfilled = '"updatedAt"';
    //limit drinks to 12 hours ago
    time.setHours(time.getHours() - 12);
    //convert to compare with updatedAt column
    var tableTime = time.toISOString();

    //find drink count
    models.orders.findAll({
        where: {
          username: req.body.username,
          drinktype: {
            $not: null
          }
        },
        attributes: [
          [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'drinkCount'],
          [db.sequelize.fn('MAX', db.sequelize.col('id')), 'latestOrder']
        ]
      })
      .then(function (userdrinks) {
        //set drink count
        drinkCount = userdrinks[0].dataValues.drinkCount;
        lastOrder = userdrinks[0].dataValues.latestOrder;

        if (drinkCount === '0') {
          res.json({
            drinkcount: 0,
            BAC: '0.000'
          });
        } else {
          //find BAC
          db.sequelize.query("select orders.username, users.weight, users.gender, sum(drinks.alcohol) AS totalAlcohol, min(orders." + timeFulfilled + ") AS starttime from orders, users, drinks WHERE orders." + timeFulfilled + " > '" + tableTime + "' AND orders.username = '" + user + "' AND orders.username = users.username AND orders.drinktype = drinks.name group by orders.username, users.weight, users.gender;")
            .then(function (BACQuery) {
              //result will be single-row table of arguments for BAC formula (username, weight, gender, totalalcohol, starttime)
              var argumentsObj = BACQuery[0][0];

              var elapsedTime = (now - argumentsObj.starttime) / 1000 / 60 / 60;

              //gender constants
              var rObject = {
                  male: .68,
                  female: .55
                }
                //convert weight to grams
              var weightInGrams = function (weight) {
                return (argumentsObj.weight * 453.592);
              };
              //calculate BAC
              var unroundedBAC = (100 * ((argumentsObj.totalalcohol / (weightInGrams(argumentsObj.weight) * rObject[argumentsObj.gender])))) - (elapsedTime * .015);

              //round it
              var BAC = Math.round(unroundedBAC * 1000) / 1000;

              res.json({
                drinkcount: drinkCount,
                BAC: BAC
              });
            });
        }
      })
  }

};

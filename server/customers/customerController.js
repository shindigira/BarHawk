var jwt = require('jwt-simple');
var models = require('../models');
var db = require('../models/index.js');

module.exports = {
  login: function (req, res) {
    //set username/password request to attempt variable
    var attempt = req.body;
    models.users.findOne({
      where: { username: attempt.username }
    }).then(function (result) {
      if (result === null) {
        res.sendStatus(401)
      } else {
        if (attempt.password === result.dataValues.password) {
          var token = jwt.encode(attempt.username, 'barHawksecret444');
          res.json({
            currentUser: result,
            token: token
          });
        } else {
          res.sendStatus(401);
        }
      }
    });
  },

  signup: function (req, res) {
    //assigning drink order to variable
    var attempt = req.body;

    //find existing user (err) or create new (success)
    models.users.findOrCreate({
      where: { username: attempt.username },
      defaults: {
        firstname: attempt.firstname,
        lastname: attempt.lastname,
        password: attempt.password,
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
        console.log(attempt);
        res.json({
          currentUser: attempt,
          token: token
        });
        //res.send(userObj);
      } else {
        res.sendStatus(401);
      }
    });
  },

  drinkcount: function (req, res) {
    models.orders.findAll({
      where: {
        username: req.body.username,
        drinktype: {
          $not: null
        }
      },
      attributes: [
        [db.sequelize.fn('COUNT', db.sequelize.col('username')), 'drinkCount']
      ]
    })
    .then(function(userdrinks) {
      res.send(userdrinks[0].dataValues.drinkCount)
    })
  },

  getBAC: function(req, res) {
    var user = req.body.username;

    //set current time
    var time = new Date();

    //insert this into query of camel-case column
    var timeFulfilled = '"updatedAt"';
    //limit drinks to 12 hours ago
    time.setHours(time.getHours() - 12);
    //convert to compare with updatedAt column
    time = time.toISOString();
    //query username, weight, gender, total alcohol consumed (g), and earliest drink within last 12 hours
    db.sequelize.query("select orders.username, users.weight, users.gender, sum(drinks.alcohol) AS totalAlcohol, min(orders." + timeFulfilled + ") AS starttime from orders, users, drinks WHERE orders." + timeFulfilled + " > '" + time + "' AND orders.username = '" + user + "' AND orders.username = users.username AND orders.drinktype = drinks.name group by orders.username, users.weight, users.gender;")
    .then(function (result) {
      //result will be single-row table of arguments for BAC formula (username, weight, gender, totalalcohol, starttime)
      var argumentsObj = result[0][0];
      var elapsedTime = Math.floor((argumentsObj.starttime - time)/1000/60/60);
      //gender constants
      var rObject = {
        male: .68,
        female: .55
      }
      //convert weight to grams
      var weightInGrams = function(weight) {
        return (argumentsObj.weight * 453.592);
      };

      var BAC = (100 * ((argumentsObj.totalalcohol / (weightInGrams(argumentsObj.weight) * rObject[argumentObj.gender]) ) )) - (elapsedTime * .015);
      res.send(BAC);
    });
  }

};

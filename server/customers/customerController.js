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
    console.log(req.body);
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
  }

};

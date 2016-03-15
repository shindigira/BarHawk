var jwt = require('jwt-simple');
var models = require('../models');

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
              currentUser: attempt.username,
              token: token
            });
          } else {
            res.sendStatus(401);
          }
        }
      });
    },

    //the below is used with the PostgreSQL db
    // signup: function (req, res) {
    //   //assigning drink order to variable
    //   var ord = req.body;
    //   console.log('ord info', ord)


    //   models.users.findOrCreate({
    //     where: { username: ord.username },
    //     defaults: {
    //       password: ord.password,
    //       weight: ord.weight,
    //       gender: ord.gender,
    //       photo: ord.photo
    //     }
    //   }).spread(function (user, created) {
    //     console.log("able to create new user " + ord.username + "?", created);
    //     // //returns preexisting user
    //     var userObj = user.get({
    //       plain: false
    //     });
    //     if (created) {
    //       res.send(userObj);
    //     } else {
    //       res.sendStatus(401);
    //     }
    //   })
    // },

    signup: function (req, res) {
      //assigning drink order to variable
      var ord = req.body;

      models.users.findOrCreate({
        where: { username: ord.username },
        defaults: {
          firstname: ord.firstname,
          lastname: ord.lastname,
          password: ord.password,
          age: ord.age,
          weight: ord.weight,
          gender: ord.gender,
          photo: ord.photo,
          phone: ord.phonenumber
        }
      }).spread(function (user, created) {
        console.log("able to create new user " + ord.username + "?", created);
        // //returns preexisting user
        var userObj = user.get({
          plain: false
        });
        if (created) {
          users[ord.username] = ord;
          var token = jwt.encode(users[ord.username], 'barHawksecret444');
          res.json({
            currentUser: ord,
            token: token
          });
          //res.send(userObj);
        } else {
          res.sendStatus(401);
        }
      });
    }
  };

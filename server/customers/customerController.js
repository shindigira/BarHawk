var jwt = require('jwt-simple');

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

module.exports = {
  login: function (req, res) {
    //set username/password request to attempt variable
    var attempt = req.body;
    if (attempt.username in users) {
      if (users[attempt.username].password === attempt.password) {
        var token = jwt.encode(users[attempt.username], 'barHawksecret444');
        res.json({
          currentUser: users[attempt.username],
          token: token
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
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


  //the below is used with dummy db
  signup: function (req, res) {
    var data = req.body;
    if (data.username in users) {
      res.sendStatus(401);
    } else {
      users[data.username] = data;
      var token = jwt.encode(users[data.username], 'barHawksecret444');
      res.json({
        currentUser: data,
        token: token
      });
    }
  },


};
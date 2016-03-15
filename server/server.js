var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
// var db = require('./models/index.js');

require('./config/middleware.js')(app, express);

app.get('/api/users/signedin', function (req, res) {
  var token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).send();
  } else {
    var user = jwt.decode(token, 'barHawksecret444');
    if (user.username in users) {
      res.status(200).send;
    } else {
      res.status(401).send;
    }
  }
});

app.get('/api/customer/drink', function (req, res) {
  //get all drinks from drinks table
  db.sequelize.query('Select name, type, price, volume from drinks;')
  .then(function (drinks) {
    //return
    res.send(drinks[0]);
  })
});


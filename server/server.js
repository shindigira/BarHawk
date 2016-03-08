var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//simple check to see if deployed successfully
/*app.get('/', function(req, res) {
  res.send('Hello world!');
});*/

app.listen(port, function() {
  console.log('Server now listening on port ' + port);
});

var users = {
  Michael: {
    password: "password",
    age: '25',
    weight: 160,
    gender: "Male",
    drinkCount: 0,
    totalPrice: 0
  }
};

app.post('/api/users/signup', function(req, res) {
  console.log("user info", req.body);
  var data = req.body;
  if (data.username in users) {
    res.sendStatus(401);
  } else {
    users[data.username] = data;
    console.log("all users", users);
    res.sendStatus(200);
  }

});

var ordersArray = [{
  username: 'zeebow',
  drinkType: 'beer',
  time: '9:00pm',
  closeout: false,
  currentPrice: 5,
  totalPrice: 60
}];
app.post('/api/customer/order', function(req, res) {
  var ord = req.body;
  if (ord.username === undefined || ord.drinkType === undefined) {
    res.sendStatus(400);
  } else {
    users[ord.username].drinkCount++;
    users[ord.username].totalPrice += ord.currentPrice;
    var newOrder = {
      username: ord.username,
      drinkType: ord.drinkType,
      time: ord.time,
      closeout: ord.closeout,
      currentPrice: ord.currentPrice,
      totalPrice: users[ord.username].totalPrice,
      drinkCount: users[ord.username].drinkCount
    };
    ordersArray.push(newOrder);
    res.sendStatus(200);
  }
});

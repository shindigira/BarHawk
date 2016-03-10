var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storedBarLogin = {
  username: 'admin',
  password: 'fancypants'
};

app.post('/api/barUsers/barSignin', function (req, res, next) {
  var attemptedBarUsername = req.body.barUsername;
  var attemptedBarPassword = req.body.barPassword;
  if (attemptedBarUsername === storedBarLogin.username && attemptedBarPassword === storedBarLogin.password) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

//send the list of all orders to client

app.get('/api/barUsers/barQueue', function (req, res) {
  res.status = 200;
  res.send(ordersArray);
});

app.listen(port, function () {
  console.log('Server now listening on port ' + port);
});

//userbase dummy data
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

app.post('/api/users/signup', function (req, res) {
  var data = req.body;
  if (data.username in users) {
    res.sendStatus(401);
  } else {
    users[data.username] = data;
    res.sendStatus(200);
  }

});

app.post('/api/users/login', function (req, res) {
  //set username/password request to attempt variable
  var attempt = req.body;
  if (attempt.username in users) {
    if (users[attempt.username].password === attempt.password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
});

//barQueue dummy data
var ordersArray = [{
  username: 'zeebow',
  drinkType: 'beer',
  time: 'Tue Mar 08 2016 16:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 60
}, {
  username: "Nadine",
  drinkType: "beer",
  time: 'Tue Mar 08 2016 17:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 100,
  drinkCount: 4
}, {
  username: "Collin",
  drinkType: "wine",
  time: 'Tue Mar 08 2016 18:24:37 GMT-0800 (PST)',
  closeout: false,
  currentPrice: 5,
  totalPrice: 15,
  drinkCount: 8
}];

//drink info dummy data
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

app.post('/api/customer/order', function (req, res) {
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
      //pull price of current drink from dummy data in drinkPrices
      currentPrice: drinkPrices[ord.drinkType],
      totalPrice: users[ord.username].totalPrice,
      drinkCount: users[ord.username].drinkCount
    };
    //push order to bar queue
    ordersArray.push(newOrder);
    res.sendStatus(200);
  }
});


app.post('/api/barUsers/barQueue/dequeue', function (req, res) {
  ordersArray.splice(req.body.orderToBeDequeued, 1);
  res.sendStatus(200);
});

app.post('/api/customer/order/close', function (req, res) {
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
});

app.post('/api/customer/closetab', function (req, res) {
  var ord = req.body;

  //if not logged in
  if (ord.username === undefined) {
    res.sendStatus(401);
  }
  //if hasn't ordered a drink yet
  else if(users[ord.username].drinkCount === 0) {
    res.sendStatus(400);
  }
   else {
    //prepare order
    var newOrder = {
      username: ord.username,
      drinkType: ord.drinkType,
      time: ord.time,
      closeout: ord.closeout,
      currentPrice: ord.currentPrice,
      totalPrice: users[ord.username].totalPrice,
      drinkCount: users[ord.username].drinkCount
    };
    //push to bar queue
    ordersArray.push(newOrder);
    //prepare user's final tab
    var userTab = {
      drinkCount: users[ord.username].drinkCount,
      tabTotal: users[ord.username].totalPrice
    }
    res.json(userTab);
  }
});

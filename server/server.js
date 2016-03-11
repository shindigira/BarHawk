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
  //only send back to bar queue those orders which have not yet been completed
  var pendingOrders = ordersArray.filter(function (order) {
    return order.showInQueue;
  });
  res.send(pendingOrders);
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

app.get('/api/users/signedin', function(req, res){
  var token = req.headers['x-access-token'];
  if(!token){
    res.status(401).send();
  }else{
    var user = jwt.decode(token, 'barHawksecret444');
    if(user.username in users){
      res.status(200).send;
    }else{
      res.status(401).send;
    }
  }
})

app.post('/api/users/login', function (req, res) {
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
});

//barQueue dummy data
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
      drinkCount: users[ord.username].drinkCount,
      showInQueue: true
    };
    //push order to bar queue
    ordersArray.push(newOrder);
    res.sendStatus(200);
  }
});


app.post('/api/barUsers/barQueue/dequeue', function (req, res) {
  //Search ordersArray for order object that matches time and username properties of completedOrder object in req.body.
  //This protects against edge case of modifying more than one order object in ordersArray.
  ordersArray
    .filter(function (order) {
      return (req.body.time === order.time && req.body.username === order.username);
    })
    //Set showInQueue property to false for the completedOrder
    .map(function (completedOrder) {
      completedOrder.showInQueue = false;
    });

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
  else if (users[ord.username].drinkCount === 0) {
    res.sendStatus(400);
  } else {
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

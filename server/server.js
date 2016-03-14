var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var app = express();
var port = process.env.PORT || 3000;
var models = require('./models');
var db = require('./models/index.js');
//var router = express.Router();
var accountSid = 'AC6d9b063b61c76d9588fb5d9df7bb845a';
var authToken = 'fa527f9341b3fef301c01b4db35ae87e';
var client = require('twilio')(accountSid, authToken);
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storedBarLogin = {
  username: 'baradmin',
  password: 'barpassword'
};

app.post('/api/barUsers/barSignin', function (req, res, next) {
  var attemptedBarUsername = req.body.barUsername;
  var attemptedBarPassword = req.body.barPassword;
  var attemptedBarUser = {
    username: attemptedBarUsername,
    password: attemptedBarPassword
  };
  if (attemptedBarUsername === storedBarLogin.username && attemptedBarPassword === storedBarLogin.password) {
    var token = jwt.encode(attemptedBarUser, 'barHawksecret444');
    res.json({
      currentUser: storedBarLogin,
      token: token
    });
  } else {
    res.sendStatus(401);
  }
});

//send the list of all orders to client

app.post('/api/barUsers/barQueue', function (req, res) {
  if (req.body.username === 'baradmin' && req.body.password === 'barpassword') {
    //only send back to bar queue those orders which have not yet been completed
    var pendingOrders = ordersArray.filter(function (order) {
      return order.showInQueue;
    });
    res.status(200);
    res.send(pendingOrders);
  } else {
    res.status(401).send();
  }
});

app.listen(port, function () {
  console.log('Server now listening on port ' + port);
});

//userbase dummy data
var users = {
  Michael: {
    password: "password",
    age: 25,
    weight: 160,
    gender: "Male",
    drinkCount: 0,
    totalPrice: 0
  }
};

<<<<<<< HEAD
// app.post('/api/users/signup', function (req, res) {
//   var data = req.body;
//   if (data.username in users) {
//     res.sendStatus(401);
//   } else {
//     users[data.username] = data;
//     var token = jwt.encode(users[data.username], 'barHawksecret444');
//     res.json({
//       currentUser: data,
//       token: token
//     });
//   }
// });
=======
app.post('/api/users/signup', function (req, res) {
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
});
>>>>>>> (refactor) Refactor submit order path to put ordered drink in DB

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
// var ordersArray = [{
//   username: 'zeebow',
//   drinkType: 'beer',
//   time: 'Tue Mar 08 2016 16:24:37 GMT-0800 (PST)',
//   closeout: false,
//   currentPrice: 5,
//   totalPrice: 60,
//   drinkCount: 1,
//   showInQueue: true
// }, {
//   username: "Nadine",
//   drinkType: "beer",
//   time: 'Tue Mar 08 2016 17:24:37 GMT-0800 (PST)',
//   closeout: false,
//   currentPrice: 5,
//   totalPrice: 100,
//   drinkCount: 4,
//   showInQueue: true
// }, {
//   username: "Collin",
//   drinkType: "wine",
//   time: 'Tue Mar 08 2016 18:24:37 GMT-0800 (PST)',
//   closeout: false,
//   currentPrice: 5,
//   totalPrice: 15,
//   drinkCount: 8,
//   showInQueue: true
// }];

// app.post('/api/customer/order', function (req, res) {
//   //assigning drink order to varible
//   var ord = req.body;
//   //if no username or drink was not specified, throw err
//   if (ord.username === undefined || ord.drinkType === undefined) {
//     res.sendStatus(400);
//   } else {
//     //increment user's drinkCount
//     users[ord.username].drinkCount++;
//     //recalculate user's tab
//     users[ord.username].totalPrice += ord.currentPrice;
//     //prepare order with pertinent user information for bar queue
//     var newOrder = {
//       username: ord.username,
//       drinkType: ord.drinkType,
//       time: ord.time,
//       closeout: ord.closeout,
//       currentPrice: ord.currentPrice,
//       totalPrice: users[ord.username].totalPrice,
//       drinkCount: users[ord.username].drinkCount
//     };
//     //push order to bar queue
//     ordersArray.push(newOrder);
//     res.sendStatus(200);
//   }
// });

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

app.post('/api/customer/order', function (req, res) {
  //assigning drink order to variable
  var ord = req.body;
  var ordUser = ord.username;
  if (!ord.drinkType) {
    res.sendStatus(400);
  } else {
    //console.log("-----(server.js /api/customer.order) ord: ", ord);
    var currentUsername = ord.username.username;
    var DK;
    var drinkPriceFromDB;
    //finding price associated with drink name in drinks table of DB
    models.drinks.findOne({ where: { name: ord.drinkType } }).then(function (drink) {
      drinkPriceFromDB = drink.dataValues.price;
    }).then(function () {
      models.orders.count({
        where: ["username = ?", currentUsername]
      }).then(function (drinkcount) {
        DK = drinkcount;
        models.orders.create({
          username: currentUsername,
          drinktype: ord.drinkType,
          closeout: ord.closeout,
          currentprice: drinkPriceFromDB,
          totalprice: 5,
          drinkcount: DK
        }).then(function (userorder) {
          console.dir(userorder.get());
          res.json(userorder);
        });
      });
    })
  }
});

app.post('/api/users/signup', function (req, res) {
  //assigning drink order to variable
  var ord = req.body;
  console.log("hit route for signup successfully")
  console.log('ord info', ord)


  models.users.findOrCreate({
    where: { username: ord.username },
    defaults: {
      firstname:ord.firstname,
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

});

app.get('/api/customer/drink', function (req, res) {
  //assigning drink order to varible
  models.drinks.findAll()
    .then(function (drinks) {
      res.json(drinks);
    });
});


//Twilio API texting drink
app.post('/api/barUsers/orderCompleteText', function (req, res) {
  console.log('this is from serverJS file preText', req.body);
  var toPhoneNum = req.body.customerPhone;
  var customerName = req.body.customerName;
  var drinkType = req.body.customerDrinkType;

  client.messages.create({
    to: '+1' + toPhoneNum,
    from: '+15104557842',
    body: 'hey ' + customerName + ', your ' + drinkType + ' is ready.'
  }, function (err, message) {
    if (err) {
      console.log(err);
    } else {
      console.log(message);
      res.end();
    }
  });
});
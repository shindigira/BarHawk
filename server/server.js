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
    gender: "Male"
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

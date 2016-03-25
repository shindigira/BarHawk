var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);

// if (!module.parent) or if (process.env.NODE_ENV === 'test')
if(!module.parent){
  app.listen(port, function () {
    console.log('Server now listening on port ' + port);
  });
}

module.exports= app;

app.get('/api/users/signedin', function (req, res) {
  console.log('req from server.js is ', req)
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
 
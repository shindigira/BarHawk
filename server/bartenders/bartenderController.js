var jwt = require('jwt-simple');

//dummy data for stored bar login
var storedBarLogin = {
  username: 'baradmin',
  password: 'barpassword'
};

module.exports = {

  // the below is used when bar login info is dummy data stored on server instead of db
  signin: function (req, res) {
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
  },
};

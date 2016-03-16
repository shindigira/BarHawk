var customerController = require('./customerController.js');

module.exports = function (app) {
  app.post('/login', customerController.login);
  app.post('/signup', customerController.signup);
  app.post('/drinkcount', customerController.drinkcount);
};

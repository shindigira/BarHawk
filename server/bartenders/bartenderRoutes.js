var bartenderController = require('./bartenderController');

module.exports = function (app) {
  app.post('/signin', bartenderController.signin);
};

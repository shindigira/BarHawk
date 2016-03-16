var menuController = require('./menuController.js');

module.exports = function (app) {
  app.post('/order', menuController.order);
  app.post('/orderandclosetab', menuController.orderAndCloseTab);
  app.post('/closetab', menuController.closeTab);
};

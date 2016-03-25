var barqueueController = require('./barqueueController.js');

module.exports = function (app) {
  app.post('/showPendingOrders', barqueueController.showPendingOrders);
  app.post('/completeOrder', barqueueController.completeOrder);
  app.post('/orderCompleteTextMessage', barqueueController.orderCompleteTextMessage);
  app.post('/cancelOrder', barqueueController.cancelOrder);
};

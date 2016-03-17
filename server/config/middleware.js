var bodyParser = require('body-parser');

module.exports = function (app, express) {
  var customerRouter = express.Router();
  var bartenderRouter = express.Router();
  var menuRouter = express.Router();
  var barqueueRouter = express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/customers', customerRouter);
  app.use('/api/bartenders', bartenderRouter);
  app.use('/api/menu', menuRouter);
  app.use('/api/barqueue', barqueueRouter);

  require('../customers/customerRoutes.js')(customerRouter);
  require('../bartenders/bartenderRoutes.js')(bartenderRouter);
  require('../menu/menuRoutes.js')(menuRouter);
  require('../barqueue/barqueueRoutes.js')(barqueueRouter);
};

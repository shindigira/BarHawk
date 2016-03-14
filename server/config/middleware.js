var bodyParser = require('body-parser');

module.exports = function(app, express){
  var userRouter = express.Router();
  var barUserRouter = express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/users', userRouter);
  app.use('/api/barUsers', barUserRouter);

  require('../users/userRoutes.js')(userRouter);
  require('../barUsers/barUserRoutes')(barUserRouter);

};
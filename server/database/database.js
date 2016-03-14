var Sequelize = require("sequelize");
var sequelize = new Sequelize('dnovograd', null, null, {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

var UserOrder = sequelize.define('userOrder', {

  username: {
    type: Sequelize.STRING,
  },
  drinkType: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.TIME
  },
  closeout: {
    type: Sequelize.BOOLEAN
  },
  currentPrice: {
    type: Sequelize.DECIMAL
  },
  totalPrice: {
    type: Sequelize.DECIMAL
  },
  drinkCount: {
    type: Sequelize.INTEGER
  }
});

UserOrder.sync({ force: true }).then(function () {
  // Table created
  var data = {
    username: 'sampleuser',
    drinkType: 'wiskey neat',
    time: new Date(),
    closeout: true,
    currentPrice: 9,
    totalPrice: 20,
    drinkCount: 2
  };

  //create an instance of userOrder and inserts data
  UserOrder.create(data).then(function (userorder) {
    console.dir(userorder.get());
  });
});

module.exports = UserOrder;
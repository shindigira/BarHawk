'use strict';
module.exports = function (sequelize, DataTypes) {
  var orders = sequelize.define('orders', {
    username: DataTypes.STRING,
    drinktype: DataTypes.STRING,
    closeout: DataTypes.BOOLEAN,
    currentprice: DataTypes.DECIMAL,
    totalprice: DataTypes.DECIMAL,
    drinkcount: DataTypes.INTEGER,
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    notes: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return orders;
};

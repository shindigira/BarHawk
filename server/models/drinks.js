'use strict';
module.exports = function(sequelize, DataTypes) {
  var drinks = sequelize.define('drinks', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    alcohol: DataTypes.INTEGER,
    sugar: DataTypes.INTEGER,
    calories: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    volume: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return drinks;
};
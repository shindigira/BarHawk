'use strict';
module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    photo: DataTypes.STRING,
    phone: DataTypes.BIGINT
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        // orders.belongsTo(users);
      }
    }
  });
  return users;
};

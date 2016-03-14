'use strict';
var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var drinks = sequelize.define('drinks', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    alcohol: DataTypes.INTEGER,
    sugar: DataTypes.INTEGER,
    calories: DataTypes.INTEGER,
    carbs: DataTypes.INTEGER,
    volume: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return drinks;
};


// create table then create row in table with info in data object
// drinks.sync({ force: true }).then(function () {
//   var data = { 
//       name: 'AnchorSteam',
//       type: 'beer',
//       price: 5,
//       alcohol: 13,
//       sugar: 0,
//       calories: 153,
//       carbs: 16,
//       volume: 12
//   }

// //   //create an instance of drink and insert data
//   drinks.create(data).then(function (drink) {
//     console.dir(drink.get());
//   });
// });
//inserting info hardcoded drink data

// var drink = sequelize.define('drink', {

//   name: {
//     type: Sequelize.STRING,
//   },
//   price: {
//     type: Sequelize.DECIMAL
//   },
//   alcohol: {
//     type: Sequelize.INTEGER
//   },
//   sugar: {
//     type: Sequelize.INTEGER
//   },
//   calories: {
//     type: Sequelize.INTEGER
//   },
//   carbs: {
//     type: Sequelize.INTEGER
//   },
//   volume: {
//     type: Sequelize.INTEGER
//   }
// });



//module.exports = drinks;
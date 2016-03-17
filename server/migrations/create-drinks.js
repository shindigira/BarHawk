'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return [queryInterface.createTable('drinks', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            type: Sequelize.STRING
          },
          type: {
            type: Sequelize.STRING
          },
          price: {
            type: Sequelize.DECIMAL
          },
          alcohol: {
            type: Sequelize.INTEGER
          },
          sugar: {
            type: Sequelize.INTEGER
          },
          calories: {
            type: Sequelize.INTEGER
          },
          carbs: {
            type: Sequelize.INTEGER
          },
          volume: {
            type: Sequelize.INTEGER
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        }),
        // queryInterface.bulkInsert('drinks', [{
        //   name: 'AnchorSteam',
        //   type: 'beer',
        //   price: 5,
        //   alcohol: 13,
        //   sugar: 0,
        //   calories: 153,
        //   carbs: 16,
        //   volume: 12,
        //   createdAt: new Date(),
        //   updatedAt: new Date()
        // }])

      ]
      //   //create an instance of drink and insert data
      //   drinks.create(data).then(function (drink) {
      //     console.dir(drink.get());
      //   });
      // })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('drinks');
  }
};
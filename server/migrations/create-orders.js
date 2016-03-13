'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      drinktype: {
        type: Sequelize.STRING
      },
      closeout: {
        type: Sequelize.BOOLEAN
      },
      currentprice: {
        type: Sequelize.DECIMAL
      },
      totalprice: {
        type: Sequelize.DECIMAL
      },
      drinkcount: {
        type: Sequelize.INTEGER
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      notes: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(function() {
          queryInterface.bulkInsert('drinks', [
          {
          name: 'AnchorSteam',
          type: 'beer',
          price: 5,
          alcohol: 13,
          sugar: 0,
          calories: 153,
          carbs: 16,
          volume: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Heineken',
          type: 'beer',
          price: 7,
          alcohol: 14,
          sugar: 0,
          calories: 150,
          carbs: 12,
          volume: 12,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        ])
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('orders');
  }
};
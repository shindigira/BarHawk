'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('drinks', [{
      name: 'Anchor Steam',
      type: 'beer',
      price: 5,
      alcohol: 13,
      sugar: 0,
      calories: 153,
      carbs: 16,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Heineken',
      type: 'beer',
      price: 7,
      alcohol: 13,
      sugar: 0,
      calories: 148,
      carbs: 11,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Sam Adams',
      type: 'beer',
      price: 7,
      alcohol: 13,
      sugar: 0,
      calories: 150,
      carbs: 12,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Corona Extra',
      type: 'beer',
      price: 7,
      alcohol: 13,
      sugar: 0,
      calories: 148,
      carbs: 13,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Corona Light',
      type: 'beer',
      price: 7,
      alcohol: 12,
      sugar: 0,
      calories: 99,
      carbs: 5,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Miller Lite',
      type: 'beer',
      price: 7,
      alcohol: 13,
      sugar: 1,
      calories: 110,
      carbs: 7,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Budweiser',
      type: 'beer',
      price: 4,
      alcohol: 14,
      sugar: 0,
      calories: 145,
      carbs: 11,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Bud Light',
      type: 'beer',
      price: 4,
      alcohol: 12,
      sugar: 0,
      calories: 110,
      carbs: 7,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Guinness',
      type: 'beer',
      price: 8,
      alcohol: 14,
      sugar: 18,
      calories: 215,
      carbs: 18,
      volume: 16,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Merlot',
      type: 'wine',
      price: 10,
      alcohol: 14,
      sugar: 1,
      calories: 123,
      carbs: 4,
      volume: 5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Zinfandel',
      type: 'wine',
      price: 9,
      alcohol: 14,
      sugar: 0,
      calories: 160,
      carbs: 5,
      volume: 5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Prosecco',
      type: 'wine',
      price: 9,
      alcohol: 12,
      sugar: 0,
      calories: 150,
      carbs: 12,
      volume: 5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Champagne',
      type: 'wine',
      price: 8,
      alcohol: 8,
      sugar: 1,
      calories: 87,
      carbs: 3,
      volume: 5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Long Island Iced Tea',
      type: 'mixed',
      price: 10,
      alcohol: 21,
      sugar: 9,
      calories: 180,
      carbs: 10,
      volume: 8,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Gin & Tonic',
      type: 'mixed',
      price: 10,
      alcohol: 15,
      sugar: 15,
      calories: 171,
      carbs: 16,
      volume: 8,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Mojito',
      type: 'mixed',
      price: 14,
      alcohol: 10,
      sugar: 23,
      calories: 217,
      carbs: 8,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'RedBull Vodka',
      type: 'mixed',
      price: 12,
      alcohol: 14,
      sugar: 26,
      calories: 181,
      carbs: 27,
      volume: 12,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Cosmo',
      type: 'mixed',
      price: 11,
      alcohol: 18,
      sugar: 11,
      calories: 213,
      carbs: 13,
      volume: 5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Vodka Soda',
      type: 'mixed',
      price: 7,
      alcohol: 14,
      sugar: 0,
      calories: 96,
      carbs: 0,
      volume: 5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'White Russian',
      type: 'mixed',
      price: 15,
      alcohol: 18,
      sugar: 16,
      calories: 257,
      carbs: 16,
      volume: 8,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Vodka',
      type: 'liquor',
      price: 6,
      alcohol: 14,
      sugar: 0,
      calories: 56,
      carbs: 0,
      volume: 1.5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Captain Morgan',
      type: 'liquor',
      price: 7,
      alcohol: 9,
      sugar: 0,
      calories: 86,
      carbs: 0,
      volume: 1.5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'The Dan Special (Admiral Nelson)',
      type: 'liquor',
      price: 2,
      alcohol: 9,
      sugar: 0,
      calories: 69,
      carbs: 0,
      volume: 1.5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jagermeister',
      type: 'liquor',
      price: 8,
      alcohol: 8.7,
      sugar: 0,
      calories: 103,
      carbs: 0,
      volume: 1.5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jack Daniels',
      type: 'liquor',
      price: 7,
      alcohol: 14,
      sugar: 0,
      calories: 100,
      carbs: 0,
      volume: 1.5,
      imageurl: 'notDefinedYet',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
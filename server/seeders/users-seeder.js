'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
        username: 'champagnepapi2',
        firstname: 'Magic',
        lastname: 'Mike',
        password: 'chippendeals',
        age: 29,
        weight: 220,
        gender: 'male',
        photo: 'NSFW',
        phone: 5059342914,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.bulkInsert('Person', [{
          name: 'John Doe',
          isBetaMember: false
        }], {});
      */
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

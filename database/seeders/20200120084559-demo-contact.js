'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      // Add altering commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkInsert('Contacts', [{
        name: 'Idan Madar',
        phone: '0559194202',
        title: 'SWE 1',
        avatar: 'None',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
   
  },

  down: (queryInterface, Sequelize) => {
    
      // Add reverting commands here.
      // Return a promise to correctly handle asynchronicity.

      // Example:
      return queryInterface.bulkDelete('Contacts', null, {});
   
  }
};



















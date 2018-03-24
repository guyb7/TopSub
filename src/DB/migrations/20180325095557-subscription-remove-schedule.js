'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Subscriptions', 'schedule')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Subscriptions', 'schedule', {
      // UTC
      type: Sequelize.STRING,
      defaultValue: '* * 8 * * *',
      allowNull: false,
      validate: {
        // Sanity, not perfect match
        is: /^[\d*,\s]+$/
      }
    })
  }
};

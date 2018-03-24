'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Schedules', {
      subscriptionId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subscriptions',
          key: 'id'
        }
      },
      minutes: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      hours: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      weekDay: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Schedules');
  }
};

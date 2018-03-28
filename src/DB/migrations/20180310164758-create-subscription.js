'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topic: {
        type: Sequelize.STRING,
        allowNull: false
      },
      limit: {
        type: Sequelize.INTEGER,
        defaultValue: 10,
        allowNull: false
      },
      period: {
        type: Sequelize.ENUM('hour', 'day', '3days', 'week', 'month'),
        defaultValue: 'day',
        allowNull: false
      },
      schedule: {
        // UTC
        type: Sequelize.STRING,
        defaultValue: '* * 8 * * *',
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Subscriptions');
  }
};
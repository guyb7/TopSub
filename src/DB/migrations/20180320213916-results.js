'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Results', 'url', {
      type: Sequelize.STRING(1024),
      validate: {
        isUrl: true
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Results', 'url', {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    })
  }
};

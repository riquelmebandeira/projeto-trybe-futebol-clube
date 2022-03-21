'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      clubName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'club_name'
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('clubs');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('matchs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'home_team',
        references: {
          model: 'clubs',
          key: 'id'
        }
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'away_team',
        references: {
          model: 'clubs',
          key: 'id'
        }
      },
      awayTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('matchs');
  }
};

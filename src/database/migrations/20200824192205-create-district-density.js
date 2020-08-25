'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('districtDensity', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      district: {
        type: Sequelize.STRING
      },
      stateCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'stateDensity', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      population: {
        type: Sequelize.DOUBLE
      },
      male: {
        type: Sequelize.DOUBLE
      },
      female: {
        type: Sequelize.DOUBLE
      },
      literate: {
        type: Sequelize.DOUBLE
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('districtDensity');
  }
};
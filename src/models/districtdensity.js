

'use strict';

module.exports = (sequelize, DataTypes) => {
  const DistrictDensity = sequelize.define('districtDensity', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    district: {
      type: DataTypes.STRING
    },
    stateDensity: {
      type: DataTypes.INTEGER
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    longitude: {
      type: DataTypes.DOUBLE
    },
    population: {
      type: DataTypes.DOUBLE
    },
    male: {
      type: DataTypes.DOUBLE
    },
    female: {
      type: DataTypes.DOUBLE
    },
    literate: {
      type: DataTypes.DOUBLE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'districtDensity'
  });
  DistrictDensity.associate = (db) => {
    // associations can be defined here
    DistrictDensity.belongsTo(db.stateDensity, { foreignKey: 'stateDensity', as: 'stateRef' });
  };
  return DistrictDensity
};

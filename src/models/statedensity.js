module.exports = (sequelize, DataTypes) => {
  const StateDensity = sequelize.define(
    'stateDensity',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.STRING
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  StateDensity.associate = (db) => {
    // associations can be defined here
    StateDensity.hasMany(db.districtDensity, { foreignKey: 'stateDensity', as: 'stateRef' });

  };
  return StateDensity;
};
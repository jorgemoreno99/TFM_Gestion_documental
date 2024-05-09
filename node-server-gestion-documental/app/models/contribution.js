const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contribution', {
    idcontribution: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    files: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    idActivity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'activity',
        key: 'idactivity'
      }
    },
    idProfile: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'profile',
        key: 'idProfile'
      }
    }
  }, {
    sequelize,
    tableName: 'contribution',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idcontribution" },
        ]
      },
      {
        name: "Contribution_activity_idx",
        using: "BTREE",
        fields: [
          { name: "idActivity" },
        ]
      },
      {
        name: "Contribution_profile_idx",
        using: "BTREE",
        fields: [
          { name: "idProfile" },
        ]
      },
    ]
  });
};

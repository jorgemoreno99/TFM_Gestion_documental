const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supervisor', {
    idsupervisor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idProfile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'profile',
        key: 'idProfile'
      },
      unique: "fk_supervisor_profile"
    },
    role: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'supervisor',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idsupervisor" },
        ]
      },
      {
        name: "idProfile_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProfile" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('activity', {
    idactivity: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    subject: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creation_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    idCreator: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'supervisor',
        key: 'idsupervisor'
      }
    }
  }, {
    sequelize,
    tableName: 'activity',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idactivity" },
          { name: "due_date" },
        ]
      },
      {
        name: "activity_creator_idx",
        using: "BTREE",
        fields: [
          { name: "idCreator" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('approval', {
    idApproval: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reviewed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idContribution: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'contribution',
        key: 'idcontribution'
      }
    },
    idSupervisor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'supervisor',
        key: 'idsupervisor'
      }
    }
  }, {
    sequelize,
    tableName: 'approval',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idApproval" },
        ]
      },
      {
        name: "Approval_contribution_idx",
        using: "BTREE",
        fields: [
          { name: "idContribution" },
        ]
      },
      {
        name: "Approval_supervisor_idx",
        using: "BTREE",
        fields: [
          { name: "idSupervisor" },
        ]
      },
    ]
  });
};

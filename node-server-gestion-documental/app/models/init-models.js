var DataTypes = require("sequelize").DataTypes;
var _activity = require("./activity");
var _approval = require("./approval");
var _contribution = require("./contribution");
var _profile = require("./profile");
var _supervisor = require("./supervisor");

function initModels(sequelize) {
  var activity = _activity(sequelize, DataTypes);
  var approval = _approval(sequelize, DataTypes);
  var contribution = _contribution(sequelize, DataTypes);
  var profile = _profile(sequelize, DataTypes);
  var supervisor = _supervisor(sequelize, DataTypes);

  contribution.belongsTo(activity, { as: "idActivity_activity", foreignKey: "idActivity"});
  activity.hasMany(contribution, { as: "contributions", foreignKey: "idActivity"});
  approval.belongsTo(contribution, { as: "idContribution_contribution", foreignKey: "idContribution"});
  contribution.hasMany(approval, { as: "approvals", foreignKey: "idContribution"});
  contribution.belongsTo(profile, { as: "idProfile_profile", foreignKey: "idProfile"});
  profile.hasMany(contribution, { as: "contributions", foreignKey: "idProfile"});
  supervisor.belongsTo(profile, { as: "idProfile_profile", foreignKey: "idProfile"});
  profile.hasOne(supervisor, { as: "supervisor", foreignKey: "idProfile"});
  activity.belongsTo(supervisor, { as: "idCreator_supervisor", foreignKey: "idCreator"});
  supervisor.hasMany(activity, { as: "activities", foreignKey: "idCreator"});
  approval.belongsTo(supervisor, { as: "idSupervisor_supervisor", foreignKey: "idSupervisor"});
  supervisor.hasMany(approval, { as: "approvals", foreignKey: "idSupervisor"});

  return {
    activity,
    approval,
    contribution,
    profile,
    supervisor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

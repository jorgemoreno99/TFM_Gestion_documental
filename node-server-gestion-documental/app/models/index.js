const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");

const gestion_documentalDB = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};
db.Sequelize = Sequelize;
const gestion_documental_Models = require("./init-models").initModels(gestion_documentalDB)
db.sequelize = gestion_documentalDB;


db.activity =gestion_documental_Models.activity
db.approval = gestion_documental_Models.approval
db.contribution = gestion_documental_Models.contribution
db.profile = gestion_documental_Models.profile
db.supervisor = gestion_documental_Models.supervisor

module.exports = db;
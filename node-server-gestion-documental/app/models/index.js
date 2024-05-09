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


db.activity =gestion_documentalDB.activity
db.approval = gestion_documentalDB.approval
db.contribution = gestion_documentalDB.contribution
db.profile = gestion_documentalDB.profile
db.supervisor = gestion_documentalDB.supervisor

module.exports = db;
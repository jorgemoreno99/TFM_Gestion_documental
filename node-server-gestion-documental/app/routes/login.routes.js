// Google Authentication
module.exports = app => {

    const LoginController = require('../controllers/login.controller');

    const loginController = new LoginController();

    var router = require("express").Router();

    router.post("/login", loginController.authentication );

    app.use('/', router);
};

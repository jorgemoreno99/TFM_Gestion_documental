// Google Authentication
module.exports = app => {

    const LoginController = require('../controllers/login.controller');
    const { tokenVerification, supervisorVerification } = require('../middlewares/authentication'); 

    const loginController = new LoginController();

    var router = require("express").Router();

    router.post("/register", loginController.register );
    router.post("/login", loginController.authentication );
    router.get("/isSupervisor", loginController.isSupervisor );


    router.get("/users", tokenVerification, supervisorVerification, loginController.getUsers );
    router.put("/setSupervisor", tokenVerification, supervisorVerification, loginController.setSupervisor );

    app.use('/', router);
};

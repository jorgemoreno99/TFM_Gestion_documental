const { tokenVerification } = require('../middlewares/authentication'); 
// Roles requests management
module.exports = app => {
    const rolesController = require("../controllers/roles.controller");

    var router = require("express").Router();

    // Retrieve current user profile
    router.get("/isAdmin/", tokenVerification, rolesController.isAdmin);

    app.use('/api', router);
};
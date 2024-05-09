const db = require("../models");
const Profiles = db.profiles;


// Retrieve current user profile.
exports.isAdmin = (req, res) => {
    //console.log('Current email user: ' + req.userdata.email);
    const user = req.userdata.email;
    Profiles.findOne({ where: { User: user, App: app } })
        .then(data => {
            console.log("Ejecutando get role in server side.");
            if (data !== null && data.Profile === "Admin") {
                res.send(true);
            } else {
                res.send(false);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving current user profile."
            });
        });
};
var jwt = require('jsonwebtoken');
//var SEED = require('../config/db.config').SEED;
//Token verification
let tokenVerification = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            console.log('Error verificando token:');
            console.log(err);
            return res.status(401).json({
                ok: false,
                err
            })
        }
        req.userdata = decoded.userdata;
        console.log('token ok: ' + req.userdata.email);
        next();
    });

};

module.exports = {
    tokenVerification
}
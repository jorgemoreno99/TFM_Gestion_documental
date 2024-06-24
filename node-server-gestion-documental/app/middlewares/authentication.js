var jwt = require('jsonwebtoken');
const { SEED } = require('../../config/db.config');
const {
    getIdProfile,
    getIdSupervisor,
  } = require("../services/profile.service");


//Token verification
let tokenVerification = (req, res, next) => {
    let token = req.get('token');
    console.log('token');
    console.log(token);
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            console.log('Error verificando token:');
            console.log(err);
            return res.status(401).json({
                ok: false,
                err
            })
        }
        console.log('token OK');

        next();
    });

};

let supervisorVerification = async (req, res, next) => {

    try {
        let email = req.get('profile')
        const idProfile = await getIdProfile(email)
        const idSupervisor = await getIdSupervisor(idProfile)
        if(idSupervisor == null){
            console.log('unauthorized Supervisor');
            return res.status(401).json({
                ok: false,
            })
        }else{
            console.log('Supervisor OK');
            next();
        }
    } catch (err) {
        console.error('Error while checking user info', err);
        res.status(500).json({ message: 'Error while checking user info: ' + err });
    }

    


};



module.exports = {
    tokenVerification,
    supervisorVerification
}
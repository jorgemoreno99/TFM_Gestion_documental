const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Profile = db.profile;
const Supervisor = db.supervisor;
const { SEED } = require('../../config/db.config');


//Google
const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID2);

const {
    getIdProfile,
    getIdSupervisor,
  } = require("../services/profile.service");


class LoginController {
    constructor() {}

    async register (req, res) {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await Profile.create({ email: email, password: hashedPassword });
            const token = jwt.sign({ email: email }, SEED, { expiresIn: '5h' });
            res.json({ token });
        } catch (err) {
            console.error('Error while register user', err);
            res.status(500).json({ message: 'Error while register user' });
        }
    }

    async authentication (req, res) {
        const { email, password } = req.body;
        try {
            const user = await Profile.findOne({ where: { email } });
            if (!user) return res.status(401).json({ message: 'User not found' });

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ email: user.email }, SEED, { expiresIn: '5h' });
                res.json({ token });
            } else {
            res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ message: 'Login error' });
        }
    }

    async isSupervisor (req, res) {
        try {
            let email = req.get('profile')
            const idProfile = await getIdProfile(email)
            const idSupervisor = await getIdSupervisor(idProfile)
            res.status(200).send(idSupervisor != null);
        } catch (err) {
            console.error('Error while checking user info', err);
            res.status(500).json({ message: 'Error while checking user info: ' + err });
        }
    }
    
  // =========================
  // *** GET ALL Users ***
  // =========================
  async getUsers (req, res) {
    try {
      const data = await Profile.findAll({
        include: [
          {model: Supervisor, as: 'supervisor', required : false}
        ]
      });
      res.send({'data': data, message : 200});
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  
  // =========================
  // *** Update profile, add or remove supervisor ***
  // =========================
  async setSupervisor (req, res) {
    try {
        console.log(req.body);
        let data = null;
        if(req.body.checked){
            data = await Supervisor.create(req.body);
        }else{
            data = await Supervisor.destroy({
                where: {
                  idProfile: req.body.idProfile,
                },
              });
        }
        res.send({'data': data, message : 200});
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

}

module.exports = LoginController;

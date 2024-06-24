const db = require("../models");

const Approval = db.approval;


const {
  getIdProfile,
  getIdSupervisor,
} = require("../services/profile.service");

  const create = async (req, res) => {
    try {
        let body = req.body
        const profileEmail = body.profile
        const idProfile = await getIdProfile(profileEmail)
        const idSupervisor = await getIdSupervisor(idProfile)

        body['idSupervisor'] = idSupervisor
        console.log(body);

        try {
          const data = await Approval.create(req.body);
          res.send({'data': data, message : 200});
        } catch (e) {
          console.log("error", e);
          res.status(500).send({
            message: "Error creating Contribution " + e,
          });
        }
      } catch (e) {
        console.log("error", e);
        res.status(500).send({
          message: "You obtaining Profile Info. " + e,
        });
      }
  
  }




module.exports = {
  create,
};

const db = require("../models");
const Activity = db.activity;
const Profile = db.profile;
const Supervisor = db.supervisor;
const Contribution = db.contribution;


const {
  getIdProfile,
  getIdSupervisor,
} = require("../services/profile.service");




// NO HACE FALTA
// // =========================
// // *** GET CONTRIBUTIONS FROM A GIVEN ACTIVITY ***
// // =========================
// const getContributionsByActivity = async (req, res) => {
//   try {

//     let idactivity = req.params.id;
//     const data = await Contribution.findAll({
//       where: { idactivity: idactivity },
//     });
//     res.send({'data': data, message : 200});
//   } catch (e) {
//     console.log("error", e);
//     res.status(500).send({
//       message: "Error gathering Contributions from the given Activity: " + e,
//     });
//   }
// }



  const create = async (req, res) => {
    try {
        let body = req.body
        console.log(body);
        const profileEmail = body.profile
        const idProfile = await getIdProfile(profileEmail)
        console.log(idProfile);
        body['idProfile'] = idProfile
        body['date'] = new Date()
        console.log(body);
        try {
          const data = await Contribution.create(req.body);
          // let idactivity = data.dataValues.idactivity;

          res.status(200).send(data);
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

  const deleteContribution = async (req, res) => {
    let id = req.params.id
    console.log("delete: " + id);
    try {
      const data = await Contribution.destroy({
        where: {
          idcontribution: id,
        },
      });
      res.send({'data': data, message : "Deleted"});
    } catch (e) {
      console.log("error", e);
      res.status(500).send({
        message: "Error Removing Contribution " + e,
      });
    }
  }





module.exports = {
  create,
  deleteContribution

};

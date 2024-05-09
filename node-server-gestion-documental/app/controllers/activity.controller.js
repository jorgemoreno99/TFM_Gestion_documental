const db = require("../models");
const Activity = db.activity;

const { sequelize, Op } = require("sequelize");

// const {
//   notifyEmailCreationApplicant,
//   notifyEmailRequestReviewed,
// } = require("../services/notify_email_functions");

class ActivityController {
  constructor() {
  }


  // =========================
  // *** GET ALL Activity ***
  // =========================
  async getAllActivities(req, res) {
    try {
      const data = await Activity.findAll({
        order: [['idactivity', 'DESC']],
        include: [
          // {model: TeamRequired, as: 'TeamRequireds', include: [{model: Team, as: 'idTeam_Team'}]}
        ]
      });
      res.send({'data': data, message : 200});
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

  // =========================
  // *** GET REQUESTS FROM A GIVEN APPLICANT ***
  // =========================
//   async findUserRequest(req, res) {
//     try {
//       let applicant = req.params.email;
//       const data = await Request.findAll({
//         where: { applicant: applicant },
//         include: [
//           {model: TeamRequired, as: 'TeamRequireds', include: [{model: Team, as: 'idTeam_Team'}]}
//         ]
//       });
//       res.send({'data': data, message : 200});
//     } catch (e) {
//       console.log("error", e);
//       res.status(500).send({
//         message: "Error gathering Requests from the given user" + e,
//       });
//     }
//   }

//   async create(req, res) {
//     try {
//       const data = await Request.create(req.body.data);

//       try {
//         await notifyEmailCreationApplicant(data.dataValues)
        
//         res.status(200).send(data);
//       } catch (e) {
//         console.log("error", e);
//         res.status(500).send({
//           message: "Error sending mails. Request was created succesfully",
//         });
//       }

//     } catch (e) {
//       console.log("error", e);
//       res.status(500).send({
//         message: "Error creating Requests ",
//       });
//     }
//   }

//   // =========================
//   // *** UPDATE A REQUEST ***
//   // =========================
//   async update(req, res) {
//     try {
//       console.log("UPDATE ", req.body.data);
//       const data = await Request.update(req.body.data, {
//         where: {
//           idRequest: req.params.Id,
//         },
//       });
//       console.log(data);
//       res.send(data);
//     } catch (e) {
//       console.log("error", e);
//       res.status(500).send({
//         message: "Error updating Team Required from the given request id" + e,
//       });
//     }
//   }


//   // =========================
//   // *** GET REQUESTS FROM A GIVEN REVIEWER ***
//   // =========================

//   async findRewiewsWithRequest(req, res) {
//     try {
//       let reviewer = req.params.email;

//       const data = await TeamRequired.findAll({
//         where: {
//           idTeam: {
//             [Op.in]: db.sequelize.literal(
//               `(SELECT idTeam FROM TeamMember WHERE email = '`+ reviewer +`')`
//             )
//           }
//         },include: [{
//               model: Request,
//               as :'idRequest_request',
//             }]
//       });

//       res.send({'data': data, message : 200});
//     } catch (e) {
//       console.log("error", e);
//       res.status(500).send({
//         message: "Error gathering Requests from the given user" + e,
//       });
//     }
//   }



//   async findRequestByReviewer(req, res) {
//     try {
//       let reviewer = req.params.email;
//       console.log("reviewer ", reviewer);
//       // Necesitamos seleccionar todas las request que necesiten revision por parte de un equipo al cual pertenezca el mail dado.
//       //
//       // SELECT * FROM legal.request where idRequest in
//       //  (select idRequest from legal.TeamRequired where idTeam in
//       //    (select idTeam from legal.TeamMember where email = 'jorge.moreno@idneo.com') );

//       const data = await Request.findAll({
//         where: {
//           idRequest: {
//             [Op.in]: db.sequelize.literal(
//               "(SELECT idRequest FROM TeamRequired WHERE idTeam IN (SELECT idTeam FROM TeamMember WHERE email ='" +
//                 reviewer +
//                 "'))"
//             ),
//           },
//         },
//         include: [
//           {model: TeamRequired, as: 'TeamRequireds', include: [{model: Team, as: 'idTeam_Team'}]}
//         ]
//       });

//       res.send({'data': data, message : 200});
//     } catch (e) {
//       console.log("error", e);
//       res.status(500).send({
//         message: "Error gathering Requests from the given user" + e,
//       });
//     }
//   }

//   // =========================
//   // *** GET REQUEST FROM A GIVEN ID ***
//   // =========================
//   async getRequestId(req, res) {
//     try {
//       let id = req.params.id;
//       let where = { idRequest: id };
//       const data = await Request.findOne({
//         where: where,
//         include: [
//           {model: TeamRequired, as: 'TeamRequireds', include: [{model: Team, as: 'idTeam_Team'}]},
//           {model: Review, as: 'reviews'},
//           {model: Part, as: 'idPart_Part'}
//         ]
//       });
//       res.send({'data': data, message : 200});
//     } catch (e) {
//       console.log("error", e);
//       res.status(500).send({
//         message: "Error gathering Requests from the given user" + e,
//       });
//     }
//   }
}

module.exports = ActivityController;

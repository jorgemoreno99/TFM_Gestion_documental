const db = require("../models");
const Activity = db.activity;
const Profile = db.profile;
const Supervisor = db.supervisor;
const Contribution = db.contribution;
const Approval = db.approval;

const {
  getIdProfile,
  getIdSupervisor,
} = require("../services/profile.service");


// const {
//   notifyEmailCreationApplicant,
//   notifyEmailRequestReviewed,
// } = require("../services/notify_email_functions");




  // =========================
  // *** GET ALL Activities ***
  // =========================
  const getAll = async (req, res) => {
    try {
      const data = await Activity.findAll({
        order: [['idactivity', 'DESC']],
        include: [
          {model: Supervisor, as: 'idCreator_supervisor', include: [{model: Profile, as: 'idProfile_profile'}]}
        ]
      });
      res.send({'data': data, message : 200});
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }

    // =========================
  // *** GET ACTIVITIES FROM A GIVEN CREATOR ***
  // =========================
  const getActivitiesByCreator = async (req, res) => {
    try {
      let email = req.get('profile')
      const idProfileCreator = await getIdProfile(email)
      const idSupervisor = await getIdSupervisor(idProfileCreator)

      if(!idSupervisor) throw new Error("No supervisor Profile")

      const data = await Activity.findAll({
        where: { idCreator: idSupervisor },
        include: [
          {model: Supervisor, as: 'idCreator_supervisor', include: [{model: Profile, as: 'idProfile_profile'}]}
        ]
      });
      res.send({'data': data, message : 200});
    } catch (e) {
      console.log("error", e);
      res.status(500).send({
        message: "Error gathering Activities from the given creator: " + e,
      });
    }
  }



  // =========================
  // *** GET Submitted Activities ***
  // =========================
  const getSubmittedActivities = async (req, res) => {
    try {

      let email = req.params.email;
      const idProfile = await getIdProfile(email)

      let data = await Activity.findAll({
        order: [['idactivity', 'DESC']],
        include: [
          {model: Supervisor, as: 'idCreator_supervisor', include: [{model: Profile, as: 'idProfile_profile'}]},
          {model: Contribution, as: 'contributions',  where: { idProfile: idProfile }, required: true,
            include:[
              {model: Approval, as: 'approvals', required : false},
              {model: Profile, as: 'idProfile_profile', required : false},
            ]},
        ],
      });
      res.send({'data': data, message : 200});
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }


    // =========================
  // *** GET Pending Activities ***
  // =========================
  const getPendingActivities = async (req, res) => {
    try {

      let email = req.params.email;
      const idProfile = await getIdProfile(email)

      let data = await Activity.findAll({
        order: [['idactivity', 'DESC']],
        include: [
          {model: Supervisor, as: 'idCreator_supervisor', include: [{model: Profile, as: 'idProfile_profile', attributes:["email", "name"]}]},
          {model: Contribution, as: 'contributions',  where: { idProfile: idProfile }, required: false},
        ],
      });

      data = data.filter(a => a.dataValues.contributions.length == 0);

      res.send({'data': data, message : 200});

    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }



// =========================
// *** GET ACTIVITY FROM A GIVEN ID : For regular user***
// =========================
const getById = async (req, res) => {
  try {
      let id = req.params.id;
      let email = req.get('profile')
      const idProfile = await getIdProfile(email)

      const data = await Activity.findOne({
        where: { idactivity: id },
        include: [
          {model: Supervisor, as: 'idCreator_supervisor', include: [{model: Profile, as: 'idProfile_profile', attributes:["email", "name"]}]},
          {model: Contribution, as: 'contributions', where: { idProfile: idProfile }, required: false, include:[{model: Approval, as: 'approvals', required : false}]},
        ],
      });
      res.send({'data': data, message : 200});
    } catch (e) {
      console.log("error", e);
      res.status(500).send({
        message: "Error gathering the activity. " + e,
      });
    }
  }


  // =========================
// *** GET ACTIVITY FROM A GIVEN ID : For Supervisor***
// =========================
const getByIdForSupervisor = async (req, res) => {
  try {
      let id = req.params.id;
      // let email = req.get('profile')
      // const idProfile = await getIdProfile(email)

      const data = await Activity.findOne({
        where: { idactivity: id },
        include: [
          {model: Supervisor, as: 'idCreator_supervisor', include: [{model: Profile, as: 'idProfile_profile', attributes:["email", "name"]}]},
          {model: Contribution, as: 'contributions', required: false,
            include:[{model: Approval, as: 'approvals', required : false,
              include: [{model: Supervisor, as: 'idSupervisor_supervisor', 
                include: [{model: Profile, as: 'idProfile_profile', attributes:["email", "name"]}]
              }]
            },
            {model: Profile, as: 'idProfile_profile', attributes:["email", "name"]}
          ]},
        ],
      });
      res.send({'data': data, message : 200});
    } catch (e) {
      console.log("error", e);
      res.status(500).send({
        message: "Error gathering the activity. " + e,
      });
    }
  }


  const create = async (req, res) => {
    try {
        let body = req.body
        const creatorEmail = body.creator
        
        const idProfile = await getIdProfile(creatorEmail)
        console.log(idProfile);

        const idSupervisor = await getIdSupervisor(idProfile)
        console.log(idSupervisor);
    
        body['idCreator'] = idSupervisor
        body['creation_date'] = new Date()

        try {
          const data = await Activity.create(req.body);
          // let idactivity = data.dataValues.idactivity;

          res.status(200).send(data);
        } catch (e) {
          console.log("error", e);
          res.status(500).send({
            message: "Error creating Activity " + e,
          });
        }
      } catch (e) {
        console.log("error", e);
        res.status(500).send({
          message: "You are not allowed to create activities",
        });
      }

    
  }


  






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

  



module.exports = {
  getAll,
  getSubmittedActivities,
  getPendingActivities,
  getById,
  getByIdForSupervisor,
  create,
  getActivitiesByCreator
};

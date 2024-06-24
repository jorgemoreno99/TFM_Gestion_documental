const db = require("../models");
const Profile = db.profile;
const Supervisor = db.supervisor;


// let emailNotification = async(emailOptions, data) =>{
   
async function getIdProfile(email) {
    console.log(email);
    try {
    const data = await Profile.findOne({
      attributes: ['idProfile'],
      where: {email : email},
      raw: true
    })
   
    return data['idProfile'];
  
    }catch(e){
      console.log("error", e);
      throw new Error("Error retrieving user info")
    }
  }
  
  async function getIdSupervisor(idProfile) {
  
    try {
    const data = await Supervisor.findOne({
      attributes: ['idsupervisor'],
      where: {idProfile : idProfile},
      raw: true
    })
   
    return data ? data['idsupervisor']: null;
  
    }catch(e){
      console.log("error", e);
      throw new Error("Error retrieving Supervisor info")
    }
  }

module.exports = {
    getIdProfile: getIdProfile,
    getIdSupervisor: getIdSupervisor
  }
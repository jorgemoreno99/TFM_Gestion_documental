const { tokenVerification, supervisorVerification } = require('../middlewares/authentication'); 
const multer = require('multer');

// Configuración de Multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//TODO: add tokenVerification
module.exports = (app) => {
  const activityController = require("../controllers/activity.controller");
  const fileController = require("../controllers/file.controller");
  let router = require("express").Router();
  
  router.get("/allActivities", tokenVerification, supervisorVerification, activityController.getAll);
  router.get("/activitiesByCreator", tokenVerification, supervisorVerification, activityController.getActivitiesByCreator);
  router.get("/pendingActivities/:email", tokenVerification, activityController.getPendingActivities);
  router.get("/submittedActivities/:email",tokenVerification, activityController.getSubmittedActivities);
  router.get("/activity/:id", tokenVerification , activityController.getById);
  router.get("/activityForSupervisor/:id", tokenVerification, supervisorVerification,  activityController.getByIdForSupervisor);
  router.post("/activity", tokenVerification, supervisorVerification, activityController.create);
  //files:
  router.get('/getActivityFiles/:id', tokenVerification, fileController.getActivityFiles); 
  router.post('/uploadActivityFiles/:id', tokenVerification, upload.array('files', 5), fileController.uploadActivityFiles);

  app.use("/", router);
};

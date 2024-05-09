const { tokenVerification } = require('../middlewares/authentication'); 

const ActivityController = require("../controllers/activity.controller");
// const FileController = require("../controllers/file.controller");

const activityController = new ActivityController();
// const fileController = new FileController();

module.exports = (app) => {
  let router = require("express").Router();

  // Retrieve all requests
  router.get("/activity", activityController.getAllActivities);

    // Retrieve requests from a given applicant
  // router.get('/requests/:email',  tokenVerification, middleware.roleVerification, requestController.findUserRequest);
  router.get("/requests/:email",  tokenVerification,requestController.findUserRequest);
  

  router.post("/request/create",  tokenVerification,requestController.create);

  // Retrieve requests from a given id
  router.get("/request/:id", tokenVerification, requestController.getRequestId);

  router.put('/request/update/:Id',  tokenVerification,requestController.update);

  // router.delete('/request/delete/:Id', requestController.delete);



  router.get("/requestsToReview/:email", tokenVerification, requestController.findRewiewsWithRequest);


  //create Drive folder when a new request is created
  router.post('/requests/createFolder/', tokenVerification, fileController.createDriveOriginalFolderController )

  //give a member permission to a Drive folder 
  router.post('/requests/membersPermission/', tokenVerification, fileController.membersPermission )

  //remove a member permission to a Drive folder 
  router.post('/requests/removePermission/', tokenVerification, fileController.removePermissions )

  //upload files
  router.post('/requests/uploadOriginal/',  tokenVerification,fileController.uploadFilesToOriginal )

  //Get file from a given request
  router.get('/requestsFiles/', tokenVerification, fileController.getFiles)

  //Download file from a given request
  router.get('/download/:fileId', tokenVerification, fileController.downloadFile)


  // //Delete file from a given fileId
  // router.post('/requests/files/delete/:idFile', fileController.deleteAttachment)

  app.use("/", router);
};

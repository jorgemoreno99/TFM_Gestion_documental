const { tokenVerification, supervisorVerification } = require('../middlewares/authentication'); 
const multer = require('multer');

// Configuración de Multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = (app) => {
  const contributionController = require("../controllers/contribution.controller");
  const fileController = require("../controllers/file.controller");
  let router = require("express").Router();

  router.post("/contribution", tokenVerification,  contributionController.create);
  router.delete("/contribution/:id", tokenVerification,  contributionController.deleteContribution);
  
  //files:
  router.get('/getContributionFiles/:id',tokenVerification,  fileController.getContributionFiles); 
  router.post('/uploadContributionFiles/:id', upload.array('files', 5), tokenVerification,  fileController.uploadContributionFiles);

  // Retrieve requests from a given applicant
  // router.get('/requests/:email',  tokenVerification, middleware.roleVerification, requestController.findUserRequest);
  // router.get("/requests/:email",  tokenVerification,requestController.findUserRequest);
  


  // // Retrieve requests from a given id

  // router.put('/request/update/:Id',  tokenVerification,requestController.update);

  // // router.delete('/request/delete/:Id', requestController.delete);



  // router.get("/requestsToReview/:email", tokenVerification, requestController.findRewiewsWithRequest);


  //create Drive folder when a new request is created
  // router.post('/requests/createFolder/', tokenVerification, fileController.createDriveOriginalFolderController )

  //give a member permission to a Drive folder 
  // router.post('/requests/membersPermission/', tokenVerification, fileController.membersPermission )

  //remove a member permission to a Drive folder 
  // router.post('/requests/removePermission/', tokenVerification, fileController.removePermissions )

  //upload files
  // router.post('/requests/uploadOriginal/',  tokenVerification,fileController.uploadFilesToOriginal )


  //Download file from a given request
  // router.get('/download/:fileId', tokenVerification, fileController.downloadFile)


  // //Delete file from a given fileId
  // router.post('/requests/files/delete/:idFile', fileController.deleteAttachment)

  app.use("/", router);
};

const { tokenVerification, supervisorVerification } = require('../middlewares/authentication'); 
const multer = require('multer');

// Configuración de Multer para almacenar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


module.exports = (app) => {
  const approvalController = require("../controllers/approval.controller");
  let router = require("express").Router();

  router.post("/approval", tokenVerification, supervisorVerification,  approvalController.create);
  
  

  app.use("/", router);
};

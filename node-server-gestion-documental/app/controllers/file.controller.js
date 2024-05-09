const formidable = require("formidable");
const TeamMemberController = require("./teamMember.controller");
const {
  authGoogleClient,
  createDriveFile,
  createDriveFolder,
  moveToDriveFolder,
  searchDriveSubFolder,
  getFilesDrive,
  addPermisionDriveFile,
  deleteFile,
  removePermissionDriveFile,
} = require("../services/drive");
// , getFilesDrive, createDriveFile, createDriveFolder, moveToDriveFolder, searchDriveSubFolder, addPermisionDriveFile, deleteFile } = require('../services/drive');

// const stream = require('stream');
// const multer = require('multer');
const { google } = require("googleapis");
const { review } = require("../models");
const fs = require("fs");
const adminEmail = "apisidneoapps@idneoapps.iam.gserviceaccount.com";
const rootDriveFolderIdLegal = "1MrcpGSdso7iPZJhsTbM7Ediq0H6leeHA";

givePermisionsToDriveFolder = async (requestId, userEmail) => {
  // const users = await request.getUser_Notifications();
  const adminClient = authGoogleClient(adminEmail);
  const drive = google.drive({ version: "v3", auth: adminClient });
  const subFolder = await searchDriveSubFolder(
    rootDriveFolderIdLegal,
    requestId,
    drive
  );

  return addPermisionDriveFile(
    "reader",
    userEmail,
    subFolder.data.files[0].id,
    drive
  );
};

removePermissionsFromDriveFolder = async (requestId, userEmail) => {
  const adminClient = authGoogleClient(adminEmail);
  const drive = google.drive({ version: "v3", auth: adminClient });
  const subFolder = await searchDriveSubFolder(
    rootDriveFolderIdLegal,
    requestId,
    drive
  );
  console.log("REMOVE PERMISSION ", userEmail, subFolder.data.files[0].id);

  const permissions = await drive.permissions
    .list({
      fileId: subFolder.data.files[0].id,
      supportsAllDrives: true,
      fields: "permissions(id,emailAddress,role)", // Obtener también el campo "role"
    })
    .catch((error) => {
      console.error("Error calling drive.permissions.list:", error);
    });

  const readerPermissions = permissions.data.permissions.filter(
    (permission) =>
      permission.emailAddress === userEmail && permission.role === "reader"
  );

  if (readerPermissions.length > 0) {
    console.log(userEmail, subFolder.data.files[0].id, readerPermissions[0].id);

    if (readerPermissions[0].isInherited) {
      // Si el permiso es heredado, revocar los permisos estableciendo el rol como null
      return drive.permissions.update({
        fileId: subFolder.data.files[0].id,
        permissionId: readerPermissions[0].id,
        removeExpiration: true,
        supportsAllDrives: true,
        transferOwnership: false,
        sendNotificationEmail: false,
        resource: {
          role: null,
        },
      });
    } else {
      // Si el permiso no es heredado, eliminarlo normalmente
      return drive.permissions.delete({
        fileId: subFolder.data.files[0].id,
        permissionId: readerPermissions[0].id,
        supportsAllDrives: true,
      });
    }
  }
};

uploadFileToOriginal = async (file, requestId) => {
  return new Promise(async (resolve, reject) => {
    const client1 = authGoogleClient(adminEmail);
    const drive = google.drive({ version: "v3", auth: client1 });
    const createdFile = await createDriveFile(file, drive);

    const requestFolder = await searchDriveSubFolder(
      rootDriveFolderIdLegal,
      requestId,
      drive
    );
    let requestFolderId = requestFolder.data.files[0].id;

    const originalFolder = await searchDriveSubFolder(
      requestFolderId,
      "original",
      drive
    );
    let originalFolderId = originalFolder.data.files[0].id;

    await moveToDriveFolder(createdFile, originalFolderId, drive);

    resolve(createdFile.data);
  });
};

async function getFileDetails(fileId, drive) {
  const response = await drive.files.get({ fileId, fields: "name, mimeType" });
  const { name, mimeType } = response.data;

  const fileName = name.split(".")[0];
  const fileExtension = name.split(".")[1];

  return { name: fileName, extension: fileExtension, mimeType };
}

async function downloadFileFromDrive(fileId, drive) {
  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return response.data;
}

class FileController {
  constructor() {}

  async getFiles(req, res) {
    let idRequest;
    try {
      idRequest = req.query.idRequest;
      let idsReviewsStr = req.query.idsReviews;
      let idsReviews = [];
      if (idsReviewsStr == "") idsReviews = ["original"];
      else {
        idsReviews = idsReviewsStr.split(",");
        idsReviews.push("original");
      }

      let result = {};

      const client1 = authGoogleClient(adminEmail);
      const drive = google.drive({ version: "v3", auth: client1 });
      const requestFolder = await searchDriveSubFolder(
        rootDriveFolderIdLegal,
        idRequest,
        drive
      );
      const requestFolderId = requestFolder.data.files[0].id;

      const promises = idsReviews.map(async (reviewId) => {
        try {
          const reviewFolder = await searchDriveSubFolder(
            requestFolderId,
            reviewId,
            drive
          );
          const reviewFolderId = reviewFolder.data.files[0].id;

          let files = await getFilesDrive(reviewFolderId, drive);

          result[reviewId] = files;
        } catch (err) {
          console.log(err);
          res.status(500).send({
            message:
              "Error getting drive files for request " +
              idRequest +
              " on Review " +
              reviewId +
              " : " +
              err,
          });
        }
      });

      await Promise.all(promises);

      res.send({ message: "recive", files: result });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          "Error getting drive files for request " + idRequest + " : " + err,
      });
    }
  }

  async createDriveOriginalFolderController(req, res) {
    try {
      let userEmail = req.body.email;
      let requestId = req.body.requestId;
      let teamIds = req.body.teamIds;

      const client1 = authGoogleClient(adminEmail);
      const drive = google.drive({ version: "v3", auth: client1 });

      let folderId = await createDriveFolder(
        requestId,
        rootDriveFolderIdLegal,
        drive
      );
      let subFolderId = await createDriveFolder(
        "original",
        folderId.data.id,
        drive
      );

      givePermisionsToDriveFolder(requestId, userEmail);
      console.log("REQUIRED TEAMS", teamIds);

      const teamMemberController = new TeamMemberController();
      const promises = [];

      for (const id of teamIds) {
        teamMemberController.getAllMembersByTeam(id).then((members) => {
          const permissionPromises = members.map(async (member) => {
            await givePermisionsToDriveFolder(requestId, member.email);
          });
          promises.push(permissionPromises);
        });
      }

      await Promise.all(promises);

      res.send({ message: "createdFolder", subFolderId });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Error Creating drive folder for attachments: " + err,
      });
    }
  }

  async membersPermission(req, res) {
    try {
      let requestId = req.body.requestId;
      let teamIds = req.body.teamIds;
      console.log("REQUIRED TEAMS", teamIds);

      const teamMemberController = new TeamMemberController();
      const promises = [];

      for (const id of teamIds) {
        teamMemberController.getAllMembersByTeam(id).then((members) => {
          const permissionPromises = members.map(async (member) => {
            await givePermisionsToDriveFolder(requestId, member.email);
          });
          promises.push(permissionPromises);
        });
      }

      await Promise.all(promises);

      res.send({ message: "given permission", teamIds });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message:
          "Error giving permission to drive folder for attachments: " + err,
      });
    }
  }

  async removePermissions(req, res) {
    try {
      let requestId = req.body.requestId;
      let teamIds = req.body.teamIds;
      console.log("REQUIRED TEAMS", teamIds);

      const teamMemberController = new TeamMemberController();
      const promises = [];

      for (const id of teamIds) {
        teamMemberController.getAllMembersByTeam(id).then((members) => {
          const permissionPromises = members.map(async (member) => {
            await removePermissionsFromDriveFolder(requestId, member.email);
          });
          promises.push(permissionPromises);
        });
      }

      await Promise.all(promises);

      res.send({ message: "removed permission", teamIds });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Error removing permission from drive folder: " + err,
      });
    }
  }

  async uploadFilesToOriginal(req, res) {
    try {
      const form = formidable({ multiples: true });
      form.parse(req, async (err, fields, files) => {
        let requestId = fields["requestId"];

        if (err) {
          res.status(400).send({ message: "It is not possible to upload" });
        }

        let driveFile = await uploadFileToOriginal(
          files["uploadFile"],
          requestId
        );

        res.send({ message: "recive", driveFile });
      });
    } catch (e) {
      res.status(400).send({ message: "It is not possible to upload", e });
    }
  }

  //Delete attachment.
  async deleteAttachment(req, res) {
    // try{
    // let id = req.params.id;
    let idFile = req.params.idFile;
    const client1 = authGoogleClient(adminEmail);
    const drive = google.drive({ version: "v3", auth: client1 });

    await deleteFile(idFile, drive);
    res.send({ message: "Attachment was deleted successfully!" });
    // }catch(err){
    //     res.status(500).send({
    //       message: "Could not delete attachment with id=" + id+ ". " + err
    //     });
    // }
  }

  async downloadFile(req, res) {
    try {
      const fileId = req.params.fileId; // Obtén el ID del archivo que se va a descargar
  
      const client1 = authGoogleClient(adminEmail);
      const drive = google.drive({ version: "v3", auth: client1 });
  
      // Llama a una función del servicio 'drive' para obtener los detalles del archivo según el ID
      const fileDetails = await getFileDetails(fileId, drive);
  
      // Obtiene el nombre y la extensión del archivo
      const fileName = fileDetails.name;
      const fileExtension = fileDetails.extension;
  
      // Descarga el archivo desde Google Drive y crea un flujo de lectura
      const fileReadStream = await downloadFileFromDrive(fileId, drive);
  
      // Establece los encabezados de respuesta para la descarga
      res.setHeader("Content-disposition", `attachment; filename=${fileName}.${fileExtension}`);
      res.setHeader("Content-type", fileDetails.mimeType);
  
      // Crea un flujo de escritura en el sistema de archivos del servidor
      const fileWriteStream = fs.createWriteStream(`./downloads/${fileName}.${fileExtension}`);
  
      // Pasa el flujo de lectura al flujo de escritura para descargar el archivo
      fileReadStream.pipe(fileWriteStream);
  
      // Maneja los eventos de finalización y error de la descarga
      fileWriteStream.on("finish", () => {
        console.log("File downloaded successfully.");
      });
  
      fileWriteStream.on("error", (error) => {
        console.error("Error downloading file:", error);
        res.status(500).send({ message: "Error downloading file." });
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).send({ message: "Error downloading file." });
    }
  }

  
}

module.exports = FileController;

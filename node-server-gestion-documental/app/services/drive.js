const { google } = require('googleapis');
const { key } = require('../../config/googleDrive');
const fs = require('fs');


const authGoogleClient = (email) => {
  const scopes = ['https://www.googleapis.com/auth/drive'];
  const client1 = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    scopes,
    email,
  )
  client1.authorize(function (err, tokens) {
    if (err) {
      throw new Error(err)
    } else {
      console.log('Api Connected correctly..');
    }
  });
  return client1;
}
const createDriveFile = async (file, drive) => {
  return drive.files.create({
    requestBody: {
      name: file.originalFilename,
      mimeType: file.mimetype
    },
    media: {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.filepath)
    },
    fields: '*'
  });
}
const createDriveFolder = async (name, folderId, drive) => {
  return drive.files.create({
    resource: {
      'name': name,
      'mimeType': 'application/vnd.google-apps.folder',
      parents: [folderId],
    },
    supportsAllDrives: true,
    fields: '*'
  });
}
const moveToDriveFolder = async (file, folderID, drive) => {
  return drive.files.update({
    fileId: file.data.id,
    // Add your own file ID:
    addParents: folderID,
    fields: 'id, parents, webViewLink',
    supportsAllDrives: true
  });
}
const searchDriveSubFolder = async (folderId, name, drive) => {
  return drive.files.list({
    q: `name = '${name}' and '${folderId}' in parents`,
    fields: '*',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: 'allDrives'
  })
}


const getFilesDrive = async (folderId, drive) => {
  return drive.files.list({
    q: `'${folderId}' in parents`,
    fields: '*',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: 'allDrives'
  })
}

const addPermisionDriveFile = async (role, userEmail, file, drive) => {
  return drive.permissions.create({
      resource: {
        'type': 'user',
        'role': role,
        'emailAddress': userEmail
      },
      fileId: file,
      supportsAllDrives: true,
      sendNotificationEmail: false
    },)
}

const removePermissionDriveFile = async (userEmail, file, drive) => {
  const permissions = await drive.permissions.list({
    fileId: file,
    supportsAllDrives: true,
  });

  const permissionId = permissions.data.permissions.find(
    (permission) => permission.emailAddress === userEmail
  )?.id;

  if (permissionId) {
    console.log(userEmail, file, permissionId)
    return drive.permissions.delete({
      fileId: file,
      permissionId: permissionId,
      supportsAllDrives: true,
    });
  }
};


//=================================
// --- Api Delete Files ---
//=================================
const deleteFile = async(idFile, drive) => {
  try {
      // Move the file to specific folder
      await drive.files.update({
        fileId: idFile,
        requestBody: { trashed: true },
        supportsAllDrives: true,
      });

      console.log('File' + idFile + ' deleted successfully.');

  } catch (err) {
      console.log('Error deleting file: ' + idFile + '.');
      console.log(err);
  }
}


module.exports = {
  authGoogleClient: authGoogleClient,
  createDriveFile: createDriveFile,
  createDriveFolder: createDriveFolder,
  moveToDriveFolder: moveToDriveFolder,
  searchDriveSubFolder: searchDriveSubFolder,
  getFilesDrive: getFilesDrive,
  addPermisionDriveFile: addPermisionDriveFile,
  deleteFile: deleteFile,
  removePermissionDriveFile: removePermissionDriveFile
}

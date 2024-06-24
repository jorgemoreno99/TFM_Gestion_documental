const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { Readable } = require('stream');

          
cloudinary.config({ 
  cloud_name: 'dbrqfezav', 
  api_key: '831725366381122', 
  api_secret: 'J2fEK0Edx1aRY7uMmswG7DFPdDA' 
});


const getActivityFiles = async (req, res) => {
  try{

    let folder  =  'files_gestion_documental/activity/' + req.params.id
    console.log(folder);
    const files = await getFromCloudinary(folder)
    res.send(files);
  } catch (error) {
    console.log("Error in activity files: " + error);
    res.status(500).send({ message: "Error in activity files: " + error });
  }
}


const getContributionFiles = async (req, res) => {
  let folder  =  'files_gestion_documental/contribution/' + req.params.id
  console.log(folder);
  const files = await getFromCloudinary(folder)
  res.send(files);
}


const uploadActivityFiles = async (req, res) => {

  let folder  =  'files_gestion_documental/activity/' + req.params.id
  try {
    // Sube todos los archivos a Cloudinary
    const uploadPromises = req.files.map(file =>
      uploadToCloudinary(file.buffer, file.originalname, folder)
    );
    const uploadResults = await Promise.all(uploadPromises);
    console.log('Ficheros subidos con exito' , uploadResults);
    res.send({
      message: 'Archivos subidos con éxito a Cloudinary',
      files: uploadResults.map(result => ({
        url: result.secure_url,
        public_id: result.public_id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


const uploadContributionFiles = async (req, res) => {
  let folder  =  'files_gestion_documental/contribution/' + req.params.id
  try {
    // Sube todos los archivos a Cloudinary
    const uploadPromises = req.files.map(file =>
      uploadToCloudinary(file.buffer, file.originalname, folder)
    );
    const uploadResults = await Promise.all(uploadPromises);
    console.log('Ficheros subidos con exito' , uploadResults);
    res.send({
      message: 'Archivos subidos con éxito a Cloudinary',
      files: uploadResults.map(result => ({
        url: result.secure_url,
        public_id: result.public_id,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}






  //Delete attachment.
  // async deleteAttachment(req, res) {
  //   // try{
  //   // let id = req.params.id;
  //   let idFile = req.params.idFile;
  //   const client1 = authGoogleClient(adminEmail);
  //   const drive = google.drive({ version: "v3", auth: client1 });

  //   await deleteFile(idFile, drive);
  //   res.send({ message: "Attachment was deleted successfully!" });
  //   // }catch(err){
  //   //     res.status(500).send({
  //   //       message: "Could not delete attachment with id=" + id+ ". " + err
  //   //     });
  //   // }
  // }

  const getFromCloudinary = async (folder) => {
    try {
      const { resources } = await cloudinary.search
        .expression(`folder:${folder}`)
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();
  
      const files = resources.map(file => ({
        url: file.secure_url,
        public_id: file.public_id,
      }));
      console.log(files);
      return files
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Función auxiliar para subir un archivo a Cloudinary desde un buffer
  const uploadToCloudinary = async (fileBuffer, originalname, folder) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          public_id: originalname,//.split('.')[0].trim(),
          resource_type: 'auto', // Permite subir cualquier tipo de archivo
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      const readableBuffer = Readable.from(fileBuffer);
      readableBuffer.pipe(stream);
    });
  };


  
  module.exports = {
    getActivityFiles,
    getContributionFiles,
    uploadActivityFiles,
    uploadContributionFiles
  };

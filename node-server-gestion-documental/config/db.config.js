module.exports = {
    HOST: '127.0.0.1',
    USER: 'root',
    PASSWORD: 'root',
    DB: 'gestion_documental',
    // DBPROFILES: 'gestion_documental',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 60000,
        idle: 10000
    },
    SEED : "43b68d7dd24db7df8ab3efb07035a4a081915bfcb0056b50ee8983c2044dbe176c4aee4ac9d29e4aa9caea11b911fe89b099c61e28890c00533988845b3729f0"
}
// sequelize-auto -h 127.0.0.1 -d gestion_documental -u root -x root -p 3306 --dialect mysql -o 'app/models' 

//Configurar variables de entorno en Node para cambiar código...
//process.env.CADUCIDAD_TOKEN = 60 * 60 *8;
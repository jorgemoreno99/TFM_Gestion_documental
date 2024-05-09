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
    }
}

//Configurar variables de entorno en Node para cambiar código...
//process.env.CADUCIDAD_TOKEN = 60 * 60 *8;
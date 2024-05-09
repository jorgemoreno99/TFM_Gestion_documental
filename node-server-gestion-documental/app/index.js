// server.js
const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config({ path: './.env' });

// sequelize-auto -h 127.0.0.1 -d gestion_documental -u root -x root --dialect mysql -o 'app/models' 

const db = require('./models');
var corsOptions = {
    origin: "http://localhost:8080"
};


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to app backend application." });
});


require('./routes/login.routes.js')(app);
// require('./routes/roles.routes.js')(app);
// require('./routes/request.routes.js')(app);


// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// [!] Importante añadir SIEMPRE 'force: false'.
db.sequelize.sync({ force: false }).then(() => {
    console.log('Sync db.');
}).catch((err) => {
    console.log('Failed to sync db: ', err);
})

const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig")
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');
const db = require('./models');

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true });
        }
    })
}

prepareAndStartServer();
const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig")
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser');

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`Server Started at ${PORT}`);
    })
}

prepareAndStartServer();
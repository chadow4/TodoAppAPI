/**
 * TODOLIST API
 * Author: Julien SANCHEZ
 * Created: 29.12.2022
 * Updated: 29.12.2022
 **/

const express = require('express');
const cors = require("cors");
const app = express();
const corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

/* Routes */

require('./routes/auth.routes')(app); // auth routes
require('./routes/user.routes')(app); // user routes
require('./routes/todo.routes')(app); // todo routes

/* Models */

const db = require('./models');

/* set port, listen for requests */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/* Drop and Resync Database (only for local Project) */
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
});
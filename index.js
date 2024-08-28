const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./config/databaseConnection');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
dbConnection.connect(err => {
    if(err) {
        console.log(err.message);
        process.exit(1);
    }
    else {
        console.log("Connected succesfully to DB");
    }
});
const routes = require('./routes/route');
app.use(routes);
app.listen(3000, ()=>console.log(`Listening on port 3000`));



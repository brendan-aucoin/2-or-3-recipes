const fs = require('fs')
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const apiController = require('./controllers/apiController');
const connectMongoose = require('./database/connection');

// use the default port or fallback on port 5000.  I chose 5000 because that is what the proxy is for the frontend.
const PORT = process.env.PORT || 5000;

// set up the express app with all the middleware
const app = express();
app.use(bodyParser.json());

//connect to the database
connectMongoose();

// when you deploy the app, you want ot join the build folder and the backend. 
//connecting the frontend to the backend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'my-app/build')));
}

// this contains all the routes for the app.
apiController(app);

// start the app
console.log(`Listening to PORT: ${PORT}`);
app.listen(PORT);



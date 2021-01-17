const fs = require('fs')
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const apiController = require('./controllers/apiController');
const connectMongoose = require('./database/connection');

const PORT = process.env.PORT || 5000;
const app = express();


app.use(bodyParser.json());


//mongoose
connectMongoose();

const urlencodedParser = bodyParser.urlencoded({extended:false})

if(process.env.NODE_ENV === 'production'){
    //serve any static files
    app.use(express.static(path.join(__dirname,'my-app/build')));
    
}

apiController(app,urlencodedParser);
// to give you back index.html
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'my-app/build','index.html'))
});
console.log(`Listening to PORT: ${PORT}`);

app.listen(PORT);



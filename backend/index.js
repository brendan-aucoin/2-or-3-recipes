const fs = require('fs')
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const apiController = require('./controllers/apiController');
const connectMongoose = require('./connection');

const PORT = 5000 || process.env.PORT;

// all the tags we have
const tags = fs.readFileSync(path.join(__dirname,'tags.txt'),{encoding: 'utf-8'}).split('\n');

const app = express();

app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
app.use(express.static(path.join(__dirname, 'build')));

//mongoose
connectMongoose();

const urlencodedParser = bodyParser.urlencoded({extended:false})
apiController(app,urlencodedParser);
console.log(`Listening to PORT: ${PORT}`);

app.listen(PORT);



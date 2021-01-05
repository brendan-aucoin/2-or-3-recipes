fs = require('fs')
path = require('path');
express = require('express');
const tags = []
fs.readFile(path.join(__dirname,'tags.txt'),{encoding: 'utf-8'},(err,data)=>{
    tags.push(data);
});

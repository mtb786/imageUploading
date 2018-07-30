require('./config/application');
require('./config/database');
var express = require('express');
var app=  express();

let bodypareser = require('body-parser');
let mongo = require('mongoose');
let path = require('path');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/img', express.static(path.join(__dirname, 'uploads')));


app.use(bodypareser.urlencoded({
    extended:false
}));
app.use(bodypareser.json());

// DataBase Connection 
APP_DATABASE.database();
// Routing File Set for controller calling
IMAGEUPLOAD_APP.requirePath();

// App Start
var port = process.env.PORT || '8080';
app.listen(8080 , () => {
    console.log(`Server started on port`);
   
}); 

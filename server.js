const express = require('express');
const app = express();
let bodypareser = require('body-parser');
let mongo = require('mongoose');
// app.use('*',(req,res) => {
// console.log('Hello Karan ');
// });
// Mongo Setuping 
// const dbUrl = `mongodb://adminUsername:${encodeURIComponent('adminPassword')}@localhost:27017/mydb`;
var url =`mongodb://mtb13:${encodeURIComponent('qwerty123')}@ds131551.mlab.com:31551/imageupload`; 
mongo.Promise = global.Promise;
mongo.connect(url,  { useNewUrlParser: true } ,function(err) {
// res.send(err);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodypareser.json());
app.use(bodypareser.urlencoded({
    extended:true
}));

// Routing File Set for controller calling
require('./routes/routes')(app);


const PORT = process.env.PORT ||'8080';

app.listen(PORT);



let cors = require('cors')
// let UPLOAD_CONTROLLER = require('../routes/controller');
const express = require('express');
let Imagemodel = require('../schema/schema');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file);
      cb(null, file.fieldname + '-' + Date.now()+ file.originalname )
    }
});

module.exports = function(app) {
    'use-strict'
    var upload = multer({storage: storage});
    app.post('/imageADD', upload.single('image'), (req, res, next) => {
        let user = Imagemodel();
       console.log('host');
       console.log(req.headers.host);
        user.imageName = req.file.filename;
        user.imageText = req.body.imageText;
        user.imagePath = 'https://'+req.headers.host+'/img/'+ req.file.filename;
        user.save((error) => {
            console.log(error)
            if (error) {
                res.status(400).send({ status: false, message: error });
            } else {
                res.status(200).send({ status: true, message: 'Image Added Sucessfully' });
            }
        })
    });
}
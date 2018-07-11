let cors = require('cors')
// let UPLOAD_CONTROLLER = require('../routes/controller');
const express = require('express');
let Imagemodel = require('../schema/schema');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
});

module.exports = function (app) {
    'use-strict'
    var upload = multer({ storage: storage });
    app.post('/imageADD', upload.single('image'), (req, res, next) => {
        
            console.log(upload.single('image'));

        if (req.body.imageText == null || req.body.imageText == undefined || req.body.imageText == '') {
            fs.unlink('./uploads/image-1531223895714images.jpg' , function (err) {
                if (err && err.code == 'ENOENT') {
                    // file doens't exist
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    // other errors, e.g. maybe we don't have enough permission
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });

            res.status(200).send({ status: false, message: 'Please provide text' });
        } else if (req.file == null) {
            res.status(200).send({ status: false, message: 'Please provide image ' });
        }
        else {
            let user = Imagemodel();
            user.imageName = req.file.filename;
            user.imageText = req.body.imageText;
            user.imagePath = 'https://' + req.headers.host + '/img/' + req.file.filename;

            user.save((error) => {
                            if (error) {
                    res.status(400).send({ status: false, message: error });
                } else {
                    res.status(200).send({ status: true, message: 'Image Added Sucessfully' });
                }
            })

        }
    });


    app.post('/listimage', cors(), (req, res, next) => {
        try {
            const uploads = './uploads/';
            fs.readdir(uploads, (err, files) => {
                files.forEach(file => {
                  console.log(file);
                });
              })


            Imagemodel.find({}).then((responseData, resposneError) => {
                res.status(200).send({ data: responseData });
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ message: err })
        }
    });


    app.post('/listimage', (req, res) => {
        
        const path = './uploads/image-1531291141005nvm.png';

        fs.unlink(path , function (err) {
            if (err && err.code == 'ENOENT') {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
            } else {
                console.info(`removed`);
            }
        });


    });




}
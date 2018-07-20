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
function errorMiddleWare(req, res, next) {
    console.log(req.body);
    console.log(req.body);

    if (req.body === null || req.body === undefined) {
        res.status(200).send('Please Provide Appropriate Data');
    } else {
        next();
    }
}
module.exports = function (app) {
    'use-strict'
    var upload = multer({ storage: storage });
    app.post('/imageADD', upload.single('image'), (req, res, next) => {

        var removeImage = () => {
            const uploads = './uploads/' + req.file.filename;
            fs.unlink(uploads, function (err) {
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
        } 

        console.log(req.file);
        if (req.body.ImageText == null || req.body.ImageText == undefined || req.body.ImageText == '') {
            removeImage();
            res.status(200).send({ status: false, message: 'Please provide text' });
        } else if (req.file == null || req.file == undefined) {
            res.status(200).send({ status: false, message: 'Please provide image ' });
        } else if(req.file.mimetype !=='image/png' &&  req.file.mimetype !=='image/jpeg') {
            removeImage();
            res.status(200).send({status : false , message : 'Please provide appropriate image file' });
        }
        else {
            let user = Imagemodel();
           
            user.image_name = req.file.filename;
            user.image_text = req.body.ImageText;
            user.image_path = 'https://' + req.headers.host + '/img/' + req.file.filename;
            user.image_collection_type = req.body.ImageCollectionType;
            user.image_type = req.file.mimetype; 
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

            Imagemodel.find({}).then((responseData, resposneError) => {
                res.status(200).send({ data: responseData });
            });
        } catch (err) {
            console.log(err);
            return res.status(400).send({ message: err })
        }
    });

    // All File Remove
    app.post('/deleteALLimage', (req, res) => {

        const delTotal = 0;
        const uploads = './uploads/';
        fs.readdir(uploads, (err, files) => {
            if (files.length > 0) {
                files.forEach((singleFile) => {
                    const path = uploads + singleFile;
                    fs.unlink(path, (err) => {
                        if (err) {
                            conosle.error(err);

                        } else {
                            delTotal = delTotal + 1;
                        }
                    });
                    if (delTotal === files.length) {
                        res.status(200).send(' Total ' + delTotal + 'Files Removed');
                    } else {
                        res.status(500).send('Something went wrong');

                    }
                });
            } else {
                res.status(200).send('No Files Added already');
            }

        });
    });

    app.post('/deoneimage', upload.fields([]), (req, res) => {

        let findFlag = 0;
        const reqImagepath = req.body.reqImagePath;
        console.log(reqImagepath);
        const uploads = './uploads/';
        fs.readdir(uploads, (err, files) => {
            files.forEach((storageFiles) => {
                if (storageFiles === reqImagepath) {
                    findFlag = 1;
                }
            });
            resCall(findFlag);
        });

        function resCall(findFlag) {
            console.log(findFlag);
            if (findFlag === 1) {
                console.log(reqImagepath);
                const uploads = './uploads/';
                fs.unlink(uploads + reqImagepath, (err) => {
                    if (err) {
                        res.status(200).send({ status: false, message: 'Something went wrong while image removing' });
                    } else {
                        res.status(200).send({ status: true, message: 'Image Removed Sucessfully' });
                    }

                });
            } else {
                res.status(200).send({ status: true, message: 'File not found' });
            }
        }

    });

}
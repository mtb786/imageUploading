
let Imagemodel = require('../../schema/schema');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
module.exports = {
    AddImage: function (req, res) {
        console.log('iiii');
        try {
         
        } catch (err) {
            return res.status(400).send({ message: error });
        }
    }
}
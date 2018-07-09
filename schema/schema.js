let mongo = require('mongoose');

let user = mongo.Schema({
    imageText : {
    type : String,
    required : true
},
imageName : {
    type : String,
    required : true
},
imagePath : {
    type : String,
    required : true
}
});
module.exports = mongo.model('imageupload', user);
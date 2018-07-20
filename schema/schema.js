let mongo = require('mongoose');

let user = mongo.Schema({
    image_text : {
    type : String,
    required : true
},
image_name : {
    type : String,
    required : true
},
image_path : {
    type : String,
    required : true
},
image_collection_type : {
  type : String,
  required : true
},
image_type : {
 type : String,
 required : true   
}
});
module.exports = mongo.model('imageupload', user);
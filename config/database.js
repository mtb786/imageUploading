var mongo = require('mongoose');

 global.APP_DATABASE = {
    database : function()  {
        var url =`mongodb://mtb13:${encodeURIComponent('qwerty123')}@ds131551.mlab.com:31551/imageupload`; 
        mongo.Promise = global.Promise;
        mongo.connect(url,  { useNewUrlParser: true } ,function(err) {
        if(err) {
            console.error('Database Unable To Connect');
        } else {
            console.log('Database Is Connected with mlab')
        }
        });
        
     }
 }
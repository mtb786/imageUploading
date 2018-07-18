var port = process.env.PORT || '8080';
var express = require('express');

global.IMAGEUPLOAD_APP= {
 app : express(),
 requirePath : function() {
     console.log('pathReqired');
   return require('../routes/routes')(this.app); 
 },
 start: function()  {
    this.app.listen(port, () => {
        console.log(`Server started on port`);
       
    }); 
 }      
}




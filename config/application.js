
var express = require('express');
let path = require('path');
global.IMAGEUPLOAD_APP= {
 app : express(),
 requirePath : function() {
     console.log('pathReqired');
   return require('../routes/routes')(this.app); 
 }   
}




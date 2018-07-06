const express = require('express');
const app = express();

app.use('*',(req,res) => {
console.log('hello');
res.send('hello');
} );

app.listen(config.port || 5000);

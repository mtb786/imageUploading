const express = require('express');
const app = express();

app.use('*',(req,res) => {
console.log('hello');
res.send('hello');
} );
const PORT = process.env.PORT ||'8080';

app.listen(PORT);

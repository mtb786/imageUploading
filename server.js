const express = require('express');
const app = express();

app.use('*',(req,res) => {
console.log('Hello Karan ');
res.send('hello');
} );
const PORT = process.env.PORT ||'8080';

app.listen(PORT);

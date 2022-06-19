const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});

app.listen(3000,()=>{
    console.log("Server started listening on port 3000...")
});
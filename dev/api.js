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

app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createtransaction(req.body.amount,req.body.sender,req.body.recipient);
    res.json({"note":`Transaction will be added in block ${blockIndex}`});
  });

app.listen(3000,()=>{
    console.log("Server started listening on port 3000...")
});
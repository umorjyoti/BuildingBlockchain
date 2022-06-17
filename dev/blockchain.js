const sha256=require('sha256');

function Blockchain(){
    this.chain=[];
    this.pendingTransactions=[];

    this.createNewBlock(100,"0","0")
}

Blockchain.prototype.createNewBlock = function (nonce,prevBlockHash,hash){
    const newBlock={
        index:this.chain.length+1,
        timestamp:Date.now(),
        transaction:this.pendingTransactions,
        nonce:nonce,
        prevBlockHash:prevBlockHash,
        hash:hash,
    }

    this.pendingTransactions=[];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastblock=function(){
    return this.chain[this.chain.length-1];
}

Blockchain.prototype.createtransaction = function(amount,sender,recipient){
    const transaction={
        amount:amount,
        sender:sender,
        recipient:recipient,
    }

    this.pendingTransactions.push(transaction);

    return this.getLastblock()['index'] + 1;
}

Blockchain.prototype.hashBlock = function(prevBlockHash,currentBlockData,nonce){
    const dataAsString = prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash=sha256(dataAsString);

    return hash;
}

Blockchain.prototype.proofOfWork= function(prevBlockHash,currentBlockData){
    let nonce=0;
    let hash=this.hashBlock(prevBlockHash,currentBlockData,nonce);
    while(hash.substring(0,4)!== "0000"){
        nonce++;
        hash=this.hashBlock(prevBlockHash,currentBlockData,nonce);
    }
    return nonce;
}

module.exports=Blockchain;
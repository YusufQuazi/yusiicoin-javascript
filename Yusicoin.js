const SHA256 = require('crypto-js/SHA256')

class Block
{
  constructor(index, timestamp, data, perviousHash='')
  {
      this.index = index;
      this.data = data;
      this.timestamp = timestamp;
      this.previousHash = perviousHash;

      this.hash = this.claculateHash();
    }
  claculateHash()
  {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}
  class Blockchain
  {
    constructor()
    {
      this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock()
    {
      return new Block(0 , "01/01/2017", "Genesis block", "0");
    }

    getLatestBlock()
    {
      return this.chain[this.chain.length - 1];
    }

    addBlock(NewBlock)
    {
      NewBlock.previousHash = this.getLatestBlock().hash;
      NewBlock.hash = NewBlock.claculateHash();
      this.chain.push(NewBlock)
    }

    isChainValid()
    {

      //this.chain = [this.createGenesisBlock()];

      for (let i = 1; i < this.chain.length; i++)
      {
        const currentblock = this.chain[i];
        const previousblock = this.chain[i - 1];


          if(currentblock.hash !== currentblock.claculateHash())
          {
            return false;
          }

          if(currentblock.previousHash !== previousblock.hash)
          {
            return false;
          }
      }
      return true;
    }
  }

  let yusicoin = new Blockchain();
  yusicoin.addBlock(new Block(1,"01/01/2017",{amount:4}));
  yusicoin.addBlock(new Block(2,"11/01/2017",{amount:10}));

  console.log('Is Blockchain Valid ?'+ yusicoin.isChainValid());
  //console.log(JSON.stringify(yusicoin,null, 4));
  yusicoin.chain[1].data = {amount : 100};

  console.log('Is Blockchain Valid ?'+ yusicoin.isChainValid());

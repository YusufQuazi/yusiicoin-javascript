const SHA256 = require("crypto-js/SHA256");

class transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
class Block
{
  constructor(timestamp, transaction, perviousHash='')
  {
      //this.index = index;
      this.transaction = transaction;
      this.timestamp = timestamp;
      this.previousHash = perviousHash;
      this.nounce = 0;
      this.hash = this.claculateHash();
    }
  claculateHash()
  {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce).toString();
  }

  mineBlock(difficulty)
  {
      while (this.hash.substring(0,difficulty) != Array(difficulty + 1).join("0")) {
          this.nounce++;
          this.hash = this.claculateHash();
      }
      console.log("Block Mined: " + this.hash);
  }
}

  class Blockchain
  {
    constructor()
    {
      this.chain = [this.createGenesisBlock()];
      this.difficulty = 2;
      this.pendingTransactions = [];
      this.miningRewards = 100;
    }

    createGenesisBlock()
    {
      return new Block("01/01/2017", "Genesis block", "0");
    }

    getLatestBlock()
    {
      return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardsAddress){
      let block = new Block(Date.now(), this.pendingTransactions);
      block.mineBlock(this.difficulty);

      console.log("Block Mined Successfully!");
      this.chain.push(block);

      this.pendingTransactions = [
        new transaction (null, miningRewardsAddress, this.miningRewards)
      ];
    }

    createTransactions(transaction){
      this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
      let balance = 0;

      for (const block of this.chain)
      {
        for (const trans of block.transaction)
        {
            if( trans.fromAddress === address)
            {
              balance -= trans.amount;
            }

            if( trans.fromAddress === address)
            {
              balance += trans.amount;
            }
        }
        return balance;
      }


    }
    //addBlock(NewBlock)
    //{
      //NewBlock.previousHash = this.getLatestBlock().hash;
      //NewBlock.mineBlock(this.difficulty);
      ////NewBlock.hash = NewBlock.claculateHash();
    //  this.chain.push(NewBlock)
    //}

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


  //console.log('Is Blockchain Valid ?'+ yusicoin.isChainValid());
  //console.log(JSON.stringify(yusicoin,null, 4));
  //yusicoin.chain[1].data = {amount : 100};
  //console.log('Is Blockchain Valid ?'+ yusicoin.isChainValid());

  //proofOfWork

  //console.log("Mining Block 1....");
  //yusicoin.addBlock(new Block(1,"01/01/2017",{amount:4}));
  //console.log("Mining Block 2...");
  //yusicoin.addBlock(new Block(2,"11/01/2017",{amount:10}));

  //minePendingTransactions

  yusicoin.createTransactions(new transaction("Ad1","Ad2",100))
  yusicoin.createTransactions(new transaction("Ad1","Ad2",50))

  console.log('\n Starting the miner..');
  yusicoin.minePendingTransactions('yusuf-address');

  console.log('\n balance of yusuf is',yusicoin.getBalanceOfAddress('yusuf-address'));

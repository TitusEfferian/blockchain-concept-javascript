const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.previousHash = previousHash
        this.timestamp = timestamp
        this.data = data
        this.hash = this.calculateHash()
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }
    createGenesisBlock() {
        return new Block(0, new Date(), "Genesis Block", "0")
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid() {
        for (let a = 1; a < this.chain.length; a++) {
            const currentBlock = this.chain[a]
            const previousBlock = this.chain[a - 1]
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
            return true
        }
    }
}

let BlockChain = new Blockchain()

BlockChain.addBlock(new Block(1, new Date(), { data: 'this is my first block' }))
BlockChain.addBlock(new Block(2, new Date(), { data: 'this is my second block' }))

console.log(BlockChain.chain)
console.log(BlockChain.isChainValid())
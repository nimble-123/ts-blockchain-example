import { Blockdata } from './Block';
import { Blockchain } from './Blockchain';

// create a new blockchain
const blockchain = Blockchain.create(3 /* difficulty */, 10000 /* blockTime in ms */);

// add transactions for first block data
const firstBlockdata: Blockdata = {
    transactions: [
        { from: 'Alice', to: 'Bob', amount: 10 },
        { from: 'Bob', to: 'Alice', amount: 5 }
    ]
};

// add transactions for second block data
const secondBlockdata: Blockdata = {
    transactions: [{ from: 'John', to: 'Jane', amount: 100 }]
};

// add blocks to the chain
blockchain.addBlock(firstBlockdata);
blockchain.addBlock(secondBlockdata);

// log out current state of the blockchain
console.log('Blockchain state after adding two blocks:');
console.dir(blockchain, { depth: null, colors: true });

// check if blockchain is valid
console.log(blockchain.isValid()); // true - since we haven't tampered with it

// tampering with the chain, i.e. the evil hacker would do this to get rich
blockchain.chain[1].data.transactions[0] = {
    from: 'Alice',
    to: 'Bob',
    amount: 100,
    comment: 'evil hacker tampered the original tx'
};
blockchain.chain[2].data.transactions.push({
    from: 'Alice',
    to: 'Hacker',
    amount: 100,
    comment: 'evil hacker injected this tx'
});

// log out state of the blockchain after tampering with it
console.log('Blockchain state after tampering:');
console.dir(blockchain, { depth: null, colors: true });

// check if blockchain is still valid after tampering with it
console.log(blockchain.isValid()); // false - tampered with the blockchain

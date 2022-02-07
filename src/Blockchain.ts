import { Block, Blockdata } from './Block';

export class Blockchain {
    public genesisBlock: Block;
    public chain: Block[];
    public difficulty: number;
    public blockTime: number;

    constructor(genesisBlock: Block, chain: Block[], difficulty: number, blockTime: number) {
        this.genesisBlock = genesisBlock;
        this.chain = chain;
        this.difficulty = difficulty;
        this.blockTime = blockTime;
    }

    public addBlock(data: Blockdata): void {
        const blockData = data;
        const lastBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(blockData, lastBlock.hash);

        // mine the newly created block and add to chain
        newBlock.mine(this.difficulty);
        this.chain.push(newBlock);

        // adjust difficulty according to mining speed
        this.difficulty += Date.now() - newBlock.timestamp.getTime() > this.blockTime ? -1 : 1;
    }

    public isValid(): Boolean {
        if (this.chain.length === 1) return true;
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];
            if (
                currentBlock.hash !== Block.calculateHash(currentBlock) ||
                previousBlock.hash !== currentBlock.previousHash
            )
                return false;
        }
        return true;
    }

    static create(difficulty: number, blockTime: number): Blockchain {
        const genesisBlockData: Blockdata = {
            transactions: [{ from: '', to: '', amount: 0 }]
        };
        const genesisBlock = new Block(genesisBlockData, '');

        return new Blockchain(genesisBlock, [genesisBlock], difficulty, blockTime);
    }
}

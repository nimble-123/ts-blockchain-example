import { createHash } from 'crypto';

export type Transaction = {
    from: string;
    to: string;
    amount: number;
    comment?: string;
};

export type Blockdata = {
    transactions: Transaction[];
};

export class Block {
    data: Blockdata;
    hash: string;
    previousHash: string;
    timestamp: Date;
    pow: number;

    constructor(data: Blockdata, previousHash: string) {
        this.data = data;
        this.hash = '0';
        this.previousHash = previousHash;
        this.timestamp = new Date();
        this.pow = 0;
    }

    public mine(difficulty: number): void {
        // create a regex with template literal string to dynamically reflect the difficulty
        const regex = new RegExp(`^(0){${difficulty}}.*`);

        // recalculate the hash as long as the hash not matches the regex
        while (!this.hash.match(regex)) {
            this.pow++;
            this.hash = Block.calculateHash(this);
        }
    }

    static calculateHash(block: Block): string {
        const blockData = JSON.stringify(block.data);
        const hashInput = blockData + block.previousHash + block.timestamp.toISOString() + block.pow.toString();

        return createHash('sha256').update(hashInput).digest('hex');
    }
}

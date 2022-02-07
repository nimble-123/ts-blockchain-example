# A simple blockchain implementation in Typescript

It just shows the internals of a [proof-of-work](https://en.wikipedia.org/wiki/Proof_of_work) blockchain in a very simplificated manner.

This is purely for fun and demo purposes. Feel free to do anything you want with it! It is missing the whole p2p-networking part and of course the choosen hashing algorithm is not what you would normaly expect from a production ready blockchain.

## What the demo does

It creates a blockchain instance with a [difficulty](https://www.blockchain.com/charts/difficulty) of `3` and a [blocktime](https://www.investopedia.com/terms/b/block-time-cryptocurrency.asp) of `10` seconds.
After that it creates two blocks with three transactions overall.

Block `1` consists of the below two transactions:

-   `Alice` sends `Bob` an amount of `10` units.
-   `Bob` sends `Alice` an amount of `5` units

Block `2` will hold the last transaction:

-   `John` sends `Jane` an amount of `100` units.

When these two blocks are mined and added to the chain, we will output the current state of our blockchain.

Now a malicous entity, let's call him `Evil hacker`, is tampering with our blockchain.
`Evil hacker` changes the first transaction of block `1` and injects a second transaction to block `2`.

We output the state of our blockchain again and voilà our hash-based validation is saying that the chain is not valid anymore!

You should see a similar output like this

![Terminal output](example-output.png)

## Try it yourself

### Prerequisites

-   Node.js installed
-   A code-editor like VScode

Clone the project

```bash
  git clone https://github.com/nimble-123/ts-blockchain-example.git
```

Go to the project directory

```bash
  cd ts-blockchain-example
```

Install dependencies

```bash
  yarn install
```

Transpile Typescript to JavaScript

```bash
  yarn build:ts
```

Start the demo

```bash
  yarn start
```

---

## License

[MIT](LICENSE)

Copyright (c) 2022 Nils Lutz

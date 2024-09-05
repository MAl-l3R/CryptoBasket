# CryptoBasket

## Overview
This project is a decentralized marketplace inspired by Amazon, built on the Ethereum blockchain using smart contracts. Users can list products and purchase them using cryptocurrency, with transactions recorded on the blockchain. The marketplace is powered by Solidity smart contracts, and images are hosted on the InterPlanetary File System (IPFS) for decentralized storage. The front-end is built with React.js, and blockchain interactions are handled via Ethers.js.

Users can connect their wallets (e.g., MetaMask) to interact with the marketplace, allowing for seamless cryptocurrency transactions. The marketplace can be deployed to any Ethereum-compatible blockchain network.

## Technology Stack & Tools

- Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [React.js](https://reactjs.org/) (Frontend Framework)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Run tests
`$ npx hardhat test`

### 4. Start Hardhat node
`$ npx hardhat node`

### 5. Run deployment script
In a separate terminal execute:
`$ npx hardhat run ./scripts/deploy.js --network localhost`

### 6. Start frontend
`$ npm run start`

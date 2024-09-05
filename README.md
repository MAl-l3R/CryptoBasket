# CryptoBasket

## Overview
This project is a decentralized marketplace built on the Ethereum blockchain, allowing users to list and purchase products using cryptocurrency. It mimics e-commerce platforms like Amazon but utilizes blockchain technology and smart contracts to handle transactions.

## Features
- Blockchain-Powered: All transactions occur on the Ethereum blockchain using Solidity smart contracts.
- Cryptocurrency Payments: Users can buy and sell items using Ether (ETH) or other compatible cryptocurrencies.
- Decentralized Storage: Product images are stored and referenced using IPFS (InterPlanetary File System), ensuring decentralized file storage.
- Smart Contracts: Manages product listings, purchases, and orders.

## Technology Stack
- Solidity: For writing smart contracts.
- ReactJS: Frontend framework for building the marketplace UI.
- Ethers.js: Blockchain interaction for communicating with the Ethereum network.
- IPFS: Decentralized file storage for hosting product images.

## Development Tools
- Hardhat: A powerful development environment for Ethereum smart contracts. Hardhat provides local Ethereum blockchain (Hardhat Network) for testing, as well as tools for compiling, testing, deploying, and debugging smart contracts.
- Mocha & Chai: Used for testing smart contracts with assertion functions like expect, should, and assert from the Chai library.

## Getting Started
### Prerequisites
- NodeJS: Make sure to install Node.js before setting up the project.

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

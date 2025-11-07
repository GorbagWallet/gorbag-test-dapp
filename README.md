# TrashMarket - Gorbagana Test DApp

This is a test DApp marketplace built to test the Gorbag wallet extension connection functionality. It allows users to connect their Gorbag wallet, view their balance, and perform mock transactions (self-to-self transfers) to test the wallet integration.

## Features

- Wallet connection/disconnection functionality
- Display of connected wallet address and balance
- Mock marketplace with sample NFTs
- Mock transaction functionality (transfers a small amount to self)
- Product filtering by category

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing Wallet Connection

1. Make sure you have the Gorbag wallet extension installed and configured
2. Visit the site and click "Connect Wallet" button
3. Approve the connection in the extension
4. You should see your wallet address displayed
5. Try purchasing an item to test transaction functionality

## Architecture

- Built with Next.js
- Uses @gorbag/wallet-adapter and @gorbag/wallet-adapter-base packages
- Implements standard Solana wallet adapter interface
- Mock transactions to test wallet functionality
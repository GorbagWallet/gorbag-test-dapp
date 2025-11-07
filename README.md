# TrashMarket - Gorbagana Test DApp

This is a test DApp marketplace built to test the Gorbag wallet extension connection functionality. It allows users to connect their Gorbag wallet, view their balance, and perform real transactions settled on the Gorbagana testnet to test the wallet integration.

## Features

- Wallet connection/disconnection functionality
- Display of connected wallet address and balance
- Mock marketplace with sample NFTs
- Transaction functionality (transfers a small amount to self)
- Product filtering by category

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Copy your `.example.env` to your `.env` and set the Merchant/Store Address Parameter. This is the address that'd receive the funds of the mock NFT you're paying for
```
MERCHANT_ADDRESS=A-VALID-GORBAGANA-ADDRESS # a valid address that'll receive the funds of the items in the trashmarket
NETWORK=testnet
RPC_URL=A-VALID-RPC-URL # you can use the official one provided by the Gorbagana Team i.e. https://rpc.gorbagana.wtf
```

3. Run the development server:
```bash
npx next dev --webpack
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing Wallet Connection

1. Make sure you have the Gorbag wallet extension [installed](https://gorbag.vercel.app/get-extension) and configured
2. Visit the site and click "Connect Wallet" button
3. Switch to your desired wallet(if you have multiple) and Approve the connection in the extension
4. You should see your wallet address displayed
5. Try purchasing an item to test transaction functionality. Don't have funds(testnet GOR), [claim here](https://faucet.gorbagana.stf)

## Architecture

- Built with Next.js `16`
- Uses [@gorbag/wallet-adapter](https://npmjs.com/package/@gorbag/wallet-adapter),  [@solana/wallet-adapter-react](https://npmjs.com/package/@solana/wallet-adapter-react) packages
- Implements standard [Solana wallet adapter](https://github.com/anza-xyz/wallet-adapter) interface
- Real transactions on testnet to test wallet functionality

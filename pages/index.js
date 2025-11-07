import { useState } from 'react';
import Head from 'next/head';
import { WalletMultiButton } from '../components/WalletMultiButton';
import ProductList from '../components/ProductList';
import WalletInfo from '../components/WalletInfo';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>TrashMarket - Gorbagana NFT Marketplace</title>
        <meta name="description" content="Gorbagana-powered marketplace for buying and selling NFTs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-800">TrashMarket</h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Home</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Marketplace</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">Collections</a></li>
                <li><a href="#" className="text-gray-700 hover:text-indigo-600">My Items</a></li>
              </ul>
            </nav>
            <WalletMultiButton onConnect={() => setWalletConnected(true)} onDisconnect={() => setWalletConnected(false)} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to TrashMarket
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 md:mt-5">
            Buy and sell NFTs on the Gorbagana blockchain
          </p>
        </div>

        <WalletInfo />
        
        <ProductList />
      </main>

      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                Security
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2025 TrashMarket. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
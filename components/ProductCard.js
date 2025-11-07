import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, Transaction, SystemProgram, PublicKey, TransactionExpiredBlockheightExceededError } from '@solana/web3.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

const trackTransaction = async (signature, connection) => {
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

  const confirmationStrategy = {
    signature: signature,
    blockhash: blockhash,
    lastValidBlockHeight: lastValidBlockHeight
  };

  try {
    await connection.confirmTransaction(confirmationStrategy, 'confirmed');
    toast.success('Transaction confirmed!');
  } catch (error) {
    if (error instanceof TransactionExpiredBlockheightExceededError) {
      toast.error('Transaction failed to confirm.');
    }
  }
};

const ProductCard = ({ product }) => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = async () => {
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsBuying(true);

    const transactionPromise = (async () => {
      try {
        const rpcUrl = process.env.RPC_URL || 'https://rpc.gorbagana.wtf';
        const connection = new Connection(rpcUrl, 'confirmed');
        
        const merchantAddress = process.env.NEXT_PUBLIC_MERCHANT_ADDRESS;
        if (!merchantAddress) {
          toast.error('Merchant address is not configured. Please set NEXT_PUBLIC_MERCHANT_ADDRESS in your .env file.');
          setIsBuying(false);
          return;
        }
        const merchantPublicKey = new PublicKey(merchantAddress);
        
        const priceInLamports = Math.floor(product.price * 1_000_000_000);
        
        const { blockhash } = await connection.getLatestBlockhash('confirmed');
        
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: merchantPublicKey,
            lamports: priceInLamports,
          })
        );
        
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = publicKey;
        
        const signature = await sendTransaction(transaction, connection, {
          skipPreflight: true,
          maxRetries: 50,
        });
        
        trackTransaction(signature, connection);

        return signature;
      } catch (error) {
        console.error('Transaction failed:', error);
        throw error; // Re-throw to be caught by toast.promise
      }
    })();

    toast.promise(
      transactionPromise,
      {
        loading: 'Processing transaction...',
        success: (signature) => (
          <b>
            Transaction submitted!{' '.toString()}
            <a href={`https://explorer.gorbagana.wtf/tx/${signature}`} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300">
              View on Explorer
            </a>
          </b>
        ),
        error: <b>Transaction failed.</b>,
      }
    ).finally(() => {
      setIsBuying(false);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">{product.price}</span>
            <span className="ml-1">
              <img 
                src="/token-icons/gor.jpg" 
                alt="GOR" 
                className="w-6 h-6"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%237C3AED'/%3E%3Ctext x='12' y='16' text-anchor='middle' fill='white' font-size='12' font-family='Arial' font-weight='bold'%3EG%3C/text%3E%3C/svg%3E";
                }}
              />
            </span>
          </div>
          <span className="text-sm text-gray-500">by {product.owner}</span>
        </div>
        
        <button
          onClick={handleBuy}
          disabled={isBuying || !connected}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            connected 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isBuying ? 'Processing...' : connected ? 'Buy Now' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
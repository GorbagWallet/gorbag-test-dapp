import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { GorbagWalletAdapter } from '@gorbag/wallet-adapter';

// Styles for the wallet adapter UI
require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletProvider = ({ children }) => {
  // Initialize the Gorbag wallet adapter
  const wallets = useMemo(() => [
    new GorbagWalletAdapter({})
  ], []);

  // Using Gorbagana RPC endpoint (replace with actual Gorbagana endpoint)
  const endpoint = 'https://rpc.gorbagana.wtf'; // Testnet Gorbagana endpoint

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};

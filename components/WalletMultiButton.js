import { WalletMultiButton as SolanaWalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const WalletMultiButton = ({ onConnect, onDisconnect }) => {
  return (
    <SolanaWalletMultiButton 
      style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        border: 'none',
        borderRadius: '9999px',
        color: 'white',
        padding: '1rem 1.5rem',
        fontWeight: '600',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onClick={() => {
        // Handle connect/disconnect callbacks if needed
        // The SolanaWalletMultiButton handles the connection logic
      }}
    />
  );
};
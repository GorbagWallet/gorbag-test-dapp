import '../styles/globals.css';
import { WalletProvider } from '../components/WalletProvider';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Toaster />
      <Component {...pageProps} />
    </WalletProvider>
  );
}
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { blockchainService } from '../blockchain/blockchain-service';

interface BlockchainContextType {
  walletAddress: string | null;
  isConnected: boolean;
  isMetaMaskInstalled: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  error: string | null;
  loading: boolean;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export function BlockchainProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    setIsMetaMaskInstalled(blockchainService.isMetaMaskInstalled());

    // Check if already connected
    const checkConnection = async () => {
      if (blockchainService.isConnected()) {
        const address = await blockchainService.getWalletAddress();
        if (address) {
          setWalletAddress(address);
          setIsConnected(true);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;
      
      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected wallet
          disconnectWallet();
        } else {
          // User switched accounts
          setWalletAddress(accounts[0]);
        }
      });

      ethereum.on('chainChanged', () => {
        // Reload page on network change
        window.location.reload();
      });
    }
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      const address = await blockchainService.connectWallet();
      setWalletAddress(address);
      setIsConnected(true);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    blockchainService.disconnect();
    setWalletAddress(null);
    setIsConnected(false);
  };

  return (
    <BlockchainContext.Provider
      value={{
        walletAddress,
        isConnected,
        isMetaMaskInstalled,
        connectWallet,
        disconnectWallet,
        error,
        loading,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
}

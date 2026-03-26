import { useBlockchain } from '../context/BlockchainContext';
import { Wallet, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

export default function WalletConnect() {
  const { 
    walletAddress, 
    isConnected, 
    isMetaMaskInstalled, 
    connectWallet, 
    disconnectWallet, 
    error, 
    loading 
  } = useBlockchain();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900 mb-2">
              MetaMask Not Installed
            </p>
            <p className="text-xs text-amber-700 mb-3">
              To use blockchain verification features, please install MetaMask wallet extension.
            </p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Install MetaMask
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isConnected && walletAddress) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-900 mb-1">
              Wallet Connected
            </p>
            <p className="text-xs text-green-700 font-mono mb-3">
              {formatAddress(walletAddress)}
            </p>
            <button
              onClick={disconnectWallet}
              className="text-xs text-green-700 hover:text-green-900 font-medium underline"
            >
              Disconnect
            </button>
          </div>
          <div className="flex items-center gap-1 bg-green-100 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-700">Active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Wallet className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-purple-900 mb-1">
            Connect Blockchain Wallet
          </p>
          <p className="text-xs text-purple-700 mb-3">
            Connect your MetaMask wallet to register certifications on blockchain and enable fraud detection.
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}
          
          <button
            onClick={connectWallet}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4" />
                Connect MetaMask
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

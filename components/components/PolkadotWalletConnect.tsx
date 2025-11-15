'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

interface PolkadotWalletConnectProps {
  onAccountChange?: (account: InjectedAccountWithMeta | null) => void;
}

export default function PolkadotWalletConnect({ onAccountChange }: PolkadotWalletConnectProps) {
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Client-side only - check if already connected on mount
    if (typeof window === 'undefined') return;
    
    const storedAddress = localStorage.getItem('polkadotWalletAddress');
    const demoMode = localStorage.getItem('demoMode');
    
    if (demoMode === 'true') {
      enableDemoMode();
    } else if (storedAddress) {
      connectWallet(storedAddress);
    } else {
      // Auto-detect wallet and enable demo mode if not found
      checkForWalletAndAutoDemo();
    }
  }, []);

  const checkForWalletAndAutoDemo = async () => {
    try {
      // Quick check for wallet extensions
      const hasWallet = await Promise.race([
        new Promise<boolean>((resolve) => {
          // Check if window.injectedWeb3 exists (Polkadot wallets)
          if (typeof window !== 'undefined') {
            const checkInterval = setInterval(() => {
              if ((window as any).injectedWeb3 && Object.keys((window as any).injectedWeb3).length > 0) {
                clearInterval(checkInterval);
                resolve(true);
              }
            }, 100);
            
            // Timeout after 2 seconds
            setTimeout(() => {
              clearInterval(checkInterval);
              resolve(false);
            }, 2000);
          } else {
            resolve(false);
          }
        })
      ]);

      if (!hasWallet) {
        // No wallet detected, auto-enable demo mode after 3 seconds
        console.log('⚠️ No Polkadot wallet detected. Enabling Demo Mode in 3 seconds...');
        setTimeout(() => {
          enableDemoMode();
          console.log('✅ Demo Mode activated automatically');
        }, 3000);
      }
    } catch (error) {
      console.error('Error checking for wallet:', error);
    }
  };

  const enableDemoMode = () => {
    const demoAccount = {
      address: '5GDemo1234567890DemoAccountForTesting',
      meta: {
        name: 'Demo Account (Testing)',
        source: 'demo'
      },
      type: 'sr25519'
    } as InjectedAccountWithMeta;
    
    setSelectedAccount(demoAccount);
    setIsConnected(true);
    setIsDemoMode(true);
    setShowWalletOptions(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('polkadotWalletAddress', demoAccount.address);
      localStorage.setItem('demoMode', 'true');
    }
    
    if (onAccountChange) {
      onAccountChange(demoAccount);
    }
  };

  const connectWallet = async (preselectedAddress?: string) => {
    setIsConnecting(true);
    setError(null);

    try {
      // Request access to Polkadot extension (with timeout)
      const extensions = await Promise.race([
        web3Enable('SLALOM Protocol'),
        new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 5000))
      ]);

      if (extensions.length === 0) {
        setError('No Polkadot wallet found. Please install Polkadot.js, Talisman, or Subwallet extension.');
        setIsConnecting(false);
        return;
      }

      console.log('✅ Extensions found:', extensions.map(e => e.name).join(', '));

      // Get all accounts from extension (with error handling)
      let allAccounts: InjectedAccountWithMeta[] = [];
      
      try {
        allAccounts = await web3Accounts();
      } catch (accountError: any) {
        console.error('Error getting accounts:', accountError);
        
        if (accountError.message?.includes('not been configured') || 
            accountError.message?.includes('onboarding')) {
          setError('Please complete wallet setup first. Open your wallet extension and finish onboarding.');
        } else {
          setError('Failed to access wallet accounts. Please check your wallet extension.');
        }
        
        setIsConnecting(false);
        return;
      }

      if (allAccounts.length === 0) {
        setError('No accounts found. Please create or import an account in your wallet extension.');
        setIsConnecting(false);
        return;
      }

      console.log('✅ Found', allAccounts.length, 'accounts');

      setAccounts(allAccounts);

      // Auto-select account if only one exists or preselected address provided
      if (preselectedAddress) {
        const account = allAccounts.find(acc => acc.address === preselectedAddress);
        if (account) {
          selectAccount(account);
        } else {
          setShowAccountSelector(true);
        }
      } else if (allAccounts.length === 1) {
        selectAccount(allAccounts[0]);
      } else {
        setShowAccountSelector(true);
      }

      setIsConnecting(false);
    } catch (err: any) {
      console.error('Error connecting to Polkadot wallet:', err);
      
      // Better error messages based on error type
      if (err.message?.includes('not been configured') || 
          err.message?.includes('onboarding')) {
        setError('⚠️ Please complete your wallet setup first. Open your Polkadot wallet extension and finish the onboarding process, then try again.');
      } else if (err.message?.includes('Rejected')) {
        setError('Connection rejected. Please approve the connection in your wallet.');
      } else if (err.message?.includes('not found') || err.message?.includes('No extension')) {
        setError('No Polkadot wallet detected. Please install Polkadot.js, Talisman, or Subwallet extension.');
      } else {
        setError(`Failed to connect: ${err.message || 'Unknown error'}. Please refresh the page and try again.`);
      }
      
      setIsConnecting(false);
    }
  };

  const selectAccount = (account: InjectedAccountWithMeta) => {
    setSelectedAccount(account);
    setIsConnected(true);
    setShowAccountSelector(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('polkadotWalletAddress', account.address);
      localStorage.setItem('demoMode', 'false');
    }
    
    if (onAccountChange) {
      onAccountChange(account);
    }
  };

  const disconnectWallet = () => {
    setSelectedAccount(null);
    setIsConnected(false);
    setAccounts([]);
    setIsDemoMode(false);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('polkadotWalletAddress');
      localStorage.removeItem('demoMode');
    }
    
    if (onAccountChange) {
      onAccountChange(null);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative">
      {/* Connect Button - Polkadot UI Inspired */}
      {!isConnected && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowWalletOptions(true)}
          disabled={isConnecting}
          className={`
            relative px-8 py-4 rounded-xl font-bold text-white
            bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600
            hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700
            transition-all duration-300
            shadow-2xl hover:shadow-purple-500/50
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-3
            border border-white/10
            overflow-hidden
            group
          `}
        >
          {/* Animated background shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          
          {/* Icon */}
          <svg 
            className="w-6 h-6 relative z-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
          
          {/* Text */}
          <span className="relative z-10">
            {isConnecting ? 'Connecting...' : 'Connect Polkadot Wallet'}
          </span>
          
          {/* Loading spinner */}
          {isConnecting && (
            <div className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
        </motion.button>
      )}

      {/* Connected Account Display */}
      {isConnected && selectedAccount && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 bg-neutral-900 border-2 rounded-lg px-4 py-3 shadow-lg ${
            isDemoMode ? 'border-yellow-500/50' : 'border-emerald-500/50'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isDemoMode ? 'bg-yellow-400' : 'bg-emerald-400'
            }`} />
            <div className={`text-xs font-semibold ${
              isDemoMode ? 'text-yellow-400' : 'text-emerald-400'
            }`}>
              {isDemoMode ? 'DEMO MODE' : 'CONNECTED'}
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="text-sm font-bold text-white">
              {selectedAccount.meta.name || 'Account'}
            </div>
            <div className="text-xs text-neutral-400 font-mono">
              {formatAddress(selectedAccount.address)}
            </div>
          </div>

          <button
            onClick={disconnectWallet}
            className="ml-auto px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold rounded transition-colors"
          >
            Disconnect
          </button>
        </motion.div>
      )}

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 right-0 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 max-w-md z-50 shadow-xl"
        >
          <div className="flex items-start gap-2">
            <span className="text-xl">❌</span>
            <div className="flex-1">
              <div className="font-bold mb-1">Connection Failed</div>
              <div>{error}</div>
              
              <div className="mt-3 pt-3 border-t border-red-500/20 text-xs">
                <div className="font-semibold mb-2">💡 Quick Fix:</div>
                <ul className="space-y-1 text-red-300">
                  <li>• Install Polkadot.js extension</li>
                  <li>• Complete wallet setup</li>
                  <li>• Create an account</li>
                  <li>• Refresh and try again</li>
                </ul>
              </div>
              
              <button
                onClick={() => setError(null)}
                className="mt-3 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded text-xs font-semibold"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Wallet Options Modal */}
      <AnimatePresence>
        {showWalletOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowWalletOptions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border-2 border-primary/40 rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span>🔗</span>
                <span>Connect Wallet</span>
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Choose how you want to connect to SLALOM Protocol
              </p>

              <div className="space-y-3">
                {/* Polkadot.js */}
                <button
                  onClick={() => {
                    setShowWalletOptions(false);
                    connectWallet();
                  }}
                  className="w-full text-left p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border-2 border-pink-500/30 hover:border-pink-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🔑</div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1 group-hover:text-pink-400 transition-colors">
                        Polkadot.js Extension
                      </div>
                      <div className="text-xs text-neutral-400">
                        Official Polkadot wallet browser extension
                      </div>
                    </div>
                    <div className="text-pink-400">→</div>
                  </div>
                </button>

                {/* Talisman */}
                <button
                  onClick={() => {
                    setShowWalletOptions(false);
                    connectWallet();
                  }}
                  className="w-full text-left p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border-2 border-purple-500/30 hover:border-purple-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">💎</div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                        Talisman Wallet
                      </div>
                      <div className="text-xs text-neutral-400">
                        Multi-chain wallet for Polkadot & Ethereum
                      </div>
                    </div>
                    <div className="text-purple-400">→</div>
                  </div>
                </button>

                {/* Subwallet */}
                <button
                  onClick={() => {
                    setShowWalletOptions(false);
                    connectWallet();
                  }}
                  className="w-full text-left p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border-2 border-emerald-500/30 hover:border-emerald-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🌊</div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                        SubWallet
                      </div>
                      <div className="text-xs text-neutral-400">
                        Comprehensive Web3 wallet for Polkadot
                      </div>
                    </div>
                    <div className="text-emerald-400">→</div>
                  </div>
                </button>

                {/* Demo Mode */}
                <button
                  onClick={() => {
                    setShowWalletOptions(false);
                    enableDemoMode();
                  }}
                  className="w-full text-left p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border-2 border-yellow-500/30 hover:border-yellow-500/50 rounded-xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🎮</div>
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                        Demo Mode (No Wallet)
                      </div>
                      <div className="text-xs text-neutral-400">
                        Try SLALOM without connecting a wallet
                      </div>
                    </div>
                    <div className="text-yellow-400">→</div>
                  </div>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-700">
                <p className="text-xs text-neutral-400 mb-3">
                  💡 Don't have a wallet? Install one:
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://polkadot.js.org/extension/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 rounded-lg transition-colors"
                  >
                    Get Polkadot.js
                  </a>
                  <a
                    href="https://talisman.xyz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 rounded-lg transition-colors"
                  >
                    Get Talisman
                  </a>
                  <a
                    href="https://subwallet.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 rounded-lg transition-colors"
                  >
                    Get SubWallet
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowWalletOptions(false)}
                className="mt-4 w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Selector Modal */}
      <AnimatePresence>
        {showAccountSelector && accounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAccountSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border-2 border-primary/40 rounded-xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔑</span>
                <span>Select Account</span>
              </h3>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {accounts.map((account) => (
                  <button
                    key={account.address}
                    onClick={() => selectAccount(account)}
                    className="w-full text-left p-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-primary/50 rounded-lg transition-all"
                  >
                    <div className="font-bold text-white mb-1">
                      {account.meta.name || 'Unnamed Account'}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono">
                      {formatAddress(account.address)}
                    </div>
                    {account.meta.source && (
                      <div className="text-xs text-neutral-500 mt-1">
                        Source: {account.meta.source}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAccountSelector(false)}
                className="mt-4 w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

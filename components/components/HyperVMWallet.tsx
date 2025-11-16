'use client';

import { useState, useEffect } from 'react';
import { hypervm } from '@/lib/hypervm/client';
import { motion, AnimatePresence } from 'framer-motion';

export default function HyperVMWallet() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already connected
    if (hypervm.isConnected()) {
      setConnected(true);
      setAddress(hypervm.getAddress());
      hypervm.getBalance().then(setBalance);
    }
  }, []);

  const connect = async () => {
    try {
      setLoading(true);
      const addr = await hypervm.connect();
      const bal = await hypervm.getBalance();
      
      setAddress(addr);
      setBalance(bal);
      setConnected(true);
    } catch (error) {
      console.error('Failed to connect:', error);
      alert('Failed to connect wallet: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      await hypervm.disconnect();
      setConnected(false);
      setAddress(null);
      setBalance(0);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  if (connected && address) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 backdrop-blur-sm"
      >
        <div className="relative">
          <div className="text-3xl">🔗</div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
        </div>
        
        <div className="flex-1">
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2">
            <span>Connected to HyperVM</span>
            <span className="px-2 py-0.5 bg-emerald-500/20 rounded-full text-[10px]">
              Avalanche Subnet
            </span>
          </div>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            {balance} SLALOM
            <span className="text-xs text-neutral-400 font-normal">
              ≈ ${(balance * 0.5).toFixed(2)} USD
            </span>
          </div>
          <div className="text-xs text-neutral-400 font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        </div>

        <button
          onClick={disconnect}
          className="px-3 py-2 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs text-neutral-400 hover:text-white transition-all"
        >
          Disconnect
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={connect}
      disabled={loading}
      className="relative group w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-sm sm:text-base"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
      
      {/* Content */}
      <div className="relative flex items-center gap-2">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <span className="text-xl">🔗</span>
            <span>Connect HyperVM Wallet</span>
          </>
        )}
      </div>
    </motion.button>
  );
}

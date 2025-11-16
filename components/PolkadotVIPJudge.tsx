'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Polkadot VIP Judge Component
 * Highlights DOT as a special "celebrity judge" in the restaurant theme
 * Emphasizes first-ever Polkadot + HyperLiquid integration
 */

interface PolkadotVIPJudgeProps {
  variant?: 'compact' | 'full' | 'banner';
}

export default function PolkadotVIPJudge({ variant = 'full' }: PolkadotVIPJudgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border-2 border-pink-500/30 rounded-xl p-6"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-pink-500/5 animate-pulse" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: DOT Icon + Title */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.6 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-xl cursor-pointer"
            >
              ●
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Polkadot VIP Judge
                </h3>
                <span className="px-2 py-1 bg-pink-500/20 border border-pink-500/50 rounded text-xs font-bold text-pink-400">
                  FIRST EVER
                </span>
              </div>
              <p className="text-sm text-neutral-400">
                🌟 The only blockchain securing your HyperLiquid vaults
              </p>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">100%</div>
              <div className="text-xs text-neutral-500">On-Chain</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">⚡</div>
              <div className="text-xs text-neutral-500">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">🔗</div>
              <div className="text-xs text-neutral-500">Connected</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/40 rounded-full cursor-pointer"
      >
        <span className="text-2xl">●</span>
        <span className="text-sm font-bold text-white">DOT VIP Judge</span>
        <span className="px-2 py-0.5 bg-pink-500/30 rounded text-xs text-pink-300">NEW</span>
      </motion.div>
    );
  }

  // Full variant - Main feature showcase
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-2 border-pink-500/30 rounded-2xl p-8 overflow-hidden shadow-2xl"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-2xl"
            >
              ●
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold text-white">Polkadot</h2>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold text-white shadow-lg"
                >
                  VIP JUDGE
                </motion.span>
              </div>
              <p className="text-neutral-400 text-sm">
                Celebrity Guest • First Blockchain Integration
              </p>
            </div>
          </div>

          {/* Award Badge */}
          <div className="text-center">
            <div className="text-4xl mb-1">🏆</div>
            <div className="text-xs text-pink-400 font-bold">FIRST EVER</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-neutral-900/50 border border-pink-500/20 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-pink-400 flex items-center gap-2">
            <span>✨</span>
            <span>Why DOT is Our VIP Judge</span>
          </h3>
          
          <div className="space-y-3 text-sm text-neutral-300">
            <p className="flex items-start gap-3">
              <span className="text-pink-400 font-bold">1.</span>
              <span>
                <strong className="text-white">First-Ever Integration:</strong> SLALOM is the pioneering platform connecting Polkadot's secure blockchain with HyperLiquid's high-performance perpetual trading.
              </span>
            </p>
            
            <p className="flex items-start gap-3">
              <span className="text-purple-400 font-bold">2.</span>
              <span>
                <strong className="text-white">On-Chain Trust:</strong> Every Lawrence rating is stored immutably on Polkadot's Westend testnet, ensuring complete transparency and verifiability.
              </span>
            </p>
            
            <p className="flex items-start gap-3">
              <span className="text-emerald-400 font-bold">3.</span>
              <span>
                <strong className="text-white">Interoperability Magic:</strong> Polkadot enables seamless cross-chain communication, allowing your vault strategies to scale beyond HyperLiquid in the future.
              </span>
            </p>

            <p className="flex items-start gap-3">
              <span className="text-yellow-400 font-bold">4.</span>
              <span>
                <strong className="text-white">Shared Security:</strong> Your vaults inherit Polkadot's battle-tested security model, protecting billions in TVL across its ecosystem.
              </span>
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-pink-400">100%</div>
            <div className="text-xs text-neutral-400 mt-1">On-Chain Verified</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">⚡</div>
            <div className="text-xs text-neutral-400 mt-1">Real-Time Storage</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">🔗</div>
            <div className="text-xs text-neutral-400 mt-1">Cross-Chain Ready</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">🛡️</div>
            <div className="text-xs text-neutral-400 mt-1">Battle-Tested</div>
          </div>
        </div>

        {/* Innovation Highlight */}
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🚀</div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">
                World's First: Polkadot × HyperLiquid
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                SLALOM Protocol makes history by bridging Polkadot's decentralized blockchain infrastructure with HyperLiquid's institutional-grade perpetual DEX. This creates a new paradigm: 
                <strong className="text-pink-400"> on-chain strategy verification</strong> meets 
                <strong className="text-purple-400"> high-performance trading</strong>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/40 rounded-full text-xs text-pink-300">
                  ✅ Transparent
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300">
                  ✅ Scalable
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-xs text-emerald-300">
                  ✅ Secure
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-xs text-yellow-300">
                  ✅ Innovative
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Integration */}
        <div className="border-t border-neutral-700 pt-6">
          <h4 className="text-sm font-bold text-neutral-400 mb-3">TECHNICAL INTEGRATION</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <code className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-pink-400">
              @polkadot/api
            </code>
            <code className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-purple-400">
              Westend Testnet
            </code>
            <code className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-emerald-400">
              system.remark
            </code>
            <code className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded text-yellow-400">
              On-chain storage
            </code>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

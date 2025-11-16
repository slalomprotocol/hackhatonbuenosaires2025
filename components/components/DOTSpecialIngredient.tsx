'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * DOT as a Special Ingredient Component
 * Shows Polkadot as a "secret sauce" that powers the entire platform
 * Can be added to any strategy as the "blockchain layer"
 */

interface DOTSpecialIngredientProps {
  onLearnMore?: () => void;
}

export default function DOTSpecialIngredient({ onLearnMore }: DOTSpecialIngredientProps) {
  const [isGlowing, setIsGlowing] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* "Chef's Special" Banner */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ 
            rotate: [-2, 2, -2],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg"
        >
          <span className="text-xs font-bold text-white">👨‍🍳 CHEF'S SPECIAL</span>
        </motion.div>
      </div>

      {/* Main Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-pink-500/20 border-2 border-pink-500/50 rounded-2xl p-6 overflow-hidden cursor-pointer"
        onClick={onLearnMore}
        onMouseEnter={() => setIsGlowing(true)}
        onMouseLeave={() => setIsGlowing(false)}
      >
        {/* Animated Glow Effect */}
        {isGlowing && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Content */}
        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-2xl shadow-xl"
              >
                ●
              </motion.div>
              
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Polkadot
                  <span className="text-pink-400">DOT</span>
                </h3>
                <p className="text-xs text-neutral-400">The Secret Sauce</p>
              </div>
            </div>

            {/* Rating */}
            <div className="text-center">
              <div className="text-2xl">⭐⭐⭐</div>
              <div className="text-xs text-yellow-400 font-bold">LEGENDARY</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-neutral-900/80 border border-pink-500/30 rounded-xl p-4">
            <p className="text-sm text-neutral-300 leading-relaxed">
              <strong className="text-pink-400">DOT</strong> is the secret ingredient that makes SLALOM unique. 
              It's not a trading asset—it's the <strong className="text-white">blockchain foundation</strong> that 
              secures every strategy, verifies every rating, and enables cross-chain magic.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 rounded-lg p-3">
              <div className="text-2xl mb-1">🔐</div>
              <div className="text-xs font-bold text-white mb-1">On-Chain Security</div>
              <div className="text-xs text-neutral-400">Immutable ratings</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-lg p-3">
              <div className="text-2xl mb-1">🌐</div>
              <div className="text-xs font-bold text-white mb-1">Cross-Chain Ready</div>
              <div className="text-xs text-neutral-400">Future integrations</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-lg p-3">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-bold text-white mb-1">Real-Time Sync</div>
              <div className="text-xs text-neutral-400">Westend testnet</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 rounded-lg p-3">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xs font-bold text-white mb-1">First Integration</div>
              <div className="text-xs text-neutral-400">Polkadot × HL</div>
            </div>
          </div>

          {/* Badge */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/40 rounded-full text-xs text-pink-300 font-semibold">
              ✨ Auto-included in every strategy
            </span>
            <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300 font-semibold">
              🔗 No extra cost
            </span>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore?.();
            }}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-bold text-white transition-all shadow-lg"
          >
            Learn How DOT Powers SLALOM →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

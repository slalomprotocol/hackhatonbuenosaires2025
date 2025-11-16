'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import PolkadotVIPJudge from '@/components/PolkadotVIPJudge';
import DOTSpecialIngredient from '@/components/DOTSpecialIngredient';

/**
 * Dedicated Polkadot VIP Page
 * Showcases DOT as the celebrity judge and blockchain backbone
 * Marketing-focused landing page for the $5k bounty
 */

export default function DOTVIPPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/10 to-pink-500/5 animate-pulse" />
        
        {/* Sparkles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400 rounded-full"
              animate={{
                x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-bold text-white shadow-xl">
                🏆 WORLD'S FIRST INTEGRATION
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Meet Polkadot
              </span>
              <br />
              <span className="text-white">Our VIP Judge ●</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto"
            >
              The first blockchain to secure HyperLiquid trading vaults.
              <strong className="text-pink-400"> 100% on-chain</strong>,
              <strong className="text-purple-400"> 100% transparent</strong>,
              <strong className="text-emerald-400"> 100% revolutionary</strong>.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400">FIRST</div>
                <div className="text-sm text-neutral-400">Blockchain Bridge</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-neutral-400">Verified On-Chain</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-400">⚡</div>
                <div className="text-sm text-neutral-400">Real-Time Sync</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* VIP Judge Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PolkadotVIPJudge variant="full" />
          </motion.div>

          {/* Why It Matters Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-neutral-900 border-2 border-emerald-500/30 rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>🎯</span>
              <span>Why This Changes Everything</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Before SLALOM */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">❌</span>
                  <h3 className="text-xl font-bold text-red-400">Before SLALOM</h3>
                </div>
                
                <div className="space-y-3 text-sm text-neutral-300">
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Trading strategies are opaque black boxes</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>No way to verify AI ratings independently</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Centralized platforms control your data</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>HyperLiquid and blockchain ecosystems are isolated</span>
                  </p>
                </div>
              </div>

              {/* With SLALOM + Polkadot */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">✅</span>
                  <h3 className="text-xl font-bold text-emerald-400">With SLALOM + Polkadot</h3>
                </div>
                
                <div className="space-y-3 text-sm text-neutral-300">
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span><strong>Every strategy rating</strong> is stored immutably on-chain</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span><strong>Lawrence's AI decisions</strong> are publicly verifiable</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span><strong>Full transparency</strong> via Westend Subscan explorer</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span><strong>First-ever bridge</strong> between DeFi ecosystems</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* DOT as Special Ingredient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              DOT: The Secret Sauce 🐼👨‍🍳
            </h2>
            <DOTSpecialIngredient 
              onLearnMore={() => {
                window.open('https://polkadot.network', '_blank');
              }}
            />
          </motion.div>

          {/* Technical Integration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span>⚙️</span>
              <span>How It Works</span>
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">User Creates Strategy</h3>
                  <p className="text-sm text-neutral-400">
                    Select crypto ingredients, configure positions (leverage, allocation, direction)
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Lawrence AI Evaluates</h3>
                  <p className="text-sm text-neutral-400">
                    AI chef analyzes risk, diversification, leverage balance → assigns score & grade (A-D)
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Polkadot Stores Rating On-Chain
                  </h3>
                  <p className="text-sm text-neutral-400">
                    <code className="px-2 py-1 bg-pink-500/20 rounded text-pink-400">system.remark</code> transaction 
                    stores rating data immutably on Westend testnet
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Deploy to HyperLiquid</h3>
                  <p className="text-sm text-neutral-400">
                    Approved strategies create vaults on HyperLiquid testnet, backed by Polkadot verification
                  </p>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <div className="mt-8 bg-neutral-950 border border-neutral-700 rounded-xl p-6">
              <div className="text-xs text-neutral-500 mb-2">lib/polkadot.ts</div>
              <pre className="text-sm text-emerald-400 font-mono overflow-x-auto">
{`export async function storeRatingOnChain(
  address: string,
  rating: {
    ticker: string;
    stars: number;
    timestamp: number;
  }
): Promise<string> {
  const remarkData = JSON.stringify({
    type: 'SLALOM_RATING',
    ...rating,
  });

  return submitRemark(address, remarkData);
}`}
              </pre>
              <div className="mt-4 flex gap-2 flex-wrap">
                <span className="px-2 py-1 bg-pink-500/20 border border-pink-500/40 rounded text-xs text-pink-300">
                  @polkadot/api
                </span>
                <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-xs text-purple-300">
                  Westend RPC
                </span>
                <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded text-xs text-emerald-300">
                  system.remark
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border-2 border-pink-500/40 rounded-2xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Try SLALOM Protocol today and see how Polkadot's blockchain security meets 
              HyperLiquid's high-performance trading. Be part of the first-ever integration!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/create-dish')}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-bold text-white text-lg shadow-xl"
              >
                Start Cooking with DOT 🐼👨‍🍳
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/community')}
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border-2 border-pink-500/40 rounded-lg font-bold text-white text-lg"
              >
                View On-Chain Activity →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

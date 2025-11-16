'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
import dynamicComponent from 'next/dynamic';
import { initPolkadotApi, storeRatingOnChain, queryRecentRatings } from '@/lib/polkadot';
import { getStoredVaults } from '@/lib/hyperliquid';
=======
import dynamicImport from 'next/dynamic';
import { initPolkadotApi, storeRatingOnChain, queryRecentRatings } from '@/lib/polkadot';
>>>>>>> 1c41f414333dbca0ff837ec3e11e45c21e664383

// Disable static generation for this page (uses window/localStorage)
export const dynamic = 'force-dynamic';

// Dynamic import to prevent SSR issues with Polkadot extension
<<<<<<< HEAD
const PolkadotWalletConnect = dynamicComponent(
=======
const PolkadotWalletConnect = dynamicImport(
>>>>>>> 1c41f414333dbca0ff837ec3e11e45c21e664383
  () => import('@/components/PolkadotWalletConnect'),
  { ssr: false }
);

interface UserRating {
  address: string;
  ticker: string;
  stars: number;
  timestamp: number;
  txHash?: string;
}

export default function CommunityPage() {
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);
  const [recentRatings, setRecentRatings] = useState<UserRating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState<any>(null);
<<<<<<< HEAD
  const [deployedVaults, setDeployedVaults] = useState<any[]>([]);
=======
>>>>>>> 1c41f414333dbca0ff837ec3e11e45c21e664383

  useEffect(() => {
    initializePolkadot();
  }, []);

  const initializePolkadot = async () => {
    try {
      await initPolkadotApi();
      setIsInitialized(true);
      
      // Load recent ratings
      const ratings = await queryRecentRatings(20);
      setRecentRatings(ratings);

      // Load deployed vaults
      const vaults = getStoredVaults();
      setDeployedVaults(vaults);
      
      console.log('📊 Loaded', vaults.length, 'vaults from storage');
    } catch (error) {
      console.error('Failed to initialize Polkadot:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const leaderboardData = [
    {
      rank: 1,
      name: 'Chef Satoshi',
      dishes: 47,
      avgScore: 92,
      followers: 1247,
      badge: '👨‍🍳'
    },
    {
      rank: 2,
      name: 'Crypto Gordon',
      dishes: 38,
      avgScore: 89,
      followers: 983,
      badge: '🧑‍🍳'
    },
    {
      rank: 3,
      name: 'DeFi Julia',
      dishes: 35,
      avgScore: 87,
      followers: 856,
      badge: '👩‍🍳'
    },
    {
      rank: 4,
      name: 'Blockchain Bobby',
      dishes: 29,
      avgScore: 85,
      followers: 742,
      badge: '🧑‍🍳'
    },
    {
      rank: 5,
      name: 'NFT Nancy',
      dishes: 26,
      avgScore: 83,
      followers: 621,
      badge: '👩‍🍳'
    },
  ];

  const recentDishes = [
    {
      id: 1,
      title: 'BTC-ETH Balanced Platter',
      chef: 'Chef Satoshi',
      rating: 3,
      likes: 234,
      tags: ['Conservative', 'Long-term']
    },
    {
      id: 2,
      title: 'DeFi Spicy Mix',
      chef: 'Crypto Gordon',
      rating: 2,
      likes: 189,
      tags: ['High-Risk', 'Short-term']
    },
    {
      id: 3,
      title: 'Layer 2 Soup',
      chef: 'DeFi Julia',
      rating: 3,
      likes: 156,
      tags: ['Medium-Risk', 'Diversified']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10" />
        
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
          {/* Wallet Connect - Top Right */}
          <div className="absolute top-4 right-4">
            <PolkadotWalletConnect onAccountChange={setConnectedAccount} />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="text-8xl mb-4"
            >
              🏆
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Community Kitchen
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-400"
            >
              🐼 Connect, Share, and Compete with Fellow Chefs
            </motion.p>

            {connectedAccount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block bg-emerald-500/20 border border-emerald-500/50 rounded-full px-6 py-2"
              >
                <span className="text-emerald-400 font-semibold">
                  ⛓️ Connected to Polkadot Testnet
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Chef Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-neutral-900 border-2 border-primary/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>👨‍🍳</span>
                <span>Chef Leaderboard</span>
              </h2>

              <div className="space-y-3">
                {leaderboardData.map((chef, index) => (
                  <motion.div
                    key={chef.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-bold ${
                        chef.rank === 1 ? 'text-yellow-400' :
                        chef.rank === 2 ? 'text-gray-400' :
                        chef.rank === 3 ? 'text-orange-600' :
                        'text-neutral-500'
                      }`}>
                        #{chef.rank}
                      </div>
                      
                      <div className="text-4xl">{chef.badge}</div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-white text-lg">{chef.name}</div>
                        <div className="text-sm text-neutral-400">
                          {chef.dishes} dishes • Avg: {chef.avgScore}/100
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-emerald-400 font-bold">{chef.followers}</div>
                        <div className="text-xs text-neutral-500">followers</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Community Dishes */}
            <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🍽️</span>
                <span>Recent Community Dishes</span>
              </h2>

              <div className="space-y-4">
                {recentDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-neutral-800 border border-neutral-700 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">{dish.title}</h3>
                        <p className="text-sm text-neutral-400">by {dish.chef}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(dish.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {dish.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/20 text-primary text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-neutral-400">❤️ {dish.likes} likes</span>
                      <button className="px-4 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm font-semibold rounded transition-colors">
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - On-Chain Activity */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border-2 border-emerald-500/40 rounded-xl p-6 sticky top-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>⛓️</span>
                <span>On-Chain Activity</span>
              </h3>

              {isLoading ? (
                <div className="text-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="text-4xl mx-auto"
                  >
                    ⚙️
                  </motion.div>
                  <p className="text-neutral-400 mt-2">Loading blockchain data...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentRatings.length > 0 ? (
                    recentRatings.slice(0, 5).map((rating, index) => (
                      <div
                        key={index}
                        className="bg-neutral-800 border border-emerald-500/30 rounded p-3 text-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{rating.ticker}</span>
                          <span className="text-yellow-400">
                            {'⭐'.repeat(rating.stars)}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                          {new Date(rating.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-400 text-sm">
                        No on-chain ratings yet. Be the first!
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-neutral-700">
                <p className="text-xs text-neutral-400 mb-3">
                  ⚡ All ratings are stored immutably on Polkadot testnet
                </p>
                <button
                  onClick={() => window.open('https://westend.subscan.io/', '_blank')}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded transition-colors"
                >
                  View on Explorer →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="fixed bottom-4 left-4 px-4 py-2 bg-neutral-900 border-2 border-neutral-700 hover:border-emerald-500/50 text-white rounded-lg font-semibold text-sm transition-all hover:scale-105"
      >
        ← Back to Home
      </button>
    </div>
  );
}

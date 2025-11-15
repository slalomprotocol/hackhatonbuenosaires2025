'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamicImport from 'next/dynamic';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTranslations, getCurrentLanguage } from '@/lib/translations';

// Disable static generation for this page (uses window/localStorage)
export const dynamic = 'force-dynamic';

// Dynamic import to prevent SSR issues with Polkadot extension
const PolkadotWalletConnect = dynamicImport(
  () => import('@/components/PolkadotWalletConnect'),
  { ssr: false }
);

export default function HomePage() {
  const [t, setT] = useState(getTranslations());
  
  useEffect(() => {
    // Update translations on mount
    setT(getTranslations());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black flex items-center justify-center p-4">
      {/* Language Switcher - Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Wallet Connect - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <PolkadotWalletConnect />
      </div>

      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            SLALOM Protocol
          </h1>
          <p className="text-2xl text-neutral-300">
            🐼 {t.home.beOurGuest}
          </p>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            {t.home.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-neutral-900/50 backdrop-blur border border-emerald-500/30 rounded-2xl p-6 text-left">
            <div className="text-4xl mb-3">🪙</div>
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Ratings</h3>
            <p className="text-neutral-400">
              Lawrence rates ingredients with Michelin-style stars using real-time HyperDash analytics
            </p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur border border-purple-500/30 rounded-2xl p-6 text-left">
            <div className="text-4xl mb-3">🍳</div>
            <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Recipes</h3>
            <p className="text-neutral-400">
              Combine crypto ingredients to create unique trading strategy "dishes"
            </p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur border border-pink-500/30 rounded-2xl p-6 text-left">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Bonding Curves</h3>
            <p className="text-neutral-400">
              Launch with 1 SLALOM token, scale to 100 USDC through community participation
            </p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur border border-yellow-500/30 rounded-2xl p-6 text-left">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Auto-Deploy</h3>
            <p className="text-neutral-400">
              Automatically launch your vault on Hyperliquid with one click
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-dish">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-purple-500 to-pink-500 hover:from-emerald-600 hover:via-purple-600 hover:to-pink-600 text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl">
                Start Creating Your Dish 🐼
              </button>
            </Link>
            <Link href="/community">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl">
                Community Kitchen 🏆
              </button>
            </Link>
          </div>
          <p className="text-sm text-emerald-400 font-semibold">
            ✨ No wallet needed to start • Connect only when deploying
          </p>
          <p className="text-xs text-neutral-500">
            Powered by Polkadot + Hyperliquid • Built for SUB0 Hackathon
          </p>
        </div>

        {/* Lawrence Welcome */}
        <div className="mt-12 bg-neutral-900/70 border-2 border-emerald-500/50 rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-6xl">🐼</div>
            <div className="text-left">
              <div className="text-xl font-bold text-white mb-2">Welcome, dear guest!</div>
              <p className="text-neutral-300">
                I'm Lawrence, your culinary AI chef. I'll help you create the perfect trading strategy 
                by selecting the finest ingredients from the market. Each coin is carefully rated with 
                my Michelin-style system based on real-time analytics.
              </p>
              <p className="text-emerald-400 mt-3 font-semibold">
                "Excellence is not just about the ingredients, but how you combine them." - Lawrence
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 p-4">
          <div className="flex justify-around items-center">
            <Link href="/tutorial" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors">
              <span className="text-2xl">📖</span>
              <span className="text-xs font-semibold">Tutorial</span>
            </Link>
            <Link href="/create-dish" className="flex flex-col items-center gap-1 text-emerald-400">
              <span className="text-2xl">🍳</span>
              <span className="text-xs font-semibold">Create</span>
            </Link>
            <Link href="/dot-vip" className="flex flex-col items-center gap-1 text-pink-400">
              <span className="text-2xl">●</span>
              <span className="text-xs font-semibold">DOT VIP</span>
            </Link>
            <Link href="/community" className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors">
              <span className="text-2xl">🏆</span>
              <span className="text-xs font-semibold">Community</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

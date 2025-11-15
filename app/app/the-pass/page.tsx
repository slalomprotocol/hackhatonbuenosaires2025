'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import PositionCard, { PositionConfig } from '@/components/PositionCard';
import PositionSummary from '@/components/PositionSummary';

function ThePassContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [positions, setPositions] = useState<PositionConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    // Get selected ingredients from URL params or localStorage
    const ingredientsParam = searchParams?.get('ingredients');
    
    let selectedTickers: string[] = [];
    
    if (ingredientsParam) {
      selectedTickers = ingredientsParam.split(',');
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem('selectedIngredients');
      if (stored) {
        selectedTickers = JSON.parse(stored);
      }
    }

    if (selectedTickers.length === 0) {
      // No ingredients selected, redirect back
      router.push('/create-dish');
      return;
    }

    // Initialize positions with default values
    const initialPositions: PositionConfig[] = selectedTickers.map((ticker) => ({
      ticker,
      direction: 'LONG',
      leverage: 5,
      allocation: 0,
      orderType: 'MARKET',
      currentMarketPrice: Math.random() * 50000 + 1000, // Mock price for now
    }));

    setPositions(initialPositions);
    setIsLoading(false);
  }, [searchParams, router]);

  const handlePositionChange = (index: number, updatedPosition: PositionConfig) => {
    const newPositions = [...positions];
    const oldAllocation = positions[index].allocation;
    newPositions[index] = updatedPosition;
    
    // Auto-balance allocations if this position's allocation changed
    if (updatedPosition.allocation !== oldAllocation) {
      const totalPositions = newPositions.length;
      const currentAllocation = updatedPosition.allocation;
      const remainingAllocation = 100 - currentAllocation;
      const otherPositionsCount = totalPositions - 1;
      
      if (otherPositionsCount > 0) {
        // Distribute remaining allocation evenly among other positions
        const allocationPerOther = remainingAllocation / otherPositionsCount;
        newPositions.forEach((pos, idx) => {
          if (idx !== index) {
            pos.allocation = parseFloat(allocationPerOther.toFixed(1));
          }
        });
      }
      
      console.log('🎯 Auto-balanced allocations:', {
        changed: `${updatedPosition.ticker}: ${currentAllocation}%`,
        others: newPositions.filter((_, i) => i !== index).map(p => `${p.ticker}: ${p.allocation}%`)
      });
    }
    
    setPositions(newPositions);
  };

  const getRemainingAllocation = (currentIndex: number): number => {
    const totalAllocated = positions.reduce(
      (sum, pos, idx) => (idx === currentIndex ? sum : sum + pos.allocation),
      0
    );
    return 100 - totalAllocated;
  };

  const handleSendToKitchen = () => {
    // Validate allocations total 100%
    const totalAllocation = positions.reduce((sum, pos) => sum + pos.allocation, 0);
    
    if (Math.abs(totalAllocation - 100) > 0.1) {
      alert(`Total allocation must be 100%. Current total: ${totalAllocation.toFixed(1)}%`);
      return;
    }
    
    setIsSending(true);
    
    // Save positions to localStorage for next phase
    localStorage.setItem('configuredPositions', JSON.stringify(positions));
    
    // Simulate sending to kitchen
    setTimeout(() => {
      // Navigate to the-kitchen page
      router.push('/the-kitchen');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            🎼
          </motion.div>
          <p className="text-neutral-400">Preparing the orchestra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10" />
        
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            {/* Lawrence Conductor */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="text-8xl mb-4"
            >
              🎼
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Lawrence's Pass
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-400"
            >
              🐼 Orchestrate Your Strategy Symphony
            </motion.p>
            
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-neutral-500 max-w-2xl mx-auto"
            >
              Configure each position like a maestro conducting an orchestra. Set direction,
              leverage, and allocation for perfect harmony.
            </motion.p>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-6"
            >
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-full opacity-50">
                <span className="text-neutral-400 font-bold text-sm">1</span>
                <span className="text-xs sm:text-sm text-neutral-400">Pick Ingredients</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
                <span className="text-emerald-400 font-bold text-sm">2</span>
                <span className="text-xs sm:text-sm text-white">Configure Positions</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-full opacity-50">
                <span className="text-neutral-400 font-bold text-sm">3</span>
                <span className="text-xs sm:text-sm text-neutral-400">Execute Orders</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Position Cards - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {positions.map((position, index) => (
              <PositionCard
                key={position.ticker}
                position={position}
                onChange={(updatedPosition) => handlePositionChange(index, updatedPosition)}
                remainingAllocation={getRemainingAllocation(index)}
                index={index}
              />
            ))}
          </div>

          {/* Position Summary - Right Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <PositionSummary positions={positions} onSendToKitchen={handleSendToKitchen} />
          </div>
        </div>
      </div>

      {/* Sending to Kitchen Overlay */}
      {isSending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 z-[100] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-9xl"
            >
              🍳
            </motion.div>
            <h2 className="text-5xl font-bold text-white font-theatrical">
              Sending to the Kitchen...
            </h2>
            <p className="text-xl text-neutral-400">
              Your strategy symphony is being prepared
            </p>
            <motion.div className="flex gap-2 justify-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 rounded-full bg-primary"
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Back Button - Mobile Floating, Desktop Fixed */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => router.push('/create-dish')}
        className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 bg-neutral-900 border-2 border-neutral-700 hover:border-emerald-500/50 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 z-40 shadow-2xl group"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">←</span>
          <div className="flex flex-col items-start">
            <span>Back to Ingredients</span>
            <span className="text-xs text-neutral-400 group-hover:text-emerald-400 transition-colors">
              Edit your selection
            </span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

export default function ThePassPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl"
          >
            🎼
          </motion.div>
          <p className="text-neutral-400">Loading...</p>
        </div>
      </div>
    }>
      <ThePassContent />
    </Suspense>
  );
}

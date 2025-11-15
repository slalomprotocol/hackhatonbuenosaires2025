'use client';

import { useState } from 'react';
import IngredientList from '@/components/IngredientList';
import HyperVMWallet from '@/components/HyperVMWallet';

export default function CreateDishPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Hero Section - Ultra Mobile Responsive */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10" />
        
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 relative">
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
            {/* HyperVM Wallet Connect - Mobile Optimized */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <HyperVMWallet />
            </div>

            {/* Title - Responsive Sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
              Create Your Trading Dish
            </h1>
            
            {/* Subtitle - Mobile Friendly */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 px-4">
              🐼 Pick your ingredients • Lawrence rates each one with Michelin stars
            </p>
            
            {/* Badge - Responsive */}
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mx-2">
              <p className="text-xs sm:text-sm text-emerald-400">
                ✨ No wallet needed yet • Just start picking
              </p>
            </div>
            
            {/* Progress Steps - Mobile Stacked, Desktop Inline */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-2">
              <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
                <span className="text-emerald-400 font-bold text-sm">1</span>
                <span className="text-xs sm:text-sm text-white">Pick Ingredients</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-full opacity-50">
                <span className="text-neutral-400 font-bold text-sm">2</span>
                <span className="text-xs sm:text-sm text-neutral-400">Set Allocations</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-full opacity-50">
                <span className="text-neutral-400 font-bold text-sm">3</span>
                <span className="text-xs sm:text-sm text-neutral-400">Deploy Vault</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Mobile Optimized Padding */}
      <div className="container mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <IngredientList 
          selectedIngredients={selectedIngredients}
          onSelectIngredient={(ticker) => {
            if (selectedIngredients.includes(ticker)) {
              setSelectedIngredients(selectedIngredients.filter(t => t !== ticker));
            } else {
              setSelectedIngredients([...selectedIngredients, ticker]);
            }
          }}
        />
      </div>

      {/* Selected Ingredients Floating Bar - Mobile Bottom, Desktop Centered */}
      {selectedIngredients.length > 0 && (
        <div className="fixed bottom-0 sm:bottom-8 left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-auto sm:max-w-3xl bg-neutral-900 border-t-2 sm:border-2 border-emerald-500/50 sm:rounded-2xl p-3 sm:p-4 shadow-2xl z-40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1">
              <div className="text-2xl sm:text-3xl">🍳</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm sm:text-base">
                  {selectedIngredients.length} ingredient{selectedIngredients.length !== 1 ? 's' : ''} selected
                </div>
                <div className="text-xs text-neutral-400 truncate">
                  {selectedIngredients.join(', ')}
                </div>
              </div>
            </div>
            <button 
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-lg text-sm sm:text-base transition-all whitespace-nowrap"
              onClick={() => {
                // TODO: Move to next step
                alert('Next: Set allocations for each ingredient!');
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* Lawrence Helper Bubble - Mobile Hidden, Tablet+  Visible */}
      <div className="hidden md:block fixed bottom-8 right-4 lg:right-8 bg-neutral-900 border-2 border-emerald-500/50 rounded-2xl p-3 lg:p-4 shadow-2xl max-w-xs lg:max-w-sm z-50">
        <div className="flex items-start gap-2 lg:gap-3">
          <div className="text-3xl lg:text-4xl">🐼</div>
          <div>
            <div className="font-bold text-white mb-1 text-sm lg:text-base">Lawrence says:</div>
            <div className="text-xs lg:text-sm text-neutral-300">
              {selectedIngredients.length === 0 
                ? "Click any ingredient to add it to your dish. I recommend starting with 2-3 high-quality coins!"
                : `Great choices! ${selectedIngredients.length >= 3 ? "That's a good mix. Ready to continue?" : "Pick a few more for a balanced dish."}`
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Lawrence Tip - Shows on Mobile Only */}
      {selectedIngredients.length === 0 && (
        <div className="md:hidden fixed bottom-20 left-2 right-2 bg-neutral-900/95 border border-emerald-500/50 rounded-xl p-3 shadow-lg z-40 backdrop-blur-sm">
          <div className="flex items-start gap-2">
            <div className="text-2xl">🐼</div>
            <div className="flex-1">
              <div className="font-bold text-white text-xs mb-0.5">Lawrence says:</div>
              <div className="text-xs text-neutral-300">
                Tap any ingredient to add it to your dish!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

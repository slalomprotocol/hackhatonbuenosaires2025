'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface OrderTypeSelectorProps {
  orderType: 'MARKET' | 'LIMIT';
  onOrderTypeChange: (type: 'MARKET' | 'LIMIT') => void;
  limitPrice?: number;
  onLimitPriceChange?: (price: number) => void;
  currentMarketPrice?: number;
  disabled?: boolean;
}

export default function OrderTypeSelector({
  orderType,
  onOrderTypeChange,
  limitPrice,
  onLimitPriceChange,
  currentMarketPrice,
  disabled = false,
}: OrderTypeSelectorProps) {
  const [localLimitPrice, setLocalLimitPrice] = useState(
    limitPrice?.toString() || ''
  );

  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalLimitPrice(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && onLimitPriceChange) {
      onLimitPriceChange(numValue);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm text-neutral-400">Order Type</label>

      {/* Type Selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => !disabled && onOrderTypeChange('MARKET')}
          disabled={disabled}
          className={`
            flex-1 py-3 px-4 rounded-lg font-bold text-sm
            transition-all active:scale-95
            ${
              orderType === 'MARKET'
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                : 'bg-neutral-900 border-2 border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">⚡</span>
            <span>MARKET</span>
            <span className="text-[10px] opacity-70">Instant Fill</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => !disabled && onOrderTypeChange('LIMIT')}
          disabled={disabled}
          className={`
            flex-1 py-3 px-4 rounded-lg font-bold text-sm
            transition-all active:scale-95
            ${
              orderType === 'LIMIT'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white'
                : 'bg-neutral-900 border-2 border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">🎯</span>
            <span>LIMIT</span>
            <span className="text-[10px] opacity-70">Set Price</span>
          </div>
        </button>
      </div>

      {/* Market Price Display */}
      {currentMarketPrice && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900 border border-neutral-700 rounded-lg p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400">Current Market Price</span>
            <span className="text-sm font-bold text-white font-mono">
              ${currentMarketPrice.toLocaleString()}
            </span>
          </div>
        </motion.div>
      )}

      {/* Limit Price Input */}
      <AnimatePresence>
        {orderType === 'LIMIT' && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <label className="text-xs text-neutral-400">Limit Price ($)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-lg font-bold">
                $
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={localLimitPrice}
                onChange={handleLimitPriceChange}
                disabled={disabled}
                placeholder="Enter price..."
                className={`
                  w-full bg-neutral-900 border-2 border-amber-500/50
                  rounded-lg pl-8 pr-4 py-3
                  text-white font-bold text-lg
                  focus:outline-none focus:border-amber-500
                  transition-colors
                  ${disabled ? 'cursor-not-allowed opacity-50' : ''}
                `}
              />
            </div>

            {/* Price Comparison */}
            {currentMarketPrice && limitPrice && (
              <div className="text-xs text-neutral-400">
                {limitPrice > currentMarketPrice ? (
                  <span className="text-amber-400">
                    📈 {((limitPrice / currentMarketPrice - 1) * 100).toFixed(2)}%
                    above market
                  </span>
                ) : limitPrice < currentMarketPrice ? (
                  <span className="text-emerald-400">
                    📉 {((1 - limitPrice / currentMarketPrice) * 100).toFixed(2)}%
                    below market
                  </span>
                ) : (
                  <span className="text-neutral-400">At market price</span>
                )}
              </div>
            )}

            {/* Info Box */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="text-sm">💡</span>
                <div className="flex-1 text-xs text-amber-300/90">
                  Limit orders execute only when the market price reaches your specified
                  price.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

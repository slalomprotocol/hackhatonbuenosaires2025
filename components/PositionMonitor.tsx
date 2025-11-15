'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Position {
  ticker: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  allocation: number;
  leverage: number;
  pnl: number;
  pnlPercentage: number;
}

interface PositionMonitorProps {
  positions: Position[];
}

export default function PositionMonitor({ positions }: PositionMonitorProps) {
  const [activePositions, setActivePositions] = useState<Position[]>(positions);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePositions((prev) =>
        prev.map((pos) => {
          // Random price change -2% to +2%
          const priceChange = (Math.random() - 0.5) * 0.04;
          const newPrice = pos.currentPrice * (1 + priceChange);
          
          // Calculate P&L
          const priceChangePercent = ((newPrice - pos.entryPrice) / pos.entryPrice) * 100;
          const direction = pos.direction === 'LONG' ? 1 : -1;
          const pnlPercentage = priceChangePercent * direction * pos.leverage;
          const pnl = (pos.allocation / 100) * pnlPercentage;

          return {
            ...pos,
            currentPrice: newPrice,
            pnl,
            pnlPercentage,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const totalPnL = activePositions.reduce((sum, pos) => sum + pos.pnl, 0);
  const isProfit = totalPnL >= 0;

  return (
    <div className="space-y-6">
      {/* Total P&L Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`border-2 rounded-xl p-6 text-center ${
          isProfit
            ? 'bg-emerald-500/10 border-emerald-500/50'
            : 'bg-red-500/10 border-red-500/50'
        }`}
      >
        <div className="text-sm text-neutral-400 mb-2">Total Portfolio P&L</div>
        <motion.div
          key={totalPnL}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`text-4xl font-bold ${
            isProfit ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {isProfit ? '+' : ''}{totalPnL.toFixed(2)}%
        </motion.div>
      </motion.div>

      {/* Individual Positions */}
      <div className="space-y-4">
        {activePositions.map((pos, index) => {
          const isPosProfit = pos.pnl >= 0;
          
          return (
            <motion.div
              key={pos.ticker}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900 border-2 border-neutral-700 rounded-lg p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white">{pos.ticker}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    pos.direction === 'LONG'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {pos.direction}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-bold bg-neutral-800 text-neutral-300">
                    {pos.leverage}x
                  </span>
                </div>

                <motion.div
                  key={pos.pnl}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className={`text-2xl font-bold ${
                    isPosProfit ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {isPosProfit ? '+' : ''}{pos.pnl.toFixed(2)}%
                </motion.div>
              </div>

              {/* Price Info */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-neutral-500 text-xs">Entry</div>
                  <div className="font-bold text-white">
                    ${pos.entryPrice.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-500 text-xs">Current</div>
                  <motion.div
                    key={pos.currentPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="font-bold text-white"
                  >
                    ${pos.currentPrice.toFixed(2)}
                  </motion.div>
                </div>
                <div>
                  <div className="text-neutral-500 text-xs">Allocation</div>
                  <div className="font-bold text-white">{pos.allocation}%</div>
                </div>
              </div>

              {/* P&L Bar */}
              <div className="mt-3 relative h-2 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(Math.abs(pos.pnlPercentage) * 2, 100)}%`,
                  }}
                  className={`absolute inset-y-0 left-0 ${
                    isPosProfit
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                      : 'bg-gradient-to-r from-red-500 to-red-400'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lawrence's Live Commentary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            🐼
          </motion.div>
          <div>
            <h4 className="font-bold text-white mb-1">Lawrence's Live Commentary</h4>
            <p className="text-sm text-neutral-300">
              {isProfit
                ? `Excellent execution! Your strategy is performing well. Keep monitoring the positions and consider taking profits at key levels.`
                : `The market is volatile. Stay calm and stick to your strategy. Remember, this is part of the journey. Consider your stop losses.`}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

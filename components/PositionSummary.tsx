'use client';

import { motion } from 'framer-motion';
import { PositionConfig } from './PositionCard';

interface PositionSummaryProps {
  positions: PositionConfig[];
  onSendToKitchen: () => void;
}

export default function PositionSummary({
  positions,
  onSendToKitchen,
}: PositionSummaryProps) {
  // Calculate total allocation
  const totalAllocation = positions.reduce((sum, pos) => sum + pos.allocation, 0);
  const isComplete = Math.abs(totalAllocation - 100) < 0.1; // Allow for floating point errors

  // Calculate average leverage
  const avgLeverage =
    positions.length > 0
      ? positions.reduce((sum, pos) => sum + pos.leverage, 0) / positions.length
      : 0;

  // Calculate risk score (0-100, based on leverage and allocation)
  const getRiskScore = () => {
    if (positions.length === 0) return 0;

    const weightedLeverage = positions.reduce(
      (sum, pos) => sum + pos.leverage * (pos.allocation / 100),
      0
    );

    // Risk score: higher leverage = higher risk
    // Scale: 1-3x = low (0-33), 4-7x = medium (34-66), 8-10x = high (67-100)
    const score = Math.min((weightedLeverage / 10) * 100, 100);
    return Math.round(score);
  };

  const riskScore = getRiskScore();

  const getRiskLabel = (score: number) => {
    if (score < 33) return { label: 'Low Risk', color: 'text-emerald-400', emoji: '🛡️' };
    if (score < 67)
      return { label: 'Medium Risk', color: 'text-yellow-400', emoji: '⚡' };
    return { label: 'High Risk', color: 'text-red-400', emoji: '🔥' };
  };

  const risk = getRiskLabel(riskScore);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-4 bg-neutral-900/95 backdrop-blur-sm border-2 border-emerald-500/50 rounded-xl p-6 shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          🎼
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-white font-theatrical">
            Strategy Symphony
          </h3>
          <p className="text-xs text-neutral-400">Position Summary</p>
        </div>
      </div>

      {/* Total Allocation Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-400">Total Allocation</span>
          <span
            className={`text-lg font-bold ${
              isComplete
                ? 'text-emerald-400'
                : totalAllocation > 100
                ? 'text-red-400'
                : 'text-yellow-400'
            }`}
          >
            {totalAllocation.toFixed(1)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${
              isComplete
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                : totalAllocation > 100
                ? 'bg-gradient-to-r from-red-500 to-red-600'
                : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(totalAllocation, 100)}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>

        {!isComplete && (
          <p className="text-xs text-neutral-500">
            {totalAllocation < 100
              ? `${(100 - totalAllocation).toFixed(1)}% remaining`
              : `${(totalAllocation - 100).toFixed(1)}% over limit`}
          </p>
        )}
      </div>

      {/* Positions Count */}
      <div className="bg-black/30 border border-neutral-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-400">Active Positions</span>
          <span className="text-2xl font-bold text-white">{positions.length}</span>
        </div>
        <div className="space-y-1">
          {positions.map((pos, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs text-neutral-500"
            >
              <span>{pos.ticker}</span>
              <span
                className={
                  pos.direction === 'LONG' ? 'text-emerald-400' : 'text-red-400'
                }
              >
                {pos.direction === 'LONG' ? '🟢' : '🔴'} {pos.allocation}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-black/30 border border-neutral-700 rounded-lg p-4 space-y-3">
        <div className="text-sm text-neutral-400 mb-2">Risk Assessment</div>

        {/* Risk Score Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500">Risk Score</span>
            <span className={`text-sm font-bold ${risk.color}`}>
              {risk.emoji} {risk.label}
            </span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                riskScore < 33
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                  : riskScore < 67
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                  : 'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>
        </div>

        {/* Average Leverage */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">Avg. Leverage</span>
          <span className="text-white font-bold">{avgLeverage.toFixed(1)}x</span>
        </div>
      </div>

      {/* Lawrence's Commentary */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <span className="text-2xl">🐼</span>
          <div className="flex-1">
            <div className="text-xs font-bold text-emerald-400 mb-1">
              Lawrence says:
            </div>
            <div className="text-xs text-neutral-300">
              {isComplete
                ? "Perfect! Your strategy is balanced and ready to execute. Let's send it to the kitchen!"
                : totalAllocation === 0
                ? 'Configure your positions by setting allocations for each ingredient.'
                : totalAllocation < 100
                ? `You still have ${(100 - totalAllocation).toFixed(
                    1
                  )}% to allocate. Consider distributing it across your positions.`
                : 'Your total allocation exceeds 100%. Please adjust your positions.'}
            </div>
          </div>
        </div>
      </div>

      {/* Send to Kitchen Button */}
      <button
        onClick={onSendToKitchen}
        disabled={!isComplete}
        className={`
          w-full py-4 rounded-xl font-bold text-lg
          transition-all transform
          ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
          }
        `}
      >
        {isComplete ? (
          <span className="flex items-center justify-center gap-2">
            <span>🍳</span>
            <span>Send to Kitchen</span>
            <span>→</span>
          </span>
        ) : (
          <span>Complete Allocation First</span>
        )}
      </button>

      {/* Additional Info */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-center text-neutral-500"
        >
          Orders will be executed on HyperLiquid
        </motion.div>
      )}
    </motion.div>
  );
}

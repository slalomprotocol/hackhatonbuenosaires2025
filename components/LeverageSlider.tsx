'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LeverageSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function LeverageSlider({
  value,
  onChange,
  min = 1,
  max = 10,
  disabled = false,
}: LeverageSliderProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
    onChange(newValue);
  };

  // Color coding based on leverage
  const getColorClass = (leverage: number) => {
    if (leverage <= 3) return 'from-emerald-500 to-emerald-600';
    if (leverage <= 7) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getRiskLabel = (leverage: number) => {
    if (leverage <= 3) return 'Conservative';
    if (leverage <= 7) return 'Moderate';
    return 'Aggressive';
  };

  const getRiskEmoji = (leverage: number) => {
    if (leverage <= 3) return '🛡️';
    if (leverage <= 7) return '⚡';
    return '🔥';
  };

  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm text-neutral-400">Leverage</label>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getRiskEmoji(localValue)}</span>
          <span className="text-sm text-neutral-400">{getRiskLabel(localValue)}</span>
        </div>
      </div>

      {/* Leverage Value Display */}
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <motion.span
          key={localValue}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-4xl font-bold bg-gradient-to-r ${getColorClass(
            localValue
          )} bg-clip-text text-transparent`}
        >
          {localValue}x
        </motion.span>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Background Track */}
        <div className="h-3 bg-neutral-800 rounded-full overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className={`h-full bg-gradient-to-r ${getColorClass(localValue)}`}
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={localValue}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        {/* Tick Marks */}
        <div className="flex justify-between mt-2 px-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
            <div key={tick} className="flex flex-col items-center">
              <div className="w-px h-2 bg-neutral-700" />
              <span className="text-[10px] text-neutral-500 mt-1">{tick}x</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Warning for High Leverage */}
      {localValue > 7 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
        >
          <div className="flex items-start gap-2">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <div className="text-xs font-bold text-red-400 mb-1">
                High Leverage Warning
              </div>
              <div className="text-xs text-red-300/80">
                Leverage above 7x significantly increases liquidation risk. Use with
                caution.
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

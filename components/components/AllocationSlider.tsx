'use client';

import { motion } from 'framer-motion';

interface AllocationSliderProps {
  value: number;
  onChange: (value: number) => void;
  ticker: string;
  disabled?: boolean;
}

export default function AllocationSlider({
  value,
  onChange,
  ticker,
  disabled = false,
}: AllocationSliderProps) {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  const getColorByPercentage = (pct: number) => {
    if (pct === 0) return 'from-neutral-600 to-neutral-700';
    if (pct < 20) return 'from-red-500 to-red-600';
    if (pct < 40) return 'from-orange-500 to-orange-600';
    if (pct < 60) return 'from-yellow-500 to-yellow-600';
    return 'from-emerald-500 to-emerald-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-neutral-300">
          Allocation
        </label>
        <span className="text-lg font-bold text-white">
          {value.toFixed(1)}%
        </span>
      </div>

      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={value}
          onChange={handleSliderChange}
          disabled={disabled}
          className="w-full h-3 bg-neutral-800 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(to right, #10b981 0%, #10b981 ${value}%, #262626 ${value}%, #262626 100%)`,
          }}
        />
      </div>

      {/* Visual Progress Bar */}
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${getColorByPercentage(value)}`}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Quick Preset Buttons */}
      <div className="flex gap-2">
        {[0, 25, 33, 50, 75, 100].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            disabled={disabled}
            className={`
              flex-1 py-1 px-2 rounded text-xs font-semibold
              transition-all active:scale-95
              ${
                Math.abs(value - preset) < 0.5
                  ? 'bg-emerald-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

interface DirectionToggleProps {
  value: 'LONG' | 'SHORT';
  onChange: (value: 'LONG' | 'SHORT') => void;
  disabled?: boolean;
}

export default function DirectionToggle({
  value,
  onChange,
  disabled = false,
}: DirectionToggleProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-neutral-400">Direction</label>
      <div className="relative flex bg-neutral-900 border-2 border-neutral-700 rounded-lg p-1 gap-1">
        {/* Background Slider */}
        <motion.div
          layoutId="direction-background"
          className={`absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-md ${
            value === 'LONG'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
              : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}
          initial={false}
          animate={{
            x: value === 'LONG' ? 0 : 'calc(100% + 0.25rem)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* LONG Button */}
        <button
          type="button"
          onClick={() => !disabled && onChange('LONG')}
          disabled={disabled}
          className={`
            relative z-10 flex-1 py-2.5 px-4 rounded-md font-bold text-sm
            transition-colors
            ${
              value === 'LONG'
                ? 'text-white'
                : 'text-neutral-400 hover:text-neutral-300'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">🟢</span>
            <span>LONG</span>
          </span>
        </button>

        {/* SHORT Button */}
        <button
          type="button"
          onClick={() => !disabled && onChange('SHORT')}
          disabled={disabled}
          className={`
            relative z-10 flex-1 py-2.5 px-4 rounded-md font-bold text-sm
            transition-colors
            ${
              value === 'SHORT'
                ? 'text-white'
                : 'text-neutral-400 hover:text-neutral-300'
            }
            ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">🔴</span>
            <span>SHORT</span>
          </span>
        </button>
      </div>
    </div>
  );
}

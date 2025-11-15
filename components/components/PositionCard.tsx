'use client';

import { motion } from 'framer-motion';
import DirectionToggle from './DirectionToggle';
import LeverageSlider from './LeverageSlider';
import AllocationSlider from './AllocationSlider';
import OrderTypeSelector from './OrderTypeSelector';

export interface PositionConfig {
  ticker: string;
  direction: 'LONG' | 'SHORT';
  leverage: number;
  allocation: number;
  orderType: 'MARKET' | 'LIMIT';
  limitPrice?: number;
  currentMarketPrice?: number;
}

interface PositionCardProps {
  position: PositionConfig;
  onChange: (position: PositionConfig) => void;
  remainingAllocation: number;
  index: number;
}

export default function PositionCard({
  position,
  onChange,
  remainingAllocation,
  index,
}: PositionCardProps) {
  const handleDirectionChange = (direction: 'LONG' | 'SHORT') => {
    onChange({ ...position, direction });
  };

  const handleLeverageChange = (leverage: number) => {
    onChange({ ...position, leverage });
  };

  const handleAllocationChange = (allocation: number) => {
    onChange({ ...position, allocation });
  };

  const handleOrderTypeChange = (orderType: 'MARKET' | 'LIMIT') => {
    onChange({ ...position, orderType });
  };

  const handleLimitPriceChange = (limitPrice: number) => {
    onChange({ ...position, limitPrice });
  };

  // Dark theme with colored borders
  const cardColors = [
    'border-emerald-500/50',
    'border-purple-500/50',
    'border-pink-500/50',
    'border-blue-500/50',
    'border-orange-500/50',
  ];
  const colorClass = cardColors[index % cardColors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotate: index % 2 === 0 ? 1 : -1, // Slight tilt alternating
      }}
      whileHover={{ 
        rotate: 0,
        scale: 1.02,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}
      transition={{ 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      className={`
        bg-neutral-900 ${colorClass}
        border-2 rounded-lg p-2 space-y-1.5
        shadow-lg
        relative
      `}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header - Compact */}
      <div className="flex items-center justify-between border-b border-neutral-700/50 pb-1.5">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            {position.ticker}
          </h3>
          <p className="text-[8px] text-neutral-400 uppercase">Position #{index + 1}</p>
        </div>
      </div>

      {/* Direction Toggle */}
      <DirectionToggle value={position.direction} onChange={handleDirectionChange} />

      {/* Leverage Slider */}
      <LeverageSlider value={position.leverage} onChange={handleLeverageChange} />

      {/* Allocation Slider */}
      <AllocationSlider
        value={position.allocation}
        onChange={handleAllocationChange}
        ticker={position.ticker}
      />

      {/* Order Type Selector */}
      <OrderTypeSelector
        orderType={position.orderType}
        onOrderTypeChange={handleOrderTypeChange}
        limitPrice={position.limitPrice}
        onLimitPriceChange={handleLimitPriceChange}
        currentMarketPrice={position.currentMarketPrice}
      />

      {/* Position Preview - Ultra Compact */}
      <div className="bg-black/30 border border-neutral-800 rounded p-1.5 space-y-0.5">
        <div className="text-[8px] text-neutral-500 font-bold uppercase mb-0.5">Summary</div>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="flex items-center gap-0.5">
            <span className="text-neutral-500 text-[8px]">Dir:</span>
            <span className={`font-bold text-[9px] ${
                position.direction === 'LONG' ? 'text-emerald-400' : 'text-red-400'
              }`}>
              {position.direction === 'LONG' ? '↑' : '↓'} {position.direction}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="text-neutral-500 text-[8px]">Lev:</span>
            <span className="font-bold text-white text-[9px]">{position.leverage}x</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="text-neutral-500 text-[8px]">Alloc:</span>
            <span className="font-bold text-white text-[9px]">{position.allocation}%</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="text-neutral-500 text-[8px]">Type:</span>
            <span className="font-bold text-white text-[9px]">{position.orderType}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

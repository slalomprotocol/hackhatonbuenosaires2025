'use client';

import { motion } from 'framer-motion';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IngredientRating {
  ticker: string;
  score: number;
  quality: string;
  sentiment: string;
  lsRatio: number;
  riskLevel: string;
  color: 'green' | 'yellow' | 'red';
  recommendation: string;
  chefNotes: string[];
  marketData: {
    volume24h: string;
    totalNotional: string;
    traders: { long: number; short: number };
    majSidePL: string;
  } | null;
}

interface IngredientCardProps {
  ingredient: IngredientRating;
  isSelected: boolean;
  onSelect: (ticker: string) => void;
  onViewDetails: (ingredient: IngredientRating) => void;
  index?: number;
  isDraggable?: boolean;
  compact?: boolean;
}

// Golden Michelin Star SVG Component - Vibrant & Shiny
const GoldenStar = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`drop-shadow-[0_0_8px_rgba(234,179,8,0.8)] ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'brightness(1.3) contrast(1.2)' }}
  >
    <defs>
      <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="30%" stopColor="#FCD34D" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <radialGradient id="star-shine">
        <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#EAB308" stopOpacity="0.3" />
      </radialGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="url(#golden-gradient)"
      stroke="#B45309"
      strokeWidth="0.8"
    />
    {/* Shine overlay */}
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="url(#star-shine)"
      opacity="0.5"
    />
  </svg>
);

export default function IngredientCard({
  ingredient,
  isSelected,
  onSelect,
  onViewDetails,
  index = 0,
  isDraggable = true,
  compact = false,
}: IngredientCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: ingredient.ticker,
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
      case 'yellow':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'red':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      default:
        return 'bg-neutral-500/20 border-neutral-500/50 text-neutral-400';
    }
  };

  const getMichelinStars = (score: number) => {
    const count = score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0;
    return count;
  };

  const getMichelinLabel = (score: number) => {
    if (score >= 85) return 'Exceptional';
    if (score >= 70) return 'Excellent';
    if (score >= 55) return 'High Quality';
    return 'Use Caution';
  };

  const starCount = getMichelinStars(ingredient.score);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`
        relative rounded-xl border-2
        transition-all duration-300 
        ${compact ? 'p-2 bg-neutral-900/70 hover:bg-neutral-950/95' : 'p-4 sm:p-5 bg-neutral-900/50'}
        backdrop-blur-sm
        ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
        ${isDragging ? 'opacity-50 scale-105 z-50' : 'hover:scale-105'}
        ${getColorClass(ingredient.color)}
        ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-neutral-950 ornate-border' : ''}
        group
      `}
    >
      {/* Ornate Golden Border Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Selection Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -left-2 bg-primary text-neutral-950 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
        >
          ✓ Added
        </motion.div>
      )}

      {/* Score Badge - Hidden in compact mode */}
      {!compact && (
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold font-mono text-primary border border-primary/30">
          {ingredient.score}/100
        </div>
      )}

      {/* Drag Handle Indicator (when draggable) */}
      {isDraggable && (
        <div className="absolute top-2 left-2 text-neutral-600 group-hover:text-primary transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4" cy="4" r="1.5" />
            <circle cx="12" cy="4" r="1.5" />
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="12" cy="8" r="1.5" />
            <circle cx="4" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
        </div>
      )}

      {/* Ticker */}
      <div className={`font-bold text-white font-theatrical tracking-wide ${compact ? 'text-sm mb-1 text-center leading-tight' : 'text-2xl sm:text-3xl mb-3 mt-2 theatrical-glow'}`}>
        {ingredient.ticker}
      </div>

      {/* Golden Michelin Stars */}
      <div className={`space-y-1 ${compact ? 'mb-0' : 'mb-4'}`}>
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={i < starCount ? '' : 'opacity-20'}>
              <GoldenStar className={compact ? 'w-3 h-3' : 'w-6 h-6 sm:w-7 sm:h-7'} />
            </div>
          ))}
        </div>
        {!compact && (
          <div className="text-xs text-neutral-400 font-serif">
            {getMichelinLabel(ingredient.score)}
          </div>
        )}
      </div>

      {/* Detailed Content - Hidden in Compact Mode */}
      <div className={compact ? 'hidden group-hover:block' : 'block'}>
        {/* Sentiment */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-neutral-400">Sentiment:</span>
          <span className="text-xs font-semibold">{ingredient.sentiment}</span>
        </div>

      {/* L/S Ratio Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-neutral-400 mb-1">
          <span>L/S Ratio</span>
          <span className="font-mono">{ingredient.lsRatio}%</span>
        </div>
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ingredient.lsRatio}%` }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            className="h-full bg-gradient-to-r from-primary to-primaryLight"
          />
        </div>
      </div>

      {/* Risk Badge */}
      <div className="inline-block px-2.5 py-1 rounded-full bg-black/40 text-xs font-semibold border border-neutral-700">
        Risk: {ingredient.riskLevel}
      </div>

      {/* Trader Count */}
      {ingredient.marketData && (
        <div className="mt-2 text-xs text-neutral-400">
          👥 {ingredient.marketData.traders.long + ingredient.marketData.traders.short}{' '}
          traders
        </div>
      )}

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(ingredient.ticker);
            }}
            className={`
              flex-1 py-2 px-3 rounded-lg text-xs font-bold 
              transition-all active:scale-95
              ${
                isSelected
                  ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30'
                  : 'bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30'
              }
            `}
          >
            {isSelected ? 'Remove' : 'Add to Recipe'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(ingredient);
            }}
            className="py-2 px-4 rounded-lg text-xs font-bold bg-neutral-800/50 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-primary transition-all active:scale-95"
          >
            Info
          </button>
        </div>
      </div>
    </motion.div>
  );
}

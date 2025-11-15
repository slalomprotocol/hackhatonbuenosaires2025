'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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

interface DroppedIngredientProps {
  ingredient: IngredientRating;
  position: { x: number; y: number };
  onRemove: (ticker: string) => void;
  index: number;
  hideButton?: boolean;
}

// Miniature Golden Star for plate display - Vibrant & Shiny
const MiniStar = ({ filled }: { filled: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`${filled ? 'drop-shadow-[0_0_4px_rgba(234,179,8,0.8)]' : 'opacity-20'}`}
    xmlns="http://www.w3.org/2000/svg"
    style={filled ? { filter: 'brightness(1.3) contrast(1.2)' } : {}}
  >
    <defs>
      <linearGradient id="mini-golden-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="30%" stopColor="#FCD34D" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={filled ? 'url(#mini-golden-gradient)' : '#404040'}
      stroke={filled ? '#B45309' : '#404040'}
      strokeWidth="0.8"
    />
  </svg>
);

export default function DroppedIngredient({
  ingredient,
  position,
  onRemove,
  index,
  hideButton = false,
}: DroppedIngredientProps) {
  const getMichelinStars = (score: number) => {
    return score >= 85 ? 3 : score >= 70 ? 2 : score >= 55 ? 1 : 0;
  };

  const starCount = getMichelinStars(ingredient.score);

  const handleRemove = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Remove clicked:', ingredient.ticker);
    const confirmed = window.confirm(`Remove ${ingredient.ticker} from your strategy?`);
    if (confirmed) {
      onRemove(ingredient.ticker);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 20, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
      className="absolute group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', // Disable pointer events on container
        zIndex: 50, // Ensure above plate
      }}
    >
      {/* Remove Button - Only shown if not using Portal layer */}
      {!hideButton && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleRemove}
          onTouchEnd={handleRemove}
          onMouseDown={handleRemove}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white cursor-pointer"
          style={{
            pointerEvents: 'auto', // Enable pointer events ONLY on button
            zIndex: 9999, // Maximum z-index
            position: 'absolute',
          }}
          aria-label={`Remove ${ingredient.ticker}`}
          type="button"
        >
          <X size={18} strokeWidth={4} className="pointer-events-none" />
        </motion.button>
      )}

      {/* Miniature Ingredient Card on Plate */}
      <div className="relative bg-neutral-900/90 backdrop-blur-sm border-2 border-primary/40 rounded-lg p-2.5 shadow-xl w-32 pointer-events-none">
        {/* Ticker */}
        <div className="text-sm font-bold text-primary mb-1.5 font-theatrical pointer-events-none">
          {ingredient.ticker}
        </div>

        {/* Mini Stars */}
        <div className="flex gap-0.5 mb-1.5 pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <MiniStar key={i} filled={i < starCount} />
          ))}
        </div>

        {/* Score */}
        <div className="text-[10px] text-neutral-400 font-mono pointer-events-none">
          {ingredient.score}/100
        </div>

        {/* Decorative Garnish */}
        <div className="absolute -bottom-1 -right-1 text-xs opacity-50 pointer-events-none">
          🌿
        </div>
      </div>

      {/* Plate Shadow/Depth Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-neutral-950/20 to-transparent rounded-lg -z-10 scale-110 pointer-events-none" />
    </motion.div>
  );
}

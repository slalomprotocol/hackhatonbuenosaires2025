'use client';

import { motion } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import IngredientCard from './IngredientCard';
import StrategyPlate from './StrategyPlate';

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

interface CircularLayoutProps {
  ingredients: IngredientRating[];
  selectedIngredients: string[];
  onSelectIngredient: (ticker: string) => void;
  onViewDetails: (ingredient: IngredientRating) => void;
  droppedIngredients: IngredientRating[];
  onRemoveFromPlate: (ticker: string) => void;
}

export default function CircularLayout({
  ingredients,
  selectedIngredients,
  onSelectIngredient,
  onViewDetails,
  droppedIngredients,
  onRemoveFromPlate,
}: CircularLayoutProps) {
  // Calculate positions for circular orbit
  const getOrbitPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const radius = 320; // Distance from center in pixels
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, angle };
  };

  return (
    <div className="relative min-h-[900px] flex items-center justify-center">
      {/* Strategy Plate - Central Drop Zone */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 z-0">
        <StrategyPlate
          droppedIngredients={droppedIngredients}
          onRemoveIngredient={onRemoveFromPlate}
          maxIngredients={5}
        />
      </div>

      {/* Orbital Ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-primary/10"
      />

      {/* Ingredients in Circular Orbit */}
      <SortableContext
        items={ingredients.map((ing) => ing.ticker)}
        strategy={verticalListSortingStrategy}
      >
        {ingredients.map((ingredient, index) => {
          const { x, y, angle } = getOrbitPosition(index, ingredients.length);
          
          return (
            <motion.div
              key={ingredient.ticker}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: x,
                y: y,
              }}
              transition={{ 
                delay: 0.5 + index * 0.1,
                duration: 0.5,
                ease: 'easeOut'
              }}
              className="absolute top-1/2 left-1/2 w-[96px] hover:w-[280px] hover:z-50 z-10 transition-all duration-300"
              style={{
                transformOrigin: 'center',
              }}
            >
              {/* Connecting Line to Center */}
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20"
                width="360"
                height="2"
                style={{
                  transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
                }}
              >
                <line
                  x1="0"
                  y1="1"
                  x2="360"
                  y2="1"
                  stroke="url(#line-gradient)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EAB308" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Ingredient Card */}
              <div className="relative z-10">
                <IngredientCard
                  ingredient={ingredient}
                  isSelected={selectedIngredients.includes(ingredient.ticker)}
                  onSelect={onSelectIngredient}
                  onViewDetails={onViewDetails}
                  index={index}
                  isDraggable={true}
                  compact={true}
                />
              </div>
            </motion.div>
          );
        })}
      </SortableContext>

      {/* Decorative Stars Around Orbit */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 2 * Math.PI;
        const radius = 400;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`star-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute top-1/2 left-1/2 text-primary text-xl"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            ✨
          </motion.div>
        );
      })}
    </div>
  );
}

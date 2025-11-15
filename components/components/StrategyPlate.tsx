'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import { useState, useEffect, useRef } from 'react';
import DroppedIngredient from './DroppedIngredient';
import RemoveButtonLayer from './RemoveButtonLayer';

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

interface StrategyPlateProps {
  droppedIngredients: IngredientRating[];
  onRemoveIngredient: (ticker: string) => void;
  maxIngredients?: number;
}

export default function StrategyPlate({
  droppedIngredients,
  onRemoveIngredient,
  maxIngredients = 5,
}: StrategyPlateProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'strategy-plate',
  });

  const plateRef = useRef<HTMLElement>(null);
  const [buttonPositions, setButtonPositions] = useState<Array<{
    ticker: string;
    x: number;
    y: number;
    onRemove: () => void;
  }>>([]);

  // Calculate positions for ingredients on plate (circular arrangement)
  const getIngredientPosition = (index: number, total: number) => {
    if (total === 1) {
      return { x: 50, y: 50 }; // Center for single ingredient
    }

    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const radius = 35; // 35% from center
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    return { x, y };
  };

  const isFull = droppedIngredients.length >= maxIngredients;

  // Calculate absolute button positions
  const updateButtonPositions = () => {
    if (!plateRef.current || droppedIngredients.length === 0) {
      setButtonPositions([]);
      return;
    }

    const plateRect = plateRef.current.getBoundingClientRect();
    const positions = droppedIngredients.map((ingredient, index) => {
      const pos = getIngredientPosition(index, droppedIngredients.length);
      
      // Calculate absolute position
      const ingredientX = plateRect.left + (plateRect.width * pos.x / 100);
      const ingredientY = plateRect.top + (plateRect.height * pos.y / 100);
      
      // Position button at top-right of card (approximate card width/height)
      const cardWidth = plateRect.width * 0.2; // Approximate 20% of plate
      const cardHeight = cardWidth * 1.2; // Card aspect ratio
      
      return {
        ticker: ingredient.ticker,
        x: ingredientX + cardWidth / 2 + 8, // Top-right corner
        y: ingredientY - cardHeight / 2 - 8,
        onRemove: () => onRemoveIngredient(ingredient.ticker),
      };
    });

    setButtonPositions(positions);
  };

  // Update positions when ingredients change or on scroll/resize
  useEffect(() => {
    updateButtonPositions();
    
    const handleUpdate = () => updateButtonPositions();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [droppedIngredients]);

  return (
    <>
      {/* Remove buttons rendered via Portal at document root */}
      <RemoveButtonLayer buttons={buttonPositions} />

      <motion.div
        ref={(node) => {
          setNodeRef(node);
          (plateRef as any).current = node;
        }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        boxShadow: isOver
          ? '0 0 60px rgba(234, 179, 8, 0.6), inset 0 0 40px rgba(234, 179, 8, 0.2)'
          : '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(234, 179, 8, 0.1)',
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        relative w-full h-full rounded-full 
        ${
          isOver && !isFull
            ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-white border-[12px] border-amber-600'
            : 'bg-gradient-to-br from-white via-amber-50/90 to-yellow-100/80 border-[12px] border-amber-500'
        }
        backdrop-blur-sm
        transition-all duration-300
      `}
      style={{
        boxShadow: isOver
          ? '0 0 60px rgba(234, 179, 8, 0.6), inset 0 0 40px rgba(234, 179, 8, 0.2)'
          : '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(234, 179, 8, 0.1)',
      }}
    >
      {/* Empty State Message */}
      <AnimatePresence>
        {droppedIngredients.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <div className="text-4xl mb-2 opacity-40">🍽️</div>
            <div className="text-amber-900/60 text-sm font-mono">
              Drag ingredients here
            </div>
            <div className="text-amber-900/40 text-xs mt-1 font-mono">
              (Max {maxIngredients})
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clock Markings - 12 positions like a clock face */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((angle * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((angle * Math.PI) / 180)}
              stroke="#EAB308"
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        })}
      </svg>

      {/* Panda Logo - Always visible as chef's recommendation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
      >
        <motion.div
          animate={{
            scale: isOver ? 1.2 : 1,
            rotate: isOver ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-7xl grayscale opacity-20 mix-blend-multiply"
        >
          🐼
        </motion.div>
      </motion.div>

      {/* Hover State - Ripple Effect */}
      {isOver && !isFull && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: [0.3, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Full State Warning */}
      <AnimatePresence>
        {isOver && isFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-red-900/20 rounded-full border-4 border-red-500 pointer-events-none"
          >
            <div className="text-red-900 font-bold text-lg font-mono">
              PLATE FULL
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropped Ingredients (without X buttons - they're in Portal) */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {droppedIngredients.map((ingredient, index) => {
            const position = getIngredientPosition(index, droppedIngredients.length);
            return (
              <DroppedIngredient
                key={ingredient.ticker}
                ingredient={ingredient}
                position={position}
                onRemove={onRemoveIngredient}
                index={index}
                hideButton={true}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Circular Grid Pattern Overlay */}
      <div
        className="absolute inset-0 rounded-full opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #EAB308 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
    </motion.div>
    </>
  );
}

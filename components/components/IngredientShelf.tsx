'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import IngredientCard from './IngredientCard';

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

interface IngredientShelfProps {
  ingredients: IngredientRating[];
  selectedIngredients: string[];
  onSelectIngredient: (ticker: string) => void;
  onViewDetails: (ingredient: IngredientRating) => void;
}

export default function IngredientShelf({
  ingredients,
  selectedIngredients,
  onSelectIngredient,
  onViewDetails,
}: IngredientShelfProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  // Check scroll position to show/hide fade indicators
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    handleScroll();
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full">
      {/* Left Fade Indicator */}
      {showLeftFade && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"
        />
      )}

      {/* Right Fade Indicator */}
      {showRightFade && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"
        />
      )}

      {/* Left Scroll Button */}
      {showLeftFade && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-neutral-800/90 border border-primary/50 text-primary hover:bg-primary hover:text-neutral-950 transition-all shadow-lg active:scale-95"
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      {/* Right Scroll Button */}
      {showRightFade && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-neutral-800/90 border border-primary/50 text-primary hover:bg-primary hover:text-neutral-950 transition-all shadow-lg active:scale-95"
          aria-label="Scroll right"
        >
          ›
        </button>
      )}

      {/* Horizontal Scrolling Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-2"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#EAB308 #171717',
        }}
      >
        <SortableContext
          items={ingredients.map((ing) => ing.ticker)}
          strategy={horizontalListSortingStrategy}
        >
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.ticker}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
            >
              <IngredientCard
                ingredient={ingredient}
                isSelected={selectedIngredients.includes(ingredient.ticker)}
                onSelect={onSelectIngredient}
                onViewDetails={onViewDetails}
                index={index}
                isDraggable={true}
              />
            </div>
          ))}
        </SortableContext>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          height: 6px;
        }
        div::-webkit-scrollbar-track {
          background: #171717;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb {
          background: #EAB308;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #FCD34D;
        }
      `}</style>
    </div>
  );
}

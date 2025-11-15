'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDragAndDrop, DndContext, DragOverlay } from '@/lib/hooks/useDragAndDrop';
import IngredientCard from './IngredientCard';
import IngredientShelf from './IngredientShelf';
import CircularLayout from './CircularLayout';

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

interface IngredientListProps {
  selectedIngredients?: string[];
  onSelectIngredient?: (ticker: string) => void;
  onDroppedIngredientsChange?: (tickers: string[]) => void;
}

export default function IngredientList({ 
  selectedIngredients = [], 
  onSelectIngredient,
  onDroppedIngredientsChange
}: IngredientListProps) {
  const [ingredients, setIngredients] = useState<IngredientRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientRating | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'sentiment' | 'lsRatio' | 'risk'>('stars');
  const [droppedIngredients, setDroppedIngredients] = useState<IngredientRating[]>([]);
  const [isSendingToPass, setIsSendingToPass] = useState(false);

  // Sync dropped ingredients to parent component
  useEffect(() => {
    if (onDroppedIngredientsChange) {
      const tickers = droppedIngredients.map(ing => ing.ticker);
      onDroppedIngredientsChange(tickers);
    }
  }, [droppedIngredients, onDroppedIngredientsChange]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  // Restore dropped ingredients from localStorage when returning from the-pass
  useEffect(() => {
    if (ingredients.length === 0) return; // Wait for ingredients to load first

    const stored = localStorage.getItem('selectedIngredients');
    if (stored) {
      try {
        const selectedTickers = JSON.parse(stored);
        if (Array.isArray(selectedTickers) && selectedTickers.length > 0) {
          // Find the full ingredient data for each selected ticker
          const restoredIngredients = selectedTickers
            .map(ticker => ingredients.find(ing => ing.ticker === ticker))
            .filter(Boolean) as IngredientRating[];
          
          if (restoredIngredients.length > 0) {
            setDroppedIngredients(restoredIngredients);
          }
        }
      } catch (error) {
        console.error('Failed to restore dropped ingredients:', error);
      }
    }
  }, [ingredients]); // Run when ingredients are loaded

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/lawrence/rate-ingredient');
      const data = await response.json();
      
      if (data.success) {
        setIngredients(data.ratings);
      }
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentValue = (sentiment: string) => {
    const map: { [key: string]: number } = {
      'Very Bullish': 5,
      'Bullish': 4,
      'Neutral': 3,
      'Bearish': 2,
      'Very Bearish': 1
    };
    return map[sentiment] || 0;
  };

  const getRiskValue = (risk: string) => {
    const map: { [key: string]: number } = {
      'Low': 1,
      'Medium': 2,
      'High': 3
    };
    return map[risk] || 0;
  };

  const filteredIngredients = ingredients
    .filter(ing => ing.ticker.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.score - a.score;
        case 'sentiment':
          return getSentimentValue(b.sentiment) - getSentimentValue(a.sentiment);
        case 'lsRatio':
          return b.lsRatio - a.lsRatio;
        case 'risk':
          return getRiskValue(a.riskLevel) - getRiskValue(b.riskLevel);
        default:
          return 0;
      }
    });

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
      case 'yellow': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'red': return 'bg-red-500/20 border-red-500/50 text-red-400';
      default: return 'bg-neutral-500/20 border-neutral-500/50 text-neutral-400';
    }
  };

  const getMichelinStars = (score: number) => {
    if (score >= 85) return '⭐⭐⭐';
    if (score >= 70) return '⭐⭐';
    if (score >= 55) return '⭐';
    return '—';
  };

  const getMichelinLabel = (score: number) => {
    if (score >= 85) return 'Exceptional';
    if (score >= 70) return 'Excellent';
    if (score >= 55) return 'High Quality';
    return 'Use Caution';
  };

  // Setup drag and drop
  const dragItems = filteredIngredients.map(ing => ({ ...ing, id: ing.ticker }));
  const {
    sensors,
    activeId,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useDragAndDrop({
    items: dragItems,
    onReorder: (reorderedItems) => {
      // Update ingredients order
      setIngredients(reorderedItems);
    },
    onDragToPlate: (item) => {
      // Add ingredient to plate if not already there and not full
      const MAX_INGREDIENTS = 5;
      const isAlreadyOnPlate = droppedIngredients.some(ing => ing.ticker === item.ticker);
      
      console.log('🔍 Drag to plate:', {
        ticker: item.ticker,
        isAlreadyOnPlate,
        currentCount: droppedIngredients.length,
        currentTickers: droppedIngredients.map(i => i.ticker)
      });
      
      if (!isAlreadyOnPlate && droppedIngredients.length < MAX_INGREDIENTS) {
        const newDropped = [...droppedIngredients, item as IngredientRating];
        console.log('✅ Added to plate. New count:', newDropped.length);
        setDroppedIngredients(newDropped);
      } else {
        console.log('❌ Not added:', isAlreadyOnPlate ? 'Already on plate' : 'Plate is full');
      }
    },
  });

  const handleSelectIngredient = (ticker: string) => {
    if (onSelectIngredient) {
      onSelectIngredient(ticker);
    }
  };

  const handleViewDetails = (ingredient: IngredientRating) => {
    setSelectedIngredient(ingredient);
  };

  const handleRemoveFromPlate = (ticker: string) => {
    setDroppedIngredients(droppedIngredients.filter(ing => ing.ticker !== ticker));
  };

  const handleSendToPass = () => {
    console.log('🍽️ Sending to pass:', {
      count: droppedIngredients.length,
      tickers: droppedIngredients.map(i => i.ticker)
    });
    
    setIsSendingToPass(true);
    
    // Save to localStorage
    const tickers = droppedIngredients.map(ing => ing.ticker);
    localStorage.setItem('selectedIngredients', JSON.stringify(tickers));
    console.log('💾 Saved to localStorage:', tickers);
    
    // Simulate sending to the pass
    setTimeout(() => {
      // Navigate to the-pass with ingredients
      const ingredientsParam = tickers.join(',');
      console.log('🔗 Navigating with:', ingredientsParam);
      window.location.href = `/the-pass?ingredients=${ingredientsParam}`;
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🐼</div>
          <p className="text-neutral-400">Lawrence is checking the pantry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Mobile Stacked */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">🐼 Lawrence's Ingredient Pantry</h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-1">
            Select your ingredients • {ingredients.length} available coins
          </p>
        </div>
        
        {/* Search - Full Width on Mobile */}
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 pl-10 text-white focus:outline-none focus:border-emerald-500/50 text-sm sm:text-base"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">🔍</span>
        </div>
      </div>

      {/* Sort Buttons - Mobile Optimized */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs sm:text-sm text-neutral-400 flex items-center px-1">Sort by:</span>
        <button
          onClick={() => setSortBy('stars')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            sortBy === 'stars'
              ? 'bg-emerald-500 text-white'
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          }`}
        >
          ⭐ Stars
        </button>
        <button
          onClick={() => setSortBy('sentiment')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            sortBy === 'sentiment'
              ? 'bg-emerald-500 text-white'
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          }`}
        >
          📊 Sentiment
        </button>
        <button
          onClick={() => setSortBy('lsRatio')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            sortBy === 'lsRatio'
              ? 'bg-emerald-500 text-white'
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          }`}
        >
          📈 L/S Ratio
        </button>
        <button
          onClick={() => setSortBy('risk')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            sortBy === 'risk'
              ? 'bg-emerald-500 text-white'
              : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
          }`}
        >
          🛡️ Risk
        </button>
      </div>

      {/* Responsive Ingredient Layouts with Drag and Drop */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Mobile: Horizontal Shelf (<768px) */}
        <div className="block md:hidden">
          <IngredientShelf
            ingredients={filteredIngredients}
            selectedIngredients={selectedIngredients}
            onSelectIngredient={handleSelectIngredient}
            onViewDetails={handleViewDetails}
          />
        </div>

        {/* Tablet/Small Desktop: Grid (768px-1024px) */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-4">
            {filteredIngredients.map((ingredient, index) => (
              <IngredientCard
                key={ingredient.ticker}
                ingredient={ingredient}
                isSelected={selectedIngredients.includes(ingredient.ticker)}
                onSelect={handleSelectIngredient}
                onViewDetails={handleViewDetails}
                index={index}
                isDraggable={true}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Circular Orbit Layout (>1024px) */}
        <div className="hidden lg:block relative">
          <CircularLayout
            ingredients={filteredIngredients}
            selectedIngredients={selectedIngredients}
            onSelectIngredient={handleSelectIngredient}
            onViewDetails={handleViewDetails}
            droppedIngredients={droppedIngredients}
            onRemoveFromPlate={handleRemoveFromPlate}
          />
          
          {/* Continue Button - Appears when 1+ ingredients on plate */}
          {droppedIngredients.length > 0 && !isSendingToPass && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-50"
            >
              <button
                onClick={handleSendToPass}
                className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex flex-col items-start gap-1"
              >
                <span className="text-2xl">{droppedIngredients.length} selected</span>
                <span className="text-sm opacity-90">Click Continue →</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Drag Overlay - Shows dragging item */}
        <DragOverlay>
          {activeItem ? (
            <div className="opacity-80 scale-110 transform">
              <IngredientCard
                ingredient={activeItem as IngredientRating}
                isSelected={selectedIngredients.includes(activeItem.ticker)}
                onSelect={handleSelectIngredient}
                onViewDetails={handleViewDetails}
                isDraggable={false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Sending to the Pass Overlay */}
      {isSendingToPass && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 z-[100] flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-9xl"
            >
              🍽️
            </motion.div>
            <h2 className="text-5xl font-bold text-white font-theatrical">
              Sending to the Pass...
            </h2>
            <p className="text-xl text-neutral-400">
              Your strategy is being prepared
            </p>
            <motion.div
              className="flex gap-2 justify-center"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 rounded-full bg-primary"
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Selected Ingredient Modal */}
      {selectedIngredient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIngredient(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-900 border-2 border-emerald-500/50 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  {selectedIngredient.ticker}
                </h3>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getColorClass(selectedIngredient.color)}`}>
                    {selectedIngredient.score}/100
                  </span>
                  <span className="text-3xl">{getMichelinStars(selectedIngredient.score)}</span>
                  <span className="text-sm text-neutral-400">{getMichelinLabel(selectedIngredient.score)}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIngredient(null)}
                className="text-neutral-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Recommendation */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
              <p className="text-emerald-400 font-semibold">{selectedIngredient.recommendation}</p>
            </div>

            {/* Lawrence's Chef Notes */}
            <div className="space-y-3 mb-6">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                🐼 Lawrence's Chef Notes
              </h4>
              {selectedIngredient.chefNotes.map((note, i) => (
                <div key={i} className="bg-neutral-800/50 rounded-lg p-3 text-neutral-300 text-sm">
                  {note}
                </div>
              ))}
            </div>

            {/* Market Data */}
            {selectedIngredient.marketData && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-800/50 rounded-lg p-3">
                  <div className="text-xs text-neutral-400 mb-1">24h Volume</div>
                  <div className="text-lg font-bold text-white">{selectedIngredient.marketData.volume24h}</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3">
                  <div className="text-xs text-neutral-400 mb-1">Total Notional</div>
                  <div className="text-lg font-bold text-white">{selectedIngredient.marketData.totalNotional}</div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3">
                  <div className="text-xs text-neutral-400 mb-1">Traders</div>
                  <div className="text-lg font-bold text-white">
                    🟢 {selectedIngredient.marketData.traders.long} / 🔴 {selectedIngredient.marketData.traders.short}
                  </div>
                </div>
                <div className="bg-neutral-800/50 rounded-lg p-3">
                  <div className="text-xs text-neutral-400 mb-1">Majority P/L</div>
                  <div className="text-lg font-bold text-white">
                    {selectedIngredient.marketData.majSidePL === 'Profit' ? '📈 Profit' : '📉 Loss'}
                  </div>
                </div>
              </div>
            )}

            {/* Add to Recipe Button */}
            <button 
              onClick={() => {
                if (onSelectIngredient) {
                  onSelectIngredient(selectedIngredient.ticker);
                }
                setSelectedIngredient(null);
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all"
            >
              {selectedIngredients.includes(selectedIngredient.ticker) ? 'Remove from Recipe' : 'Add to Recipe'} 🍳
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

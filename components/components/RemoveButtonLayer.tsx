'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ButtonPosition {
  ticker: string;
  x: number;
  y: number;
  onRemove: (ticker: string) => void;
}

interface RemoveButtonLayerProps {
  buttons: ButtonPosition[];
}

export default function RemoveButtonLayer({ buttons }: RemoveButtonLayerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleRemove = (ticker: string, onRemove: (ticker: string) => void) => {
    console.log('Remove button clicked:', ticker);
    const confirmed = window.confirm(`Remove ${ticker} from your strategy?`);
    if (confirmed) {
      onRemove(ticker);
    }
  };

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {buttons.map((button) => (
        <motion.button
          key={button.ticker}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRemove(button.ticker, button.onRemove)}
          onTouchEnd={() => handleRemove(button.ticker, button.onRemove)}
          className="absolute w-8 h-8 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white cursor-pointer"
          style={{
            left: `${button.x}px`,
            top: `${button.y}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto',
          }}
          aria-label={`Remove ${button.ticker}`}
          type="button"
        >
          <X size={18} strokeWidth={4} />
        </motion.button>
      ))}
    </div>,
    document.body
  );
}

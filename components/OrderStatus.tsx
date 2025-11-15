'use client';

import { motion } from 'framer-motion';

export type OrderStatusType = 'pending' | 'executing' | 'completed' | 'failed';

interface OrderStatusProps {
  ticker: string;
  status: OrderStatusType;
  direction: 'LONG' | 'SHORT';
  allocation: number;
  leverage: number;
  message?: string;
}

export default function OrderStatus({
  ticker,
  status,
  direction,
  allocation,
  leverage,
  message,
}: OrderStatusProps) {
  const statusConfig = {
    pending: {
      icon: '⏳',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      label: 'Pending',
    },
    executing: {
      icon: '🔄',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      label: 'Executing',
    },
    completed: {
      icon: '✅',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      label: 'Completed',
    },
    failed: {
      icon: '❌',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      label: 'Failed',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-lg p-4 space-y-3`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.span
            animate={status === 'executing' ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-3xl"
          >
            {config.icon}
          </motion.span>
          <div>
            <h3 className="text-lg font-bold text-white">{ticker}</h3>
            <span className={`text-xs font-semibold ${config.color}`}>
              {config.label}
            </span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
          direction === 'LONG' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {direction}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-neutral-500">Allocation:</span>
          <span className="ml-2 font-bold text-white">{allocation}%</span>
        </div>
        <div>
          <span className="text-neutral-500">Leverage:</span>
          <span className="ml-2 font-bold text-white">{leverage}x</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <p className="text-xs text-neutral-400 italic">{message}</p>
      )}

      {/* Progress Bar (only for executing) */}
      {status === 'executing' && (
        <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-400"
          />
        </div>
      )}
    </motion.div>
  );
}

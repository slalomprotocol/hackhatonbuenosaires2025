'use client';

import { motion } from 'framer-motion';

interface ExecutionAnimationProps {
  isActive: boolean;
}

export default function ExecutionAnimation({ isActive }: ExecutionAnimationProps) {
  if (!isActive) return null;

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Cooking Flames */}
      <div className="relative">
        {/* Main Pan */}
        <motion.div
          animate={{ 
            rotate: [-2, 2, -2],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-9xl"
        >
          🍳
        </motion.div>

        {/* Flames */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="text-4xl"
            >
              🔥
            </motion.div>
          ))}
        </div>

        {/* Steam/Smoke */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, -60],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              className="text-2xl"
            >
              💨
            </motion.div>
          ))}
        </div>

        {/* Sparkles */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute text-xl"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                ✨
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cooking Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 text-center"
      >
        <p className="text-lg font-bold text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text">
          Cooking your strategy... 🔥
        </p>
      </motion.div>
    </div>
  );
}

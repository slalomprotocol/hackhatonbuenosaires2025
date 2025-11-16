'use client';

import { motion } from 'framer-motion';

interface DecorativeCandelabraProps {
  className?: string;
}

export default function DecorativeCandelabra({ className = '' }: DecorativeCandelabraProps) {
  return (
    <motion.svg
      className={`text-primary ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Base */}
      <ellipse cx="50" cy="90" rx="20" ry="5" fill="currentColor" opacity="0.8" />
      
      {/* Stem */}
      <rect x="47" y="40" width="6" height="50" fill="currentColor" />
      
      {/* Center candle */}
      <rect x="45" y="25" width="10" height="20" fill="currentColor" opacity="0.9" />
      
      {/* Flame - Center */}
      <motion.g
        animate={{
          y: [0, -2, 0],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ellipse cx="50" cy="22" rx="3" ry="5" fill="#FCD34D" />
        <ellipse cx="50" cy="20" rx="2" ry="3" fill="#FEF08A" />
      </motion.g>
      
      {/* Left arm */}
      <path 
        d="M 47 50 Q 30 48 25 45"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Left candle */}
      <rect x="20" y="30" width="8" height="15" fill="currentColor" opacity="0.9" />
      
      {/* Flame - Left */}
      <motion.g
        animate={{
          y: [0, -2, 0],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <ellipse cx="24" cy="28" rx="2.5" ry="4" fill="#FCD34D" />
        <ellipse cx="24" cy="26" rx="1.5" ry="2.5" fill="#FEF08A" />
      </motion.g>
      
      {/* Right arm */}
      <path 
        d="M 53 50 Q 70 48 75 45"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Right candle */}
      <rect x="72" y="30" width="8" height="15" fill="currentColor" opacity="0.9" />
      
      {/* Flame - Right */}
      <motion.g
        animate={{
          y: [0, -2, 0],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <ellipse cx="76" cy="28" rx="2.5" ry="4" fill="#FCD34D" />
        <ellipse cx="76" cy="26" rx="1.5" ry="2.5" fill="#FEF08A" />
      </motion.g>
      
      {/* Ornate decorations */}
      <circle cx="50" cy="65" r="4" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="75" r="3" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="85" r="5" fill="currentColor" opacity="0.6" />
    </motion.svg>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Sparkles, ChefHat, ArrowDown } from 'lucide-react';
import DecorativeCandelabra from './DecorativeCandelabra';

export default function HeroSection() {
  const scrollToContent = () => {
    const vh = window.innerHeight;
    window.scrollTo({ top: vh, behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background with elegant dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />
      
      {/* Animated background sparkles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div 
          className="mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Left Candelabra */}
          <DecorativeCandelabra className="h-16 w-16 md:h-24 md:w-24 hidden sm:block" />
          
          <div>
            {/* Title with sparkles */}
            <motion.div 
              className="mb-4 md:mb-6 flex items-center justify-center gap-3 md:gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary animate-pulse" />
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide">
                Be Our Guest
              </h1>
              <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-primary animate-pulse" />
            </motion.div>
            
            {/* Subtitle */}
            <motion.p 
              className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl text-primary mb-4 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Craft Your Trading Dish
            </motion.p>
            
            {/* Decorative divider */}
            <motion.div 
              className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </div>
          
          {/* Right Candelabra */}
          <DecorativeCandelabra className="h-16 w-16 md:h-24 md:w-24 hidden sm:block" />
        </motion.div>
        
        {/* Description */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mb-8 md:mb-12 leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          Create sophisticated trading strategies on <span className="text-primary font-semibold">Hyperliquid</span> with theatrical flair. 
          Mix and match ingredients like a master chef, guided by <span className="text-emerald-400 font-semibold">Lawrence AI</span>.
        </motion.p>
        
        {/* CTA Button */}
        <motion.button 
          onClick={scrollToContent}
          className="group relative px-8 py-4 md:px-12 md:py-6 bg-primary hover:bg-primary-600 text-neutral-950 font-bold text-base md:text-lg rounded-lg border-2 border-primary-600 shadow-golden hover:shadow-golden-lg transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-3">
            <ChefHat className="h-5 w-5 md:h-6 md:w-6" />
            <span>Start Creating</span>
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 animate-pulse" />
          </span>
        </motion.button>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { duration: 1, delay: 1.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <ArrowDown className="h-8 w-8 md:h-10 md:w-10 text-primary/70" />
        </motion.div>
      </div>
    </div>
  );
}

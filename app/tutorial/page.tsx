'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Lawrence's Storybook - Futures Trading Tutorial
 * Explains trading concepts like a children's fairy tale
 */

export default function TutorialPage() {
  const router = useRouter();
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    {
      id: 'intro',
      title: 'Once Upon a Time... 🏰',
      emoji: '📖',
      content: [
        {
          type: 'narration',
          text: 'Once upon a time, in a magical digital kingdom, there lived a wise panda chef named Lawrence. 🐼👨‍🍳',
        },
        {
          type: 'narration',
          text: 'Lawrence ran the most famous restaurant in all the land: SLALOM Protocol. But this wasn\'t an ordinary restaurant...',
        },
        {
          type: 'narration',
          text: 'Instead of serving food, Lawrence helped people cook up trading strategies! Each strategy was like a special dish made from crypto ingredients. 🍽️✨',
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Welcome, young chef! Let me tell you the story of how trading works in our magical kitchen..."',
        },
      ],
    },
    {
      id: 'futures',
      title: 'What Are Futures? 🔮',
      emoji: '🎭',
      content: [
        {
          type: 'narration',
          text: 'Imagine you want to buy a toy, but you don\'t have enough money right now. Your friend says: "I\'ll sell you this toy for $10 next month."',
        },
        {
          type: 'narration',
          text: 'If the toy becomes popular and costs $15 next month, you got a great deal! You saved $5. But if the toy goes on sale for $5, you overpaid. 😅',
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"That\'s exactly how futures trading works! You\'re making a promise to buy or sell something at a future date for a price you agree on today."',
        },
        {
          type: 'narration',
          text: 'In crypto, instead of toys, we trade Bitcoin, Ethereum, and other digital currencies! 🪙',
        },
        {
          type: 'box',
          title: 'Key Concepts',
          items: [
            '📈 LONG = You think the price will go UP (like betting the toy gets more expensive)',
            '📉 SHORT = You think the price will go DOWN (like betting the toy goes on sale)',
            '⚖️ Leverage = Borrowing money to make bigger bets (careful, it\'s risky!)',
          ],
        },
      ],
    },
    {
      id: 'ingredients',
      title: 'The Crypto Ingredients 🧂',
      emoji: '🥘',
      content: [
        {
          type: 'narration',
          text: 'In Lawrence\'s kitchen, every cryptocurrency is like an ingredient for your trading dish! 🌟',
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Let me show you my pantry! Each ingredient has different flavors and strengths..."',
        },
        {
          type: 'box',
          title: 'Common Ingredients',
          items: [
            '🟠 Bitcoin (BTC) = The classic! Like the main course everyone knows and loves',
            '💎 Ethereum (ETH) = Versatile and popular, like a Swiss Army knife',
            '🌊 Solana (SOL) = Fast and fresh, like a quick stir-fry',
            '🔷 Other altcoins = Special spices that add flavor to your dish!',
          ],
        },
        {
          type: 'narration',
          text: 'Lawrence rates each ingredient with Michelin stars ⭐⭐⭐ based on how good they are right now!',
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"A three-star ingredient is exceptional! A one-star needs more time to mature. Choose wisely, chef!"',
        },
      ],
    },
    {
      id: 'strategy',
      title: 'Creating Your Dish 🍳',
      emoji: '👨‍🍳',
      content: [
        {
          type: 'narration',
          text: 'Now comes the fun part - creating your trading strategy! It\'s like following a recipe, but YOU choose the ingredients! 📝',
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"First, pick 3-5 ingredients from my pantry. Don\'t pick too many or your dish will be too complicated!"',
        },
        {
          type: 'box',
          title: 'Step 1: Select Ingredients',
          items: [
            '🎯 Choose 3-5 cryptocurrencies you believe in',
            '⭐ Check Lawrence\'s star ratings',
            '🍽️ Drag them to your golden plate',
          ],
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Next, tell me HOW you want to cook each ingredient. LONG or SHORT? How much leverage? What percentage of your capital?"',
        },
        {
          type: 'box',
          title: 'Step 2: Configure Positions (The Pass)',
          items: [
            '📈 LONG = You think price goes up',
            '📉 SHORT = You think price goes down',
            '⚖️ Leverage = 1x to 50x (higher = riskier!)',
            '💰 Allocation = Must add up to 100%',
          ],
        },
        {
          type: 'narration',
          text: 'Think of allocation like dividing a pizza: if you have 3 friends, you might give 40% to one, 35% to another, and 25% to the third. It must equal 100%! 🍕',
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Lawrence Evaluates Your Dish 🎖️',
      emoji: '⭐',
      content: [
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Ah, you\'ve finished your recipe! Now let me taste it... *puts on chef\'s hat* 👨‍🍳"',
        },
        {
          type: 'narration',
          text: 'Lawrence examines your strategy like a Michelin inspector examining a fancy restaurant! He looks at:',
        },
        {
          type: 'box',
          title: 'What Lawrence Checks',
          items: [
            '🎨 Diversification = Did you mix different ingredients? (Good!)',
            '⚖️ Leverage Balance = Are you taking reasonable risks?',
            '📊 Risk Management = Is your strategy safe enough?',
            '🎯 Position Sizing = Are your allocations smart?',
          ],
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"If your score is 65 or higher, I\'ll give you my approval! Below that... back to the kitchen, chef!"',
        },
        {
          type: 'narration',
          text: 'You\'ll get a grade (A, B, C, or D) and a detailed report. Lawrence wants you to succeed! 💚',
        },
      ],
    },
    {
      id: 'polkadot',
      title: 'The Magic of Polkadot ●',
      emoji: '🔗',
      content: [
        {
          type: 'narration',
          text: 'But here\'s where SLALOM becomes truly special... Every strategy Lawrence approves is written in a magical book that NEVER changes! 📚✨',
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"This magical book is called Polkadot blockchain! It\'s like a library where EVERY book is permanent and everyone can read it."',
        },
        {
          type: 'narration',
          text: 'Think of it like this: When you write your name in wet cement, it stays there forever! That\'s what Polkadot does with your strategy ratings. 🏗️',
        },
        {
          type: 'box',
          title: 'Why Polkadot is Special',
          items: [
            '⛓️ IMMUTABLE = Once written, it can\'t be erased or changed',
            '👀 TRANSPARENT = Anyone can verify Lawrence\'s ratings',
            '🔒 SECURE = Protected by advanced cryptography',
            '🌍 DECENTRALIZED = No single person controls it',
          ],
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"SLALOM is the FIRST restaurant to use Polkadot to store recipe ratings! We\'re making history, chef!"',
        },
        {
          type: 'narration',
          text: 'When Lawrence approves your strategy, he writes it on the Polkadot blockchain. It\'s like getting a permanent stamp of approval! ✅',
        },
      ],
    },
    {
      id: 'hyperliquid',
      title: 'The Trading Kitchen (HyperLiquid) 🏪',
      emoji: '🚀',
      content: [
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Now that your strategy is approved and recorded on Polkadot, it\'s time to COOK! Let\'s send it to the HyperLiquid kitchen!"',
        },
        {
          type: 'narration',
          text: 'HyperLiquid is like a super-fast kitchen where your trading strategy actually gets cooked (executed)! 🍳💨',
        },
        {
          type: 'narration',
          text: 'Imagine you wrote a recipe (your strategy), Lawrence approved it (evaluation), it got recorded in the permanent book (Polkadot), and now professional chefs are cooking it for real (HyperLiquid)!',
        },
        {
          type: 'box',
          title: 'What Happens Next',
          items: [
            '🏦 Your strategy becomes a "Vault" (like a piggy bank)',
            '💰 You deposit money into the vault',
            '🤖 The vault automatically trades according to your recipe',
            '📈 You can watch it grow (or learn from mistakes!)',
          ],
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Remember: trading is risky! Start small, learn, and never risk money you can\'t afford to lose. Even the best chefs burn food sometimes!"',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'You\'re Ready, Chef! 🎓',
      emoji: '🏆',
      content: [
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Bravo! You\'ve completed your training! Now you understand how SLALOM Protocol works! 🎉"',
        },
        {
          type: 'box',
          title: 'What You Learned',
          items: [
            '✅ Futures trading = Making deals for the future',
            '✅ Crypto ingredients = Different coins to trade',
            '✅ Strategy creation = Picking and configuring positions',
            '✅ Lawrence evaluation = Getting your strategy scored',
            '✅ Polkadot magic = Recording everything on-chain',
            '✅ HyperLiquid kitchen = Where trades happen',
          ],
        },
        {
          type: 'narration',
          text: 'SLALOM makes trading accessible by combining:',
        },
        {
          type: 'box',
          title: 'The Secret Recipe',
          items: [
            '🏰 Disney\'s hospitality = Easy, welcoming experience',
            '🐼 Lawrence AI = Your personal trading mentor',
            '⛓️ Polkadot = Transparent, secure record-keeping',
            '🚀 HyperLiquid = High-performance trading engine',
          ],
        },
        {
          type: 'dialogue',
          speaker: 'Lawrence',
          text: '"Now go forth and create amazing strategies! Remember: I\'m always here to guide you. Bon appétit, chef! 👨‍🍳✨"',
        },
        {
          type: 'cta',
          text: 'Ready to Start Your Journey?',
        },
      ],
    },
  ];

  const currentChapterData = chapters[currentChapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-black">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white font-semibold transition-colors"
              >
                ← Home
              </motion.button>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                  <span>📖</span>
                  <span>Lawrence's Storybook</span>
                </h1>
                <p className="text-sm text-neutral-400">Learn trading like a fairy tale</p>
              </div>
            </div>

            {/* Progress */}
            <div className="hidden md:block">
              <div className="text-sm text-neutral-400">
                Chapter {currentChapter + 1} of {chapters.length}
              </div>
              <div className="w-48 h-2 bg-neutral-800 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Chapter Navigation */}
          <div className="mb-8 flex gap-2 overflow-x-auto pb-4">
            {chapters.map((chapter, idx) => (
              <motion.button
                key={chapter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentChapter(idx)}
                className={`
                  px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2
                  ${currentChapter === idx
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                  }
                `}
              >
                <span className="text-xl">{chapter.emoji}</span>
                <span className="text-sm hidden sm:inline">{idx + 1}</span>
              </motion.button>
            ))}
          </div>

          {/* Chapter Content */}
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 md:p-12 space-y-8"
          >
            {/* Chapter Title */}
            <div className="text-center space-y-4">
              <div className="text-6xl">{currentChapterData.emoji}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {currentChapterData.title}
              </h2>
            </div>

            {/* Chapter Content */}
            <div className="space-y-6">
              {currentChapterData.content.map((block, idx) => {
                if (block.type === 'narration') {
                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-lg text-neutral-300 leading-relaxed"
                    >
                      {block.text}
                    </motion.p>
                  );
                }

                if (block.type === 'dialogue') {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-4 border-emerald-500 p-6 rounded-r-xl"
                    >
                      <div className="text-4xl flex-shrink-0">🐼</div>
                      <div>
                        <div className="font-bold text-emerald-400 mb-2">
                          {block.speaker}:
                        </div>
                        <div className="text-neutral-200 italic">
                          {block.text}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                if (block.type === 'box') {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl p-6"
                    >
                      <h3 className="text-xl font-bold text-pink-400 mb-4">
                        {block.title}
                      </h3>
                      <div className="space-y-3">
                        {block.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="text-neutral-300 flex items-start gap-3">
                            <span className="text-pink-400 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                }

                if (block.type === 'cta') {
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-center space-y-6 pt-8"
                    >
                      <h3 className="text-2xl font-bold text-white">{block.text}</h3>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push('/create-dish')}
                          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-bold text-white text-lg shadow-xl"
                        >
                          Start Cooking! 🐼👨‍🍳
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentChapter(0)}
                          className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border-2 border-neutral-700 rounded-lg font-bold text-white text-lg"
                        >
                          Read Again 📖
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                }

                return null;
              })}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-colors"
            >
              ← Previous
            </motion.button>

            <div className="text-sm text-neutral-400">
              {currentChapter + 1} / {chapters.length}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentChapter(Math.min(chapters.length - 1, currentChapter + 1))}
              disabled={currentChapter === chapters.length - 1}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg font-semibold text-white transition-colors"
            >
              Next →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

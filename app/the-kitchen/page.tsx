'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PositionConfig } from '@/components/PositionCard';

export default function TheKitchenPage() {
  const router = useRouter();
  const [positions, setPositions] = useState<PositionConfig[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(true);
  const [lawrenceApproval, setLawrenceApproval] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [evaluation, setEvaluation] = useState({
    score: 0,
    grade: '',
    commentary: '',
    risks: [] as string[],
    strengths: [] as string[],
  });

  useEffect(() => {
    // Load configured positions from localStorage
    const stored = localStorage.getItem('configuredPositions');
    if (!stored) {
      router.push('/create-dish');
      return;
    }

    const loadedPositions: PositionConfig[] = JSON.parse(stored);
    setPositions(loadedPositions);

    // Simulate Lawrence's evaluation
    setTimeout(() => {
      evaluateStrategy(loadedPositions);
      setIsEvaluating(false);
    }, 3000);
  }, [router]);

  const evaluateStrategy = (positions: PositionConfig[]) => {
    // Calculate strategy score based on various factors
    let score = 70; // Base score

    // Check allocation balance
    const allocations = positions.map(p => p.allocation);
    const variance = calculateVariance(allocations);
    if (variance < 200) score += 10; // Well balanced

    // Check leverage
    const avgLeverage = positions.reduce((sum, p) => sum + p.leverage, 0) / positions.length;
    if (avgLeverage <= 10) score += 10; // Conservative leverage
    else if (avgLeverage > 20) score -= 10; // Aggressive leverage

    // Check diversification
    if (positions.length >= 3) score += 10; // Good diversification

    // Generate evaluation
    const grade = score >= 85 ? 'A' : score >= 75 ? 'B' : score >= 65 ? 'C' : 'D';
    
    const risks = [];
    const strengths = [];

    if (avgLeverage > 15) risks.push('High leverage detected - potential for amplified losses');
    if (positions.length < 2) risks.push('Low diversification - concentrated risk');
    if (variance > 300) risks.push('Unbalanced allocation - consider more even distribution');

    if (positions.length >= 3) strengths.push('Good diversification across multiple assets');
    if (avgLeverage <= 10) strengths.push('Conservative leverage approach reduces risk');
    if (variance < 200) strengths.push('Well-balanced allocation strategy');

    const commentary = score >= 75 
      ? `Excellent work! This is a well-thought-out strategy that balances risk and opportunity. I'm approving this dish for bonding.`
      : score >= 65
      ? `A solid strategy with room for improvement. Consider adjusting your allocations or leverage. I'll approve it, but be cautious.`
      : `This strategy needs refinement. The risk profile is concerning. Please reconsider your configuration before proceeding.`;

    setEvaluation({
      score,
      grade,
      commentary,
      risks,
      strengths,
    });

    // Approve if score is 65 or higher
    setLawrenceApproval(score >= 65 ? 'approved' : 'rejected');
  };

  const calculateVariance = (arr: number[]) => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
  };

  const handleProceedToBonding = async () => {
    // Save evaluation results
    localStorage.setItem('strategyEvaluation', JSON.stringify(evaluation));
    
    // Navigate to vault deployment page
    router.push('/deploy-vault');
  };

  const handleGoBack = () => {
    router.push('/the-pass');
  };

  if (isEvaluating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-6">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-9xl"
          >
            🐼
          </motion.div>
          <h2 className="text-4xl font-bold text-white font-theatrical">
            Lawrence is Evaluating...
          </h2>
          <p className="text-neutral-400">
            The chef is tasting your strategy 🍜
          </p>
          <motion.div className="flex gap-2 justify-center">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10" />
        
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="text-8xl mb-4"
            >
              👨‍🍳
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              The Kitchen
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-400">
              🐼 Lawrence's Final Evaluation
            </p>
          </div>
        </div>
      </div>

      {/* Evaluation Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Approval Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 rounded-2xl p-8 text-center ${
              lawrenceApproval === 'approved'
                ? 'bg-emerald-500/10 border-emerald-500/50'
                : 'bg-red-500/10 border-red-500/50'
            }`}
          >
            <div className="text-6xl mb-4">
              {lawrenceApproval === 'approved' ? '✅' : '❌'}
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${
              lawrenceApproval === 'approved' ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {lawrenceApproval === 'approved' ? 'Strategy Approved!' : 'Strategy Needs Work'}
            </h2>
            <p className="text-xl text-neutral-300">
              Grade: <span className="font-bold text-white">{evaluation.grade}</span> ({evaluation.score}/100)
            </p>
          </motion.div>

          {/* Lawrence's Commentary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900/90 border-2 border-primary/40 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">🐼</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Lawrence's Commentary</h3>
                <p className="text-neutral-300 leading-relaxed">{evaluation.commentary}</p>
              </div>
            </div>
          </motion.div>

          {/* Positions Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-900/90 border-2 border-neutral-700 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Your Strategy</h3>
            <div className="space-y-3">
              {positions.map((pos, i) => (
                <div key={i} className="flex items-center justify-between bg-black/30 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-white">{pos.ticker}</span>
                    <span className={`px-2 py-1 rounded text-sm font-bold ${
                      pos.direction === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {pos.direction}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-400">
                      {pos.allocation}% • {pos.leverage}x leverage
                    </div>
                    <div className="text-xs text-neutral-500">{pos.orderType} order</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strengths and Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            {evaluation.strengths.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl p-6"
              >
                <h4 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <span>✨</span>
                  <span>Strengths</span>
                </h4>
                <ul className="space-y-2">
                  {evaluation.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Risks */}
            {evaluation.risks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-6"
              >
                <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Risk Factors</span>
                </h4>
                <ul className="space-y-2">
                  {evaluation.risks.map((risk, i) => (
                    <li key={i} className="text-sm text-neutral-300 flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleGoBack}
              className="flex-1 py-4 px-6 bg-neutral-800 hover:bg-neutral-700 border-2 border-neutral-700 text-white font-bold rounded-xl transition-all"
            >
              ← Back to The Pass
            </button>
            
            {lawrenceApproval === 'approved' && (
              <button
                onClick={handleProceedToBonding}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all"
              >
                Proceed to Bonding 🔥 (1% minimum)
              </button>
            )}
          </div>

          {/* Bonding Info */}
          {lawrenceApproval === 'approved' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-primary/10 border-2 border-primary/30 rounded-xl p-6 text-center"
            >
              <p className="text-neutral-300">
                <span className="font-bold text-primary">Your dish is approved!</span> You've already paid 1 SLALOM to access Lawrence's evaluation. 
                Bonding will start at 1% minimum for other traders to replicate your strategy.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { deployVaultViaBridge, getBridgeStatus } from '@/lib/polkadot-hyperliquid-bridge';
import { VaultDeployment } from '@/lib/hyperliquid';
import { getExplorerUrl, getVaultExplorerUrl } from '@/lib/hyperliquid';

// Disable static generation for this page (uses window/localStorage)
export const dynamic = 'force-dynamic';

interface DeploymentStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  icon: string;
}

export default function DeployVaultPage() {
  const router = useRouter();
  const [polkadotAddress, setPolkadotAddress] = useState<string | null>(null);
  const [vaultName, setVaultName] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: 1,
      title: 'Connect Polkadot Wallet',
      description: 'Sign vault creation with your DOT wallet',
      status: 'pending',
      icon: '🔐',
    },
    {
      id: 2,
      title: 'Record on Polkadot',
      description: 'Create immutable record on Westend testnet',
      status: 'pending',
      icon: '📝',
    },
    {
      id: 3,
      title: 'Deploy to HyperLiquid',
      description: 'Create vault on HyperLiquid testnet',
      status: 'pending',
      icon: '🚀',
    },
    {
      id: 4,
      title: 'Link Addresses',
      description: 'Connect DOT address to HL vault',
      status: 'pending',
      icon: '🔗',
    },
  ]);
  const [deployment, setDeployment] = useState<VaultDeployment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<any>(null);
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    // Load Polkadot address
    const stored = localStorage.getItem('polkadotWalletAddress');
    if (!stored) {
      alert('⚠️ Please connect your Polkadot wallet first');
      router.push('/');
      return;
    }
    setPolkadotAddress(stored);

    // Load strategy and evaluation
    const storedPositions = localStorage.getItem('configuredPositions');
    const storedEvaluation = localStorage.getItem('strategyEvaluation');
    
    if (!storedPositions || !storedEvaluation) {
      alert('⚠️ Please complete your strategy first');
      router.push('/create-dish');
      return;
    }

    setStrategy(JSON.parse(storedPositions));
    setEvaluation(JSON.parse(storedEvaluation));

    // Auto-generate vault name
    const timestamp = Date.now();
    setVaultName(`SLALOM-${timestamp.toString().slice(-6)}`);
  }, [router]);

  const updateStepStatus = (stepId: number, status: DeploymentStep['status']) => {
    setDeploymentSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, status } : step
      )
    );
  };

  const handleDeploy = async () => {
    if (!polkadotAddress || !strategy || !evaluation) {
      alert('Missing required data');
      return;
    }

    setIsDeploying(true);
    setError(null);

    try {
      // Step 1: Sign with Polkadot wallet
      updateStepStatus(1, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2-4: Execute bridge deployment
      updateStepStatus(1, 'completed');
      updateStepStatus(2, 'in_progress');

      const result = await deployVaultViaBridge(
        polkadotAddress,
        vaultName,
        `A ${evaluation.grade}-rated strategy by Lawrence`,
        strategy,
        {
          grade: evaluation.grade,
          score: evaluation.score,
        }
      );

      // All steps completed!
      updateStepStatus(2, 'completed');
      updateStepStatus(3, 'completed');
      updateStepStatus(4, 'completed');

      setDeployment(result.vault);

      // Success!
      console.log('🎉 Vault deployed successfully!');
      console.log('Vault:', result.vault);
      console.log('Bridge TX:', result.bridgeTransaction);

    } catch (err: any) {
      console.error('Deployment failed:', err);
      setError(err.message || 'Deployment failed');
      
      // Mark current step as failed
      const currentStep = deploymentSteps.find(s => s.status === 'in_progress');
      if (currentStep) {
        updateStepStatus(currentStep.id, 'failed');
      }
    } finally {
      setIsDeploying(false);
    }
  };

  const bridgeStatus = getBridgeStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-emerald-500/10" />
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 1 }}
              className="text-8xl mb-4"
            >
              🌉
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Deploy Your Vault
            </h1>
            
            <p className="text-lg text-neutral-400">
              Use the Polkadot ↔ HyperLiquid Bridge
            </p>

            {/* Bridge Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-emerald-400 font-semibold">
                Bridge Operational • {bridgeStatus.totalBridgedVaults} Vaults Deployed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Vault Info Card */}
          {!deployment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/90 border-2 border-neutral-700 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Vault Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Vault Name:</span>
                  <span className="text-white font-mono font-bold">{vaultName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Lawrence Grade:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    {evaluation?.grade}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Score:</span>
                  <span className="text-white font-bold">{evaluation?.score}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Positions:</span>
                  <span className="text-white font-bold">{strategy?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Your DOT Address:</span>
                  <span className="text-white font-mono text-sm">
                    {polkadotAddress?.slice(0, 8)}...{polkadotAddress?.slice(-6)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Deployment Steps */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Deployment Progress</h3>
            
            {deploymentSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  step.status === 'completed'
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : step.status === 'in_progress'
                    ? 'bg-purple-500/10 border-purple-500/50 animate-pulse'
                    : step.status === 'failed'
                    ? 'bg-red-500/10 border-red-500/50'
                    : 'bg-neutral-900/50 border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{step.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white">{step.title}</h4>
                    <p className="text-sm text-neutral-400">{step.description}</p>
                  </div>
                  <div className="text-2xl">
                    {step.status === 'completed' && '✅'}
                    {step.status === 'in_progress' && '⏳'}
                    {step.status === 'failed' && '❌'}
                    {step.status === 'pending' && '⚪'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">❌</div>
                  <div>
                    <h4 className="text-lg font-bold text-red-400 mb-2">Deployment Failed</h4>
                    <p className="text-neutral-300">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Display */}
          <AnimatePresence>
            {deployment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-pink-500/20 border-2 border-emerald-500/50 rounded-xl p-8 text-center space-y-6"
              >
                <div className="text-8xl mb-4">🎉</div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  Vault Deployed Successfully!
                </h2>
                
                <div className="bg-black/30 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Vault Address:</span>
                    <a
                      href={getVaultExplorerUrl(deployment.vaultAddress)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 font-mono text-sm underline"
                    >
                      {deployment.vaultAddress.slice(0, 10)}...{deployment.vaultAddress.slice(-8)}
                    </a>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Transaction Hash:</span>
                    <a
                      href={getExplorerUrl(deployment.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-mono text-sm underline"
                    >
                      {deployment.transactionHash.slice(0, 10)}...{deployment.transactionHash.slice(-8)}
                    </a>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Bonding Progress:</span>
                    <span className="text-white font-bold">
                      {deployment.bondingProgress.current} / {deployment.bondingProgress.target} USDC
                    </span>
                  </div>

                  <div className="pt-4">
                    <div className="w-full bg-neutral-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${deployment.bondingProgress.percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-emerald-500 to-purple-500 h-full"
                      />
                    </div>
                    <p className="text-sm text-neutral-400 mt-2">
                      {deployment.bondingProgress.percentage.toFixed(1)}% funded
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    onClick={() => router.push('/community')}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all"
                  >
                    View in Community Kitchen 🏆
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="flex-1 py-4 px-6 bg-neutral-800 hover:bg-neutral-700 border-2 border-neutral-700 text-white font-bold rounded-xl transition-all"
                  >
                    Create Another Dish 🍳
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Deploy Button */}
          {!deployment && !isDeploying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={handleDeploy}
                disabled={isDeploying}
                className="w-full py-6 px-8 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-500 hover:from-pink-600 hover:via-purple-600 hover:to-emerald-600 text-white text-xl font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🌉 Deploy Vault via Bridge
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-neutral-400">
                  🔐 You'll be asked to sign with your Polkadot wallet
                </p>
                <p className="text-xs text-neutral-500">
                  This creates an immutable record on Westend testnet
                </p>
              </div>
            </motion.div>
          )}

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-purple-500/10 border-2 border-purple-500/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">💡</div>
              <div>
                <h4 className="text-lg font-bold text-purple-400 mb-2">Why This Is Revolutionary</h4>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>First-Ever Integration:</strong> SLALOM is the pioneering bridge between Polkadot and HyperLiquid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>True Cross-Chain DeFi:</strong> Your DOT identity controls your HyperLiquid vault</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>On-Chain Verification:</strong> All actions recorded immutably on Polkadot</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">•</span>
                    <span><strong>Bonding Curve:</strong> Start at 1 SLALOM, scale to 100 USDC through community participation</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

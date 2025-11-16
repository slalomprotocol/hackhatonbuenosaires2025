/**
 * Mock Vault Data
 * This will be replaced with real data from smart contracts and AI recommendations
 */

export interface Vault {
  id: string;
  name: string;
  strategy: string;
  apr: number;
  tvl: string;
  riskLevel: 'low' | 'medium' | 'high';
  chains: string[];
  description: string;
  minInvestment: string;
  aiScore?: number;
  trending?: boolean;
}

export const mockVaults: Vault[] = [
  {
    id: 'vault-1',
    name: 'Ultra Yield Optimizer',
    strategy: 'Aggressive Growth',
    apr: 127.5,
    tvl: '$2.4M',
    riskLevel: 'high',
    chains: ['Arbitrum', 'Solana'],
    description: 'AI-optimized multi-strategy vault targeting maximum yields through algorithmic trading and liquidity provision across high-APR pools.',
    minInvestment: '$100',
    aiScore: 94,
    trending: true,
  },
  {
    id: 'vault-2',
    name: 'Worldchain Stablecoin Yield',
    strategy: 'Conservative Stable',
    apr: 18.3,
    tvl: '$8.7M',
    riskLevel: 'low',
    chains: ['Worldchain', 'Arbitrum'],
    description: 'Low-risk stablecoin vault on Worldchain with human-verified strategies. Perfect for conservative investors seeking steady returns.',
    minInvestment: '$50',
    aiScore: 92,
  },
  {
    id: 'vault-3',
    name: 'Multi-Chain DeFi Basket',
    strategy: 'Balanced Diversified',
    apr: 45.8,
    tvl: '$5.2M',
    riskLevel: 'medium',
    chains: ['Arbitrum', 'Polkadot', 'BNB Chain', 'Solana'],
    description: 'Diversified exposure across 4 chains with AI-powered rebalancing. Optimal risk-adjusted returns through cross-chain liquidity mining.',
    minInvestment: '$200',
    aiScore: 89,
    trending: true,
  },
  {
    id: 'vault-4',
    name: 'Polkadot Parachain Vault',
    strategy: 'Parachain Staking',
    apr: 34.2,
    tvl: '$3.1M',
    riskLevel: 'medium',
    chains: ['Polkadot'],
    description: 'Specialized vault for Polkadot parachain staking and crowdloans. Earn rewards from multiple parachains with automated optimization.',
    minInvestment: '$150',
    aiScore: 86,
  },
  {
    id: 'vault-5',
    name: 'BNB Chain Liquidity Pro',
    strategy: 'Liquidity Mining',
    apr: 67.9,
    tvl: '$4.6M',
    riskLevel: 'high',
    chains: ['BNB Chain'],
    description: 'High-yield liquidity provision on BNB Chain DEXs. AI-driven pair selection and impermanent loss mitigation strategies.',
    minInvestment: '$100',
    aiScore: 81,
  },
  {
    id: 'vault-6',
    name: 'Algorand Pure Stake',
    strategy: 'Pure Staking',
    apr: 12.5,
    tvl: '$6.3M',
    riskLevel: 'low',
    chains: ['Algorand'],
    description: 'Simple and secure Algorand staking vault. Lowest risk option with consistent returns from network validation rewards.',
    minInvestment: '$50',
    aiScore: 85,
  },
  {
    id: 'vault-7',
    name: 'Solana MEV Hunter',
    strategy: 'MEV + Staking',
    apr: 89.4,
    tvl: '$1.9M',
    riskLevel: 'high',
    chains: ['Solana'],
    description: 'Advanced MEV extraction combined with liquid staking on Solana. Cutting-edge strategies for experienced DeFi users.',
    minInvestment: '$250',
    aiScore: 78,
    trending: true,
  },
  {
    id: 'vault-8',
    name: 'Cross-Chain Arbitrage',
    strategy: 'Arbitrage',
    apr: 56.7,
    tvl: '$3.8M',
    riskLevel: 'medium',
    chains: ['Arbitrum', 'Worldchain', 'BNB Chain', 'Polkadot'],
    description: 'AI-powered cross-chain arbitrage opportunities. Automated bridge and swap execution for optimal price differentials.',
    minInvestment: '$300',
    aiScore: 91,
  },
  {
    id: 'vault-9',
    name: 'Stable Income Plus',
    strategy: 'Conservative Mixed',
    apr: 22.1,
    tvl: '$12.4M',
    riskLevel: 'low',
    chains: ['Arbitrum', 'Algorand', 'Worldchain'],
    description: 'Mix of stablecoins and blue-chip assets. AI-optimized for risk-averse investors seeking better returns than traditional savings.',
    minInvestment: '$100',
    aiScore: 93,
  },
  {
    id: 'vault-10',
    name: 'World ID Verified Vault',
    strategy: 'Human-Only Access',
    apr: 38.5,
    tvl: '$2.7M',
    riskLevel: 'medium',
    chains: ['Worldchain'],
    description: 'Exclusive vault requiring World ID verification. Sybil-resistant with fair distribution. Premium yields for verified humans only.',
    minInvestment: '$150',
    aiScore: 88,
  },
];

/**
 * Sort vaults by APR (descending)
 */
export function sortVaultsByAPR(vaults: Vault[]): Vault[] {
  return [...vaults].sort((a, b) => b.apr - a.apr);
}

/**
 * Filter vaults by risk level
 */
export function filterVaultsByRisk(vaults: Vault[], riskLevel: 'low' | 'medium' | 'high'): Vault[] {
  return vaults.filter(v => v.riskLevel === riskLevel);
}

/**
 * Filter vaults by chain
 */
export function filterVaultsByChain(vaults: Vault[], chain: string): Vault[] {
  return vaults.filter(v => v.chains.includes(chain));
}

/**
 * Get top vaults by AI score
 */
export function getTopVaultsByAI(vaults: Vault[], limit: number = 3): Vault[] {
  return [...vaults]
    .filter(v => v.aiScore !== undefined)
    .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
    .slice(0, limit);
}

/**
 * Get trending vaults
 */
export function getTrendingVaults(vaults: Vault[]): Vault[] {
  return vaults.filter(v => v.trending);
}

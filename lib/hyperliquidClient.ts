import axios from 'axios';

const HYPERLIQUID_API = 'https://api.hyperliquid.xyz';

export interface HyperliquidVault {
  address: string;
  leader: string;
  name: string;
  description: string;
  tvl: number;
  apr: number;
  pastMonthReturn: number;
  accountValue: number;
  pnl: number;
  numDepositors: number;
  minDeposit?: number;
  maxDeposit?: number;
  portfolio?: PortfolioPoint[];
  positions?: Position[];
  depositors?: Depositor[];
}

export interface PortfolioPoint {
  time: number;
  accountValue: number;
  pnl: number;
}

export interface Position {
  coin: string;
  szi: string;
  positionValue: number;
  entryPx: string;
  markPx: string;
  pnl: number;
  roe: number;
  liquidationPx: string;
  margin: number;
  leverage: number;
  funding: number;
}

export interface Depositor {
  user: string;
  vaultEquity: string;
  pnl?: string;
  accountValue?: string;
}

export interface UserVaultPosition {
  vault: string;
  equity: number;
  allTimeEarned?: number;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: HYPERLIQUID_API,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

/**
 * Get all market metadata (coins, leverage limits, etc.)
 */
export async function getMarketMetadata() {
  try {
    const response = await api.post('/info', {
      type: 'metaAndAssetCtxs'
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch market metadata:', error);
    throw error;
  }
}

/**
 * Get all mid prices for all coins
 */
export async function getAllPrices() {
  try {
    const response = await api.post('/info', {
      type: 'allMids'
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch prices:', error);
    throw error;
  }
}

/**
 * Get detailed information about a specific vault
 * @param vaultAddress - The vault contract address
 * @param userAddress - Optional user address to get user-specific data
 */
export async function getVaultDetails(
  vaultAddress: string,
  userAddress: string = '0x0000000000000000000000000000000000000000'
): Promise<HyperliquidVault | null> {
  try {
    const response = await api.post('/info', {
      type: 'vaultDetails',
      user: userAddress,
      vaultAddress: vaultAddress
    });

    if (!response.data) {
      return null;
    }

    const data = response.data;
    
    // Filter out closed vaults
    if (data.isClosed) {
      console.log(`Vault ${vaultAddress} is closed, skipping...`);
      return null;
    }
    
    // Extract account value from portfolio data
    let accountValue = 0;
    if (data.portfolio && Array.isArray(data.portfolio)) {
      // Find the "week" or "day" portfolio data
      const weekData = data.portfolio.find((p: any) => p[0] === 'week' || p[0] === 'day');
      if (weekData && weekData[1] && weekData[1].accountValueHistory) {
        const history = weekData[1].accountValueHistory;
        if (history.length > 0) {
          const latest = history[history.length - 1];
          accountValue = parseFloat(latest[1] || '0');
        }
      }
    }

    // Calculate num depositors from followers array
    const numDepositors = data.followers ? data.followers.length : 0;
    
    // Transform the API response to our format
    return {
      address: vaultAddress,
      leader: data.leader || '',
      name: data.name || 'Unnamed Vault',
      description: data.description || '',
      tvl: accountValue, // Use account value from portfolio as TVL
      apr: parseFloat(data.apr || '0') * 100, // Convert to percentage
      pastMonthReturn: calculateMonthReturn(data.portfolio),
      accountValue: accountValue,
      pnl: parseFloat(data.pnl || '0'),
      numDepositors: numDepositors,
      minDeposit: parseFloat(data.minDeposit || '100'),
      maxDeposit: parseFloat(data.maxCapacity || '0'),
      portfolio: data.portfolio || [],
      positions: data.positions || [],
      depositors: data.followers || []
    };
  } catch (error) {
    console.error(`Failed to fetch vault details for ${vaultAddress}:`, error);
    return null;
  }
}

/**
 * Get user's vault deposits/positions
 * @param userAddress - The user's wallet address
 */
export async function getUserVaultEquities(userAddress: string): Promise<UserVaultPosition[]> {
  try {
    const response = await api.post('/info', {
      type: 'userVaultEquities',
      user: userAddress
    });
    
    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((item: any) => ({
      vault: item.vault,
      equity: parseFloat(item.equity || '0'),
      allTimeEarned: item.allTimePnl ? parseFloat(item.allTimePnl) : undefined
    }));
  } catch (error) {
    console.error('Failed to fetch user vault equities:', error);
    return [];
  }
}

/**
 * Get user's spot balance (USDC, etc.)
 * @param userAddress - The user's wallet address
 */
export async function getUserSpotBalance(userAddress: string) {
  try {
    const response = await api.post('/info', {
      type: 'spotClearinghouseState',
      user: userAddress
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user spot balance:', error);
    return null;
  }
}

/**
 * Get user's perpetuals account state
 * @param userAddress - The user's wallet address
 */
export async function getUserClearinghouseState(userAddress: string) {
  try {
    const response = await api.post('/info', {
      type: 'clearinghouseState',
      user: userAddress
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user clearinghouse state:', error);
    return null;
  }
}

/**
 * Check if a user has deposits in a specific vault
 * @param userAddress - The user's wallet address
 * @param vaultAddress - The vault address to check
 */
export async function isUserVaultHolder(userAddress: string, vaultAddress: string): Promise<boolean> {
  try {
    const equities = await getUserVaultEquities(userAddress);
    return equities.some(e => e.vault.toLowerCase() === vaultAddress.toLowerCase() && e.equity > 0);
  } catch (error) {
    console.error('Failed to check vault holder status:', error);
    return false;
  }
}

/**
 * Calculate past month return from portfolio data
 * Portfolio structure: [["day", {accountValueHistory: [[timestamp, value], ...], pnlHistory: [[timestamp, value], ...]}], ...]
 */
function calculateMonthReturn(portfolio?: any): number {
  if (!portfolio || !Array.isArray(portfolio)) {
    return 0;
  }

  // Try to find "month" data first, then fall back to "week" or "day"
  const monthData = portfolio.find((p: any) => p[0] === 'month');
  const dataToUse = monthData || portfolio.find((p: any) => p[0] === 'week') || portfolio.find((p: any) => p[0] === 'day');
  
  if (!dataToUse || !dataToUse[1] || !dataToUse[1].accountValueHistory) {
    return 0;
  }

  const history = dataToUse[1].accountValueHistory;
  
  if (history.length < 2) {
    return 0;
  }

  const firstPoint = history[0];
  const lastPoint = history[history.length - 1];
  
  const firstValue = parseFloat(firstPoint[1] || '0');
  const lastValue = parseFloat(lastPoint[1] || '0');
  
  if (firstValue === 0) {
    return 0;
  }

  const returnPct = ((lastValue - firstValue) / firstValue) * 100;
  return returnPct;
}

/**
 * Get formatted vault display name
 */
export function getVaultDisplayName(vault: HyperliquidVault): string {
  if (vault.name && vault.name !== 'Unnamed Vault') {
    return vault.name;
  }
  
  // Fallback: use truncated address
  return `${vault.address.slice(0, 6)}...${vault.address.slice(-4)}`;
}

/**
 * Format large numbers for display
 */
export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Format APR percentage
 */
export function formatAPR(apr: number): string {
  if (Math.abs(apr) >= 1000) {
    return `${(apr / 1000).toFixed(2)}K%`;
  }
  return `${apr.toFixed(2)}%`;
}

/**
 * Get risk level based on APR
 */
export function getRiskLevel(apr: number): 'low' | 'medium' | 'high' {
  const absApr = Math.abs(apr);
  if (absApr > 100) return 'high';
  if (absApr > 50) return 'medium';
  return 'low';
}

/**
 * Calculate AI score (similar to mock data logic)
 */
export function calculateAIScore(vault: HyperliquidVault): number {
  const ageScore = 30; // We don't have age data yet
  const tvlScore = Math.min(vault.tvl / 10_000_000, 1) * 20;
  const depositorScore = Math.min(vault.numDepositors / 100, 1) * 20;
  const aprScore = Math.min(Math.abs(vault.apr) / 100, 1) * 30;
  
  return Math.min(100, ageScore + tvlScore + depositorScore + aprScore);
}

/**
 * Get vault's spot balances
 * @param vaultAddress - The vault address
 */
export async function getVaultBalances(vaultAddress: string) {
  try {
    const response = await api.post('/info', {
      type: 'spotClearinghouseState',
      user: vaultAddress
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vault balances:', error);
    return null;
  }
}

/**
 * Get vault's open positions
 * @param vaultAddress - The vault address
 */
export async function getVaultPositions(vaultAddress: string) {
  try {
    const response = await api.post('/info', {
      type: 'clearinghouseState',
      user: vaultAddress
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vault positions:', error);
    return null;
  }
}

/**
 * Get vault's trade history
 * @param vaultAddress - The vault address
 */
export async function getVaultTradeHistory(vaultAddress: string) {
  try {
    const response = await api.post('/info', {
      type: 'userFills',
      user: vaultAddress
    });
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch vault trade history:', error);
    return [];
  }
}

/**
 * Get vault's funding history
 * @param vaultAddress - The vault address  
 * @param startTime - Optional start time in milliseconds
 * @param endTime - Optional end time in milliseconds
 */
export async function getVaultFundingHistory(
  vaultAddress: string,
  startTime?: number,
  endTime?: number
) {
  try {
    const body: any = {
      type: 'userFunding',
      user: vaultAddress
    };
    
    if (startTime) body.startTime = startTime;
    if (endTime) body.endTime = endTime;
    
    const response = await api.post('/info', body);
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch vault funding history:', error);
    return [];
  }
}

/**
 * Get complete vault data with all details
 * @param vaultAddress - The vault address
 * @param userAddress - Optional user address
 */
export async function getCompleteVaultData(
  vaultAddress: string,
  userAddress?: string
) {
  try {
    const [details, balances, positions, tradeHistory, fundingHistory] = await Promise.all([
      getVaultDetails(vaultAddress, userAddress),
      getVaultBalances(vaultAddress),
      getVaultPositions(vaultAddress),
      getVaultTradeHistory(vaultAddress),
      getVaultFundingHistory(vaultAddress)
    ]);

    return {
      details,
      balances,
      positions,
      tradeHistory,
      fundingHistory
    };
  } catch (error) {
    console.error('Failed to fetch complete vault data:', error);
    throw error;
  }
}

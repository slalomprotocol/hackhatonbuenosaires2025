import { getVaultDetails, HyperliquidVault } from './hyperliquidClient';

/**
 * Extended list of Hyperliquid vault addresses to discover on page load
 * These are automatically tested and filtered when the page loads
 * Only open, working vaults will be displayed
 * 
 * Note: Closed vaults are automatically filtered out by getVaultDetails()
 * Failed API calls (500 errors) are silently skipped
 */
export const KNOWN_VAULT_ADDRESSES = [
  // Verified working vaults
  '0x0a4b7ca4fa9fb9a8aebf74c5c6b335bcaa86d5b4', // acme - verified working
  
  // Potential vaults from Hyperliquid UI (top vaults by TVL)
  // These will be auto-tested on page load
  '0x367578ce98fce9e72f96a7c9ef6acbc47c8e49da', // AceVault Hyper01
  '0x7789d24ad1edb3d9c969e5d9fefc76c17e37f60d', // Growi HF
  '0x2b80f48a2a2e6e24d50ab5b6e70c7f2ab1e16f4b', // Systemic Strategies HyperGrowth
  '0x5dd5d0fa90301e09bb7ce2c0c83ded2c2e5d5d77', // Sifu
  '0xe41b3ab4c84ef26b3d84f5fb8071a65d7eeb5891', // MC Recovery Fund
  '0x1fa14be7bb5e37d1c2c185d9b8d23f2b0d651d08', // Amber Ridge
  '0x3d32d99f31a04ed5d2daf8c1855deb8ca0fdcfec', // FC Genesis - Quantum
  '0x68af51d9da3a3ef3ddb5f03f42f59ad4e32ec654', // Making Bacon
  '0xd5ba3f27fbad740a1ac0dd1e4f8f09ab879bc6ae', // Pew pew
  
  // Additional vault addresses from Hyperliquid
  // Add more addresses here - they will be automatically validated
  // Only working, open vaults will be shown to users
];

/**
 * Fetch all vaults from the registry
 * @param userAddress - Optional user address to check holdings
 */
export async function fetchAllVaults(userAddress?: string): Promise<HyperliquidVault[]> {
  const vaultPromises = KNOWN_VAULT_ADDRESSES.map(address => 
    getVaultDetails(address, userAddress)
  );
  
  const vaults = await Promise.allSettled(vaultPromises);
  
  // Filter out failed requests and null values
  return vaults
    .filter((result): result is PromiseFulfilledResult<HyperliquidVault> => 
      result.status === 'fulfilled' && result.value !== null
    )
    .map(result => result.value);
}

/**
 * Fetch a single vault by address
 * @param vaultAddress - The vault address
 * @param userAddress - Optional user address to check holdings
 */
export async function fetchVaultByAddress(
  vaultAddress: string,
  userAddress?: string
): Promise<HyperliquidVault | null> {
  return getVaultDetails(vaultAddress, userAddress);
}

/**
 * Search vaults by name or description
 * @param query - Search query string
 * @param userAddress - Optional user address
 */
export async function searchVaults(
  query: string,
  userAddress?: string
): Promise<HyperliquidVault[]> {
  const vaults = await fetchAllVaults(userAddress);
  const lowerQuery = query.toLowerCase();
  
  return vaults.filter(vault => 
    vault.name.toLowerCase().includes(lowerQuery) ||
    vault.description.toLowerCase().includes(lowerQuery) ||
    vault.address.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get top vaults sorted by TVL
 * @param limit - Maximum number of vaults to return
 * @param userAddress - Optional user address
 */
export async function getTopVaultsByTVL(
  limit: number = 10,
  userAddress?: string
): Promise<HyperliquidVault[]> {
  const vaults = await fetchAllVaults(userAddress);
  return vaults
    .sort((a, b) => b.tvl - a.tvl)
    .slice(0, limit);
}

/**
 * Get top vaults sorted by APR
 * @param limit - Maximum number of vaults to return
 * @param userAddress - Optional user address
 */
export async function getTopVaultsByAPR(
  limit: number = 10,
  userAddress?: string
): Promise<HyperliquidVault[]> {
  const vaults = await fetchAllVaults(userAddress);
  return vaults
    .sort((a, b) => b.apr - a.apr)
    .slice(0, limit);
}

/**
 * Filter vaults by risk level
 * @param riskLevel - The risk level to filter by
 * @param userAddress - Optional user address
 */
export async function getVaultsByRisk(
  riskLevel: 'low' | 'medium' | 'high',
  userAddress?: string
): Promise<HyperliquidVault[]> {
  const vaults = await fetchAllVaults(userAddress);
  
  return vaults.filter(vault => {
    const absApr = Math.abs(vault.apr);
    if (riskLevel === 'high') return absApr > 100;
    if (riskLevel === 'medium') return absApr > 50 && absApr <= 100;
    return absApr <= 50;
  });
}

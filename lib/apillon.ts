/**
 * Apillon SDK Configuration
 * Centralized configuration for all Apillon services
 */

import { Storage, Hosting, Nft, Identity, Computing } from '@apillon/sdk';

// API Configuration
const apillonConfig = {
  key: process.env.APILLON_API_KEY!,
  secret: process.env.APILLON_API_SECRET!,
};

// Validate configuration
if (!process.env.APILLON_API_KEY || !process.env.APILLON_API_SECRET) {
  console.warn('⚠️ Apillon API credentials not found in environment variables!');
  console.warn('Make sure .env.local has APILLON_API_KEY and APILLON_API_SECRET');
}

// Initialize Apillon Services
export const apillonStorage = new Storage(apillonConfig);
export const apillonHosting = new Hosting(apillonConfig);
export const apillonNft = new Nft(apillonConfig);
export const apillonIdentity = new Identity(apillonConfig);
export const apillonComputing = new Computing(apillonConfig);

/**
 * Storage Helper Functions
 */
export class ApillonStorageHelper {
  /**
   * Upload file to IPFS via Apillon
   */
  static async uploadFile(file: Buffer, fileName: string): Promise<{
    cid: string;
    url: string;
  }> {
    try {
      // Create a bucket if none exists
      const buckets = await apillonStorage.listBuckets();
      let bucket;

      if (buckets.items && buckets.items.length > 0) {
        bucket = buckets.items[0];
      } else {
        // Create new bucket
        bucket = await apillonStorage.createBucket({
          name: 'SLALOM Protocol Storage',
          description: 'Storage for SLALOM Protocol vault metadata and documents',
        });
      }

      // Upload file
      const uploadResult = await bucket.uploadFiles([{
        fileName,
        content: file,
      }]);

      // Get IPFS CID
      const files = await bucket.listObjects();
      const uploadedFile = files.items?.find(f => f.name === fileName);

      if (!uploadedFile || !uploadedFile.CID) {
        throw new Error('Failed to get IPFS CID');
      }

      return {
        cid: uploadedFile.CID,
        url: `${process.env.APILLON_IPFS_GATEWAY}/ipfs/${uploadedFile.CID}`,
      };
    } catch (error) {
      console.error('Error uploading to Apillon IPFS:', error);
      throw error;
    }
  }

  /**
   * Upload JSON metadata
   */
  static async uploadJSON(data: any, fileName: string): Promise<{
    cid: string;
    url: string;
  }> {
    const jsonString = JSON.stringify(data, null, 2);
    const buffer = Buffer.from(jsonString, 'utf-8');
    return this.uploadFile(buffer, fileName);
  }

  /**
   * Get file from IPFS
   */
  static async getFile(cid: string): Promise<any> {
    try {
      const response = await fetch(`${process.env.APILLON_IPFS_GATEWAY}/ipfs/${cid}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching from IPFS:', error);
      throw error;
    }
  }
}

/**
 * Hosting Helper Functions
 */
export class ApillonHostingHelper {
  /**
   * Deploy website to Apillon hosting
   */
  static async deployWebsite(websiteName: string, files: any[]): Promise<string> {
    try {
      // Create or get website
      const websites = await apillonHosting.listWebsites();
      let website;

      if (websites.items && websites.items.length > 0) {
        website = websites.items[0];
      } else {
        website = await apillonHosting.createWebsite({
          name: websiteName,
          description: 'SLALOM Protocol Website',
        });
      }

      // Upload files
      await website.uploadFiles(files);

      // Deploy to production
      const deployment = await website.deploy({
        environment: 'production',
      });

      return deployment.deploymentUuid;
    } catch (error) {
      console.error('Error deploying website:', error);
      throw error;
    }
  }
}

/**
 * Multi-Chain RPC Configuration
 */
export const chainConfigs = {
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum',
    rpcUrl: process.env.ARBITRUM_RPC_URL,
    color: '#28A0F0',
    explorer: 'https://arbiscan.io',
  },
  polkadot: {
    chainId: 0,
    name: 'Polkadot',
    rpcUrl: process.env.POLKADOT_RPC_URL,
    color: '#E6007A',
    explorer: 'https://polkadot.subscan.io',
  },
  solana: {
    name: 'Solana',
    rpcUrl: process.env.SOLANA_RPC_URL,
    color: '#14F195',
    explorer: 'https://solscan.io',
  },
  worldchain: {
    chainId: 480,
    name: 'Worldchain',
    rpcUrl: process.env.WORLDCHAIN_RPC_URL,
    color: '#000000',
    explorer: 'https://worldchain-mainnet.explorer.alchemy.com',
  },
  bnb: {
    chainId: 56,
    name: 'BNB Chain',
    rpcUrl: process.env.BSC_RPC_URL,
    color: '#F3BA2F',
    explorer: 'https://bscscan.com',
  },
  algorand: {
    name: 'Algorand',
    rpcUrl: process.env.ALGORAND_RPC_URL,
    color: '#000000',
    explorer: 'https://algoexplorer.io',
  },
};

/**
 * Vault Metadata Helper
 */
export class VaultMetadataHelper {
  /**
   * Upload vault metadata to IPFS
   */
  static async uploadVaultMetadata(vaultData: {
    name: string;
    strategy: string;
    chains: string[];
    creator: string;
    createdAt: number;
  }): Promise<{ cid: string; url: string }> {
    const metadata = {
      ...vaultData,
      version: '1.0.0',
      protocol: 'SLALOM',
      timestamp: Date.now(),
    };

    return ApillonStorageHelper.uploadJSON(
      metadata,
      `vault-${vaultData.name.toLowerCase().replace(/\s+/g, '-')}.json`
    );
  }

  /**
   * Get vault metadata from IPFS
   */
  static async getVaultMetadata(cid: string): Promise<any> {
    return ApillonStorageHelper.getFile(cid);
  }
}

/**
 * Health Check
 */
export async function checkApillonHealth(): Promise<{
  storage: boolean;
  hosting: boolean;
  configured: boolean;
}> {
  // Return default values on client-side
  if (typeof window !== 'undefined') {
    return {
      storage: false,
      hosting: false,
      configured: false,
    };
  }

  const health = {
    storage: false,
    hosting: false,
    configured: !!(process.env.APILLON_API_KEY && process.env.APILLON_API_SECRET),
  };

  try {
    if (apillonStorage) {
      await apillonStorage.listBuckets();
      health.storage = true;
    }
  } catch (error) {
    console.warn('Apillon Storage health check failed:', error);
  }

  try {
    if (apillonHosting) {
      await apillonHosting.listWebsites();
      health.hosting = true;
    }
  } catch (error) {
    console.warn('Apillon Hosting health check failed:', error);
  }

  return health;
}

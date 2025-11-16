import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

// Polkadot testnet endpoints
const TESTNET_ENDPOINTS = {
  westend: 'wss://westend-rpc.polkadot.io',
  paseo: 'wss://paseo.rpc.amforc.com',
  rococo: 'wss://rococo-rpc.polkadot.io',
};

let api: ApiPromise | null = null;

/**
 * Initialize connection to Polkadot testnet
 */
export async function initPolkadotApi(endpoint: string = TESTNET_ENDPOINTS.westend): Promise<ApiPromise> {
  if (api && api.isConnected) {
    return api;
  }

  try {
    const provider = new WsProvider(endpoint);
    api = await ApiPromise.create({ provider });
    
    console.log('✅ Connected to Polkadot testnet:', endpoint);
    console.log('Chain:', await api.rpc.system.chain());
    console.log('Node:', await api.rpc.system.name());
    console.log('Version:', await api.rpc.system.version());
    
    return api;
  } catch (error) {
    console.error('Failed to connect to Polkadot:', error);
    throw error;
  }
}

/**
 * Get current API instance
 */
export function getPolkadotApi(): ApiPromise | null {
  return api;
}

/**
 * Disconnect from Polkadot
 */
export async function disconnectPolkadot(): Promise<void> {
  if (api) {
    await api.disconnect();
    api = null;
  }
}

/**
 * Get account balance
 */
export async function getAccountBalance(address: string): Promise<string> {
  if (!api) {
    throw new Error('Polkadot API not initialized');
  }

  const { data: balance } = await api.query.system.account(address);
  return balance.free.toString();
}

/**
 * Submit a remark transaction (simple on-chain action for demo)
 */
export async function submitRemark(
  address: string,
  remark: string
): Promise<string> {
  if (!api) {
    throw new Error('Polkadot API not initialized');
  }

  try {
    const injector = await web3FromAddress(address);
    const remarkTx = api.tx.system.remark(remark);

    return new Promise((resolve, reject) => {
      remarkTx
        .signAndSend(address, { signer: injector.signer }, ({ status, txHash }) => {
          if (status.isInBlock) {
            console.log(`Transaction included in block: ${status.asInBlock}`);
          }
          
          if (status.isFinalized) {
            console.log(`Transaction finalized in block: ${status.asFinalized}`);
            resolve(txHash.toString());
          }
        })
        .catch(reject);
    });
  } catch (error) {
    console.error('Error submitting remark:', error);
    throw error;
  }
}

/**
 * Store user rating on-chain (using system.remark for demo)
 * In production, this would be a custom pallet or smart contract
 */
export async function storeRatingOnChain(
  address: string,
  rating: {
    ticker: string;
    stars: number;
    timestamp: number;
  }
): Promise<string> {
  const remarkData = JSON.stringify({
    type: 'SLALOM_RATING',
    ...rating,
  });

  return submitRemark(address, remarkData);
}

/**
 * Query recent ratings from chain events
 * This is a simplified version - production would use indexer or smart contract storage
 */
export async function queryRecentRatings(limit: number = 10): Promise<any[]> {
  if (!api) {
    throw new Error('Polkadot API not initialized');
  }

  try {
    const signedBlock = await api.rpc.chain.getBlock();
    const apiAt = await api.at(signedBlock.block.header.hash);
    
    // Get system events
    const events = await apiAt.query.system.events();
    
    const ratings: any[] = [];
    
    events.forEach((record) => {
      const { event } = record;
      
      if (event.section === 'system' && event.method === 'Remarked') {
        try {
          const remarkData = event.data.toString();
          const parsed = JSON.parse(remarkData);
          
          if (parsed.type === 'SLALOM_RATING') {
            ratings.push(parsed);
          }
        } catch (e) {
          // Not a valid rating remark
        }
      }
    });
    
    return ratings.slice(0, limit);
  } catch (error) {
    console.error('Error querying ratings:', error);
    return [];
  }
}

/**
 * Get testnet faucet info for users
 */
export function getTestnetFaucetInfo() {
  return {
    westend: {
      name: 'Westend Testnet',
      faucet: 'https://faucet.polkadot.io/',
      explorer: 'https://westend.subscan.io/',
    },
    paseo: {
      name: 'Paseo Testnet',
      faucet: 'https://faucet.polkadot.io/',
      explorer: 'https://paseo.subscan.io/',
    },
  };
}

/**
 * Format balance from planck to DOT
 */
export function formatBalance(balance: string): string {
  const dot = parseFloat(balance) / Math.pow(10, 12);
  return dot.toFixed(4);
}

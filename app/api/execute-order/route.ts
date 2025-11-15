import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface Position {
  ticker: string;
  direction: 'LONG' | 'SHORT';
  leverage: number;
  allocation: number;
  orderType: 'MARKET' | 'LIMIT';
  limitPrice?: number;
}

interface ExecuteOrderRequest {
  positions: Position[];
  totalCapital?: number;
}

interface ExecuteOrderResponse {
  success: boolean;
  message: string;
  orderIds?: string[];
  executedPositions?: {
    ticker: string;
    orderId: string;
    status: 'FILLED' | 'PENDING' | 'FAILED';
    executionPrice: number;
    quantity: number;
  }[];
  error?: string;
}

/**
 * POST /api/execute-order
 * 
 * Mock API endpoint for executing configured positions.
 * In production, this would integrate with HyperLiquid API.
 * 
 * @see https://hyperliquid.gitbook.io/hyperliquid-docs for real API integration
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body: ExecuteOrderRequest = await request.json();
    const { positions, totalCapital = 10000 } = body;

    // Validate request
    if (!positions || !Array.isArray(positions) || positions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request: positions array is required',
        } as ExecuteOrderResponse,
        { status: 400 }
      );
    }

    // Validate total allocation
    const totalAllocation = positions.reduce((sum, pos) => sum + pos.allocation, 0);
    if (Math.abs(totalAllocation - 100) > 0.1) {
      return NextResponse.json(
        {
          success: false,
          error: `Total allocation must be 100%. Current: ${totalAllocation}%`,
        } as ExecuteOrderResponse,
        { status: 400 }
      );
    }

    // Simulate order execution
    // In production, this would call HyperLiquid API:
    // - POST to https://api.hyperliquid.xyz/exchange
    // - Use authenticated endpoints with API keys
    // - Handle rate limiting, retries, and error states

    const executedPositions = positions.map((pos) => {
      // Generate mock order ID
      const orderId = `HL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Mock execution price (current market price with some slippage)
      const basePrice = getMockMarketPrice(pos.ticker);
      const slippage = pos.orderType === 'MARKET' ? (Math.random() - 0.5) * 0.002 : 0; // 0.2% max slippage
      const executionPrice = pos.limitPrice || basePrice * (1 + slippage);

      // Calculate quantity based on allocation
      const capitalForPosition = (totalCapital * pos.allocation) / 100;
      const quantity = (capitalForPosition * pos.leverage) / executionPrice;

      return {
        ticker: pos.ticker,
        orderId,
        status: 'FILLED' as const,
        executionPrice: parseFloat(executionPrice.toFixed(2)),
        quantity: parseFloat(quantity.toFixed(6)),
      };
    });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response: ExecuteOrderResponse = {
      success: true,
      message: `Successfully executed ${positions.length} position(s)`,
      orderIds: executedPositions.map((p) => p.orderId),
      executedPositions,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error executing orders:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      } as ExecuteOrderResponse,
      { status: 500 }
    );
  }
}

/**
 * Mock market price function
 * In production, this would fetch real-time prices from HyperLiquid API
 */
function getMockMarketPrice(ticker: string): number {
  const mockPrices: Record<string, number> = {
    BTC: 43250.50,
    ETH: 2285.75,
    SOL: 98.32,
    AVAX: 35.67,
    MATIC: 0.87,
    LINK: 14.23,
    UNI: 6.45,
    AAVE: 95.12,
    DOT: 7.89,
    ATOM: 10.45,
    // Add more as needed
  };

  return mockPrices[ticker] || 100.0;
}

/**
 * GET /api/execute-order
 * Health check endpoint
 */
export async function GET(): Promise<Response> {
  return NextResponse.json({
    status: 'ok',
    message: 'Order execution API is operational (mock mode)',
    environment: process.env.NODE_ENV || 'development',
  });
}

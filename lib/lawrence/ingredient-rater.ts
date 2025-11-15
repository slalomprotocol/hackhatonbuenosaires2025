/**
 * Lawrence Ingredient Rating System
 * Based on MaravillaMoon's proven token rating methods
 */

import { HyperDashClient, CoinMarketData } from './hyperdash-client';

export interface IngredientRating {
  ticker: string;
  score: number; // 0-100
  quality: string;
  sentiment: string;
  lsRatio: number;
  riskLevel: string;
  color: 'green' | 'yellow' | 'red';
  recommendation: string;
  chefNotes: string[];
  marketData: CoinMarketData | null;
}

export class LawrenceIngredientRater {
  private hyperdash: HyperDashClient;

  constructor() {
    this.hyperdash = new HyperDashClient();
  }

  /**
   * Rate a single ingredient (coin)
   * Using MaravillaMoon's proven methodology
   */
  async rateIngredient(ticker: string): Promise<IngredientRating> {
    console.log(`[LAWRENCE] 🐼 Rating ingredient: ${ticker}...`);

    // Fetch real-time market data
    const marketData = await this.hyperdash.getCoinData(ticker);

    if (!marketData) {
      return this.getDefaultRating(ticker);
    }

    // Calculate score using MaravillaMoon factors
    const score = this.calculateScore(marketData);
    
    // Analyze sentiment
    const sentiment = this.analyzeSentiment(marketData.lsRatio);
    
    // Assess risk level
    const riskLevel = this.assessRisk(marketData);
    
    // Get color (red/yellow/green)
    const color = this.getColor(score);
    
    // Generate recommendation
    const recommendation = this.generateRecommendation(score, riskLevel);
    
    // Generate Lawrence's chef notes
    const chefNotes = this.generateChefNotes(ticker, marketData, score);

    return {
      ticker,
      score,
      quality: this.scoreToQuality(score),
      sentiment,
      lsRatio: marketData.lsRatio,
      riskLevel,
      color,
      recommendation,
      chefNotes,
      marketData
    };
  }

  /**
   * Rate multiple ingredients at once
   */
  async rateMultipleIngredients(tickers: string[]): Promise<IngredientRating[]> {
    const ratings = await Promise.all(
      tickers.map(ticker => this.rateIngredient(ticker))
    );
    return ratings;
  }

  /**
   * Get all available ingredients with ratings
   */
  async getAllAvailableIngredients(): Promise<IngredientRating[]> {
    console.log('[LAWRENCE] 🐼 Fetching all available ingredients...');
    
    const coins = await this.hyperdash.getTopCoins(50); // Top 50 by notional
    
    const ratings = await Promise.all(
      coins.map(coin => this.rateIngredient(coin.ticker))
    );

    console.log(`[LAWRENCE] ✓ Rated ${ratings.length} ingredients`);
    return ratings;
  }

  /**
   * Calculate score based on MaravillaMoon methodology
   * Factors:
   * 1. L/S Ratio (balance is good, extremes are risky)
   * 2. Trader count (more traders = more reliable)
   * 3. P/L status (profit = bullish)
   * 4. Open interest (higher = more liquid)
   */
  private calculateScore(data: CoinMarketData): number {
    let score = 50; // Start neutral

    // Factor 1: L/S Ratio (balanced is best)
    const lsRatio = data.lsRatio;
    if (lsRatio >= 45 && lsRatio <= 65) {
      score += 20; // Neutral/balanced market
    } else if (lsRatio >= 35 && lsRatio <= 75) {
      score += 10; // Moderate bias
    } else if (lsRatio > 75 || lsRatio < 25) {
      score -= 15; // Extreme crowding (dangerous)
    }

    // Factor 2: Trader count (more = better)
    const totalTraders = data.traders.long + data.traders.short;
    if (totalTraders > 100) {
      score += 10; // Highly active
    } else if (totalTraders > 50) {
      score += 5; // Active
    } else if (totalTraders < 20) {
      score -= 10; // Low activity = risky
    }

    // Factor 3: P/L status
    if (data.majSidePL === 'Profit') {
      score += 10; // Profitable trend
    } else {
      score -= 5; // Losing positions
    }

    // Factor 4: Notional value (liquidity proxy)
    const notional = this.parseNotional(data.totalNotional);
    if (notional > 100_000_000) {
      score += 10; // High liquidity
    } else if (notional > 10_000_000) {
      score += 5; // Good liquidity
    } else if (notional < 1_000_000) {
      score -= 10; // Low liquidity = risky
    }

    // Clamp to 0-100
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Analyze sentiment from L/S ratio
   */
  private analyzeSentiment(lsRatio: number): string {
    if (lsRatio > 70) return 'Very Bullish';
    if (lsRatio > 55) return 'Bullish';
    if (lsRatio < 30) return 'Very Bearish';
    if (lsRatio < 45) return 'Bearish';
    return 'Neutral';
  }

  /**
   * Assess risk level
   */
  private assessRisk(data: CoinMarketData): string {
    let riskPoints = 0;

    // Extreme L/S ratio
    if (data.lsRatio > 75 || data.lsRatio < 25) {
      riskPoints += 2;
    }

    // Low trader count
    const totalTraders = data.traders.long + data.traders.short;
    if (totalTraders < 20) {
      riskPoints += 2;
    }

    // Losing positions
    if (data.majSidePL === 'Loss') {
      riskPoints += 1;
    }

    // Low notional (illiquid)
    const notional = this.parseNotional(data.totalNotional);
    if (notional < 5_000_000) {
      riskPoints += 1;
    }

    if (riskPoints >= 4) return 'Very High';
    if (riskPoints >= 2) return 'High';
    if (riskPoints >= 1) return 'Medium';
    return 'Low';
  }

  /**
   * Get color based on score
   */
  private getColor(score: number): 'green' | 'yellow' | 'red' {
    if (score >= 70) return 'green';
    if (score >= 50) return 'yellow';
    return 'red';
  }

  /**
   * Generate recommendation
   */
  private generateRecommendation(score: number, risk: string): string {
    if (score >= 75 && risk !== 'Very High') {
      return '⭐ Highly Recommended - Excellent ingredient!';
    }
    if (score >= 60 && risk === 'Low') {
      return '✅ Recommended - Good quality ingredient';
    }
    if (score >= 50) {
      return '⚠️ Use with Caution - Mix with safer ingredients';
    }
    if (score >= 40) {
      return '⚠️ Risky - Only for experienced chefs';
    }
    return '❌ Avoid - Too risky right now';
  }

  /**
   * Generate Lawrence's chef notes
   */
  private generateChefNotes(ticker: string, data: CoinMarketData, score: number): string[] {
    const notes: string[] = [];

    // Opening based on score
    if (score >= 75) {
      notes.push(`🐼 "Ah, ${ticker}! A magnificent ingredient, my dear guest!"`);
    } else if (score >= 60) {
      notes.push(`🐼 "Hmm, ${ticker} is quite good, though needs careful preparation."`);
    } else if (score >= 50) {
      notes.push(`🐼 "${ticker}? A bit tricky, but manageable with the right recipe."`);
    } else {
      notes.push(`🐼 "Oh dear, ${ticker} is rather... unpredictable at the moment."`);
    }

    // L/S Ratio notes
    const lsRatio = data.lsRatio;
    if (lsRatio > 70) {
      notes.push(`⚠️ "Everyone wants a taste! ${lsRatio}% longs - beware of the crowd!"`);
    } else if (lsRatio < 30) {
      notes.push(`⚠️ "Too many shorts! ${100 - lsRatio}% betting against it - contrarian opportunity?"`);
    } else if (lsRatio >= 50 && lsRatio <= 60) {
      notes.push(`✅ "Perfectly balanced sentiment - like a well-seasoned dish!"`);
    }

    // Trader activity
    const totalTraders = data.traders.long + data.traders.short;
    if (totalTraders > 100) {
      notes.push(`👥 "${totalTraders} traders watching - very popular ingredient!"`);
    } else if (totalTraders < 20) {
      notes.push(`⚠️ "Only ${totalTraders} traders - not very popular, handle with care!"`);
    }

    // P/L status
    if (data.majSidePL === 'Profit') {
      notes.push(`📈 "The majority is profitable - a good sign!"`);
    } else {
      notes.push(`📉 "Currently losing - might need time to recover."`);
    }

    // Final advice
    if (score >= 70) {
      notes.push(`💡 "I recommend using this in aggressive growth recipes!"`);
    } else if (score >= 60) {
      notes.push(`💡 "Perfect for balanced recipes with risk management!"`);
    } else if (score >= 50) {
      notes.push(`💡 "Use sparingly, and always with a protective stop-loss!"`);
    } else {
      notes.push(`💡 "Perhaps wait for better market conditions, dear guest!"`);
    }

    return notes;
  }

  /**
   * Score to quality string
   */
  private scoreToQuality(score: number): string {
    if (score >= 80) return 'Excellent ⭐⭐⭐⭐⭐';
    if (score >= 70) return 'Very Good ⭐⭐⭐⭐';
    if (score >= 60) return 'Good ⭐⭐⭐';
    if (score >= 50) return 'Fair ⭐⭐';
    if (score >= 40) return 'Poor ⭐';
    return 'Very Poor';
  }

  /**
   * Parse notional value
   */
  private parseNotional(text: string): number {
    const cleaned = text.replace(/[$,]/g, '');
    
    if (cleaned.includes('B')) {
      return parseFloat(cleaned.replace('B', '')) * 1e9;
    } else if (cleaned.includes('M')) {
      return parseFloat(cleaned.replace('M', '')) * 1e6;
    } else if (cleaned.includes('K')) {
      return parseFloat(cleaned.replace('K', '')) * 1e3;
    }
    
    return parseFloat(cleaned) || 0;
  }

  /**
   * Default rating when data unavailable
   */
  private getDefaultRating(ticker: string): IngredientRating {
    return {
      ticker,
      score: 50,
      quality: 'Unknown',
      sentiment: 'Neutral',
      lsRatio: 50,
      riskLevel: 'Medium',
      color: 'yellow',
      recommendation: '⚠️ No data available - proceed with caution',
      chefNotes: [
        `🐼 "I couldn't find fresh data for ${ticker}, dear guest!"`,
        `💡 "Check back later when the market wakes up!"`
      ],
      marketData: null
    };
  }
}

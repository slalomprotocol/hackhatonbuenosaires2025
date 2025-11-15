/**
 * Lawrence AI Ingredient Rating API
 * Rates ingredients using real-time HyperDash data
 */

import { NextRequest, NextResponse } from 'next/server';
import { LawrenceIngredientRater } from '@/lib/lawrence/ingredient-rater';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const ticker = searchParams.get('ticker');

    const rater = new LawrenceIngredientRater();

    if (ticker) {
      // Rate a specific ingredient
      console.log(`[API] Rating ingredient: ${ticker}`);
      const rating = await rater.rateIngredient(ticker);
      
      return NextResponse.json({
        success: true,
        rating
      });
    } else {
      // Get all available ingredients
      console.log('[API] Fetching all available ingredients');
      const ratings = await rater.getAllAvailableIngredients();
      
      return NextResponse.json({
        success: true,
        count: ratings.length,
        ratings
      });
    }
  } catch (error: any) {
    console.error('[API] Error rating ingredient:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tickers } = body;

    if (!tickers || !Array.isArray(tickers)) {
      return NextResponse.json({
        success: false,
        error: 'tickers array is required'
      }, { status: 400 });
    }

    const rater = new LawrenceIngredientRater();
    console.log(`[API] Rating ${tickers.length} ingredients`);
    
    const ratings = await rater.rateMultipleIngredients(tickers);

    return NextResponse.json({
      success: true,
      count: ratings.length,
      ratings
    });
  } catch (error: any) {
    console.error('[API] Error rating ingredients:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

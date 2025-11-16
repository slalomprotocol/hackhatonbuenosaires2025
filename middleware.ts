import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Security middleware for SLALOM Protocol
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Content Security Policy (CSP) - Prevent XSS
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js requires unsafe-eval
      "style-src 'self' 'unsafe-inline'", // Tailwind requires unsafe-inline
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.hyperliquid.info https://hyperdash.info https://api.hyperliquid.xyz https://*.apillon.io wss://*.hyperliquid.info",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  );

  // 2. Security Headers
  response.headers.set('X-Frame-Options', 'DENY'); // Prevent clickjacking
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME sniffing
  response.headers.set('X-XSS-Protection', '1; mode=block'); // XSS protection
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // 3. HTTPS Only (Strict-Transport-Security)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // 4. Rate Limiting (Basic IP-based)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const rateLimit = getRateLimit(ip);
  
  if (rateLimit.exceeded) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Too many requests', 
        message: 'Please wait before making more requests',
        retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      }),
      { 
        status: 429, 
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000))
        }
      }
    );
  }

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining));
  response.headers.set('X-RateLimit-Reset', String(rateLimit.resetTime));

  return response;
}

/**
 * Rate limiting logic
 * 100 requests per 15 minutes per IP
 */
function getRateLimit(ip: string): { exceeded: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;

  const current = rateLimitStore.get(ip);

  if (!current || now > current.resetTime) {
    // New window
    const resetTime = now + windowMs;
    rateLimitStore.set(ip, { count: 1, resetTime });
    return { exceeded: false, remaining: maxRequests - 1, resetTime };
  }

  // Increment count
  current.count++;
  rateLimitStore.set(ip, current);

  return {
    exceeded: current.count > maxRequests,
    remaining: Math.max(0, maxRequests - current.count),
    resetTime: current.resetTime
  };
}

// Apply to API routes only
export const config = {
  matcher: ['/api/:path*', '/create-dish/:path*']
};

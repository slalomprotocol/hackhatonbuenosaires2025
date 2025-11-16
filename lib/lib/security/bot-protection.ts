/**
 * Bot Protection & Anti-Scraping Measures
 * for SLALOM Protocol
 */

/**
 * Detect bot-like behavior
 */
export function detectBotBehavior(request: {
  userAgent?: string;
  ip?: string;
  requestCount?: number;
  timeWindow?: number;
}): { isBot: boolean; reason?: string } {
  
  // Check User-Agent
  if (request.userAgent) {
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i
    ];
    
    for (const pattern of botPatterns) {
      if (pattern.test(request.userAgent)) {
        return { isBot: true, reason: 'Bot user agent detected' };
      }
    }
  }
  
  // Check request rate (simple heuristic)
  if (request.requestCount && request.timeWindow) {
    const requestsPerMinute = (request.requestCount / request.timeWindow) * 60000;
    
    // More than 60 requests per minute = likely bot
    if (requestsPerMinute > 60) {
      return { isBot: true, reason: 'Excessive request rate' };
    }
  }
  
  return { isBot: false };
}

/**
 * Generate honeypot trap for bots
 * Hidden field that humans won't fill but bots will
 */
export function generateHoneypot(): string {
  return `
    <input 
      type="text" 
      name="website" 
      id="website" 
      style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0;" 
      tabindex="-1" 
      autocomplete="off"
      aria-hidden="true"
    />
  `;
}

/**
 * Validate honeypot - if filled, it's a bot
 */
export function validateHoneypot(honeypotValue: string): boolean {
  // If honeypot field has any value, it's a bot
  return !honeypotValue || honeypotValue.trim() === '';
}

/**
 * Add invisible watermark to content
 * Helps track scrapers in legal proceedings
 */
export function addInvisibleWatermark(content: string, userId: string): string {
  const watermark = `
    <!-- 
      Copyright © 2024 SLALOM Protocol. All rights reserved.
      Content ID: ${userId}
      Timestamp: ${Date.now()}
      Unauthorized copying or distribution is prohibited.
    -->
  `;
  
  return watermark + content;
}

/**
 * Obfuscate sensitive data from scrapers
 * Use CSS to hide/show content
 */
export function obfuscateContent(text: string): string {
  // Split text into visible and hidden parts
  // Bots see garbage, humans see correct text via CSS
  const chars = text.split('');
  const obfuscated = chars.map((char, i) => {
    if (i % 2 === 0) {
      return `<span class="real">${char}</span>`;
    } else {
      return `<span class="fake" style="display:none;">${String.fromCharCode(65 + Math.floor(Math.random() * 26))}</span>`;
    }
  }).join('');
  
  return obfuscated;
}

/**
 * Generate challenge for suspicious requests
 * Simple math problem that requires JavaScript
 */
export function generateChallenge(): { question: string; answer: number; token: string } {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const answer = a + b;
  
  // Generate token (simple hash of answer + timestamp)
  const timestamp = Date.now();
  const token = Buffer.from(`${answer}:${timestamp}`).toString('base64');
  
  return {
    question: `What is ${a} + ${b}?`,
    answer,
    token
  };
}

/**
 * Verify challenge response
 */
export function verifyChallenge(token: string, userAnswer: number): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [correctAnswer, timestamp] = decoded.split(':');
    
    // Check if token expired (5 minutes)
    const now = Date.now();
    if (now - parseInt(timestamp) > 5 * 60 * 1000) {
      return false;
    }
    
    // Check answer
    return parseInt(correctAnswer) === userAnswer;
  } catch {
    return false;
  }
}

/**
 * Monitor traffic patterns for anomalies
 */
export interface TrafficMetrics {
  requestsPerMinute: number;
  uniqueIPs: number;
  bounceRate: number;
  averageSessionDuration: number;
  suspiciousPatterns: string[];
}

export function analyzeTraffic(metrics: TrafficMetrics): {
  suspicious: boolean;
  alerts: string[];
} {
  const alerts: string[] = [];
  
  // High request rate
  if (metrics.requestsPerMinute > 100) {
    alerts.push('Unusually high request rate detected');
  }
  
  // Low session duration (bots don't stay long)
  if (metrics.averageSessionDuration < 5) {
    alerts.push('Very short session durations detected');
  }
  
  // High bounce rate
  if (metrics.bounceRate > 80) {
    alerts.push('Abnormally high bounce rate');
  }
  
  // Few unique IPs with many requests = bot farm
  if (metrics.uniqueIPs < 10 && metrics.requestsPerMinute > 50) {
    alerts.push('Potential bot farm detected');
  }
  
  return {
    suspicious: alerts.length > 0,
    alerts
  };
}

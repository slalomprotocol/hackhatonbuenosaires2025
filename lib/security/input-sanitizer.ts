/**
 * Input Sanitization & Validation
 * Prevent XSS and injection attacks
 */

/**
 * Sanitize user input - remove dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script tags specifically
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove javascript: and data: protocols
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/data:/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  return sanitized.trim();
}

/**
 * Validate ticker symbol (only uppercase letters)
 */
export function validateTicker(ticker: string): boolean {
  if (!ticker || ticker.length === 0 || ticker.length > 10) {
    return false;
  }
  
  // Only uppercase letters
  return /^[A-Z]+$/.test(ticker);
}

/**
 * Validate strategy name
 */
export function validateStrategyName(name: string): boolean {
  if (!name || name.length < 3 || name.length > 50) {
    return false;
  }
  
  // Alphanumeric, spaces, and some special chars only
  return /^[a-zA-Z0-9\s\-_.,!?()]+$/.test(name);
}

/**
 * Validate Ethereum address
 */
export function validateEthAddress(address: string): boolean {
  if (!address) return false;
  
  // Basic format check (0x followed by 40 hex chars)
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate percentage (0-100)
 */
export function validatePercentage(value: number): boolean {
  return typeof value === 'number' && value >= 0 && value <= 100;
}

/**
 * Validate amount (positive number)
 */
export function validateAmount(amount: number): boolean {
  return typeof amount === 'number' && amount > 0 && isFinite(amount);
}

/**
 * Encode output for safe HTML rendering
 * Use this before displaying user input in HTML
 */
export function encodeHtmlOutput(text: string): string {
  if (!text) return '';
  
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return text.replace(/[&<>"'/]/g, char => htmlEntities[char] || char);
}

/**
 * Sanitize JSON input
 */
export function sanitizeJSON(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeJSON(item));
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeJSON(obj[key]);
      }
    }
    return sanitized;
  }
  
  return obj;
}

/**
 * Validate API request body
 */
export function validateApiRequest(
  body: any,
  requiredFields: string[],
  optionalFields: string[] = []
): { valid: boolean; error?: string } {
  
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  
  // Check required fields
  for (const field of requiredFields) {
    if (!(field in body) || body[field] === null || body[field] === undefined) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  
  // Check for unexpected fields
  const allowedFields = [...requiredFields, ...optionalFields];
  for (const field in body) {
    if (!allowedFields.includes(field)) {
      return { valid: false, error: `Unexpected field: ${field}` };
    }
  }
  
  return { valid: true };
}

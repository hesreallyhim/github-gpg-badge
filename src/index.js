/**
 * GitHub GPG Key Badge - Cloudflare Worker
 * 
 * Generates dynamic SVG badges showing whether a GitHub user
 * has a public GPG key available at github.com/{username}.gpg
 * 
 * Usage:
 *   GET /{username}.svg
 *   GET /{username}.svg?style=split|card|flat|flat-square
 *   GET /{username}.svg?label=Custom+Label
 *   GET /{username}.svg?style=card&theme=light|dark
 */

// Badge generation functions
const generateSplitBadge = (hasKey, label = 'GPG Key') => {
  const labelWidth = Math.max(90, label.length * 7.5 + 40);
  const rightWidth = hasKey ? 88 : 82;
  const totalWidth = labelWidth + rightWidth;
  const statusText = hasKey ? 'Verified' : 'Missing';
  const rightGradient = hasKey ? 'rightGradGreen' : 'rightGradRed';
  
  const checkIcon = `<path d="M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm3.54 5.54l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L6 7.94l3.47-3.47a.75.75 0 111.06 1.06z" fill-opacity="0.95"/>`;
  const xIcon = `<path d="M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm2.78 8.72a.75.75 0 11-1.06 1.06L7 8.06l-1.72 1.72a.75.75 0 01-1.06-1.06L5.94 7 4.22 5.28a.75.75 0 011.06-1.06L7 5.94l1.72-1.72a.75.75 0 111.06 1.06L8.06 7l1.72 1.72z" fill-opacity="0.95"/>`;
  
  return `<svg width="${totalWidth}" height="28" viewBox="0 0 ${totalWidth} 28" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#374151"/>
      <stop offset="100%" stop-color="#1f2937"/>
    </linearGradient>
    <linearGradient id="rightGradGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
    <linearGradient id="rightGradRed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="0" y="0" width="${labelWidth}" height="28" rx="6" ry="6" fill="url(#leftGrad)"/>
    <rect x="${labelWidth - 6}" y="0" width="10" height="28" fill="url(#leftGrad)"/>
    <rect x="${labelWidth}" y="0" width="${rightWidth}" height="28" rx="6" ry="6" fill="url(#${rightGradient})"/>
    <rect x="${labelWidth}" y="0" width="10" height="28" fill="url(#${rightGradient})"/>
    <g transform="translate(12, 7)" fill="white">
      <rect x="2" y="5" width="10" height="8" rx="1" fill-opacity="0.9"/>
      <path d="M4 5V3.5C4 1.57 5.57 0 7.5 0S11 1.57 11 3.5V5" stroke="white" stroke-width="1.5" fill="none" stroke-opacity="0.9"/>
    </g>
    <text x="32" y="18" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="12" font-weight="600" fill="white">${escapeXml(label)}</text>
    <g transform="translate(${labelWidth + 10}, 7)" fill="white">
      ${hasKey ? checkIcon : xIcon}
    </g>
    <text x="${labelWidth + 32}" y="18" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" font-weight="600" fill="white">${statusText}</text>
  </g>
</svg>`;
};

const generateCardBadge = (hasKey, username, label = 'GPG Key', isDark = true) => {
  const bg = isDark ? '#111827' : '#ffffff';
  const border = isDark ? '#374151' : '#e5e7eb';
  const textPrimary = isDark 
    ? (hasKey ? '#4ade80' : '#9ca3af') 
    : (hasKey ? '#16a34a' : '#6b7280');
  const textSecondary = isDark ? '#9ca3af' : '#6b7280';
  const iconBg = hasKey 
    ? (isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)')
    : (isDark ? '#374151' : '#f3f4f6');
  const iconColor = hasKey ? (isDark ? '#4ade80' : '#16a34a') : '#9ca3af';
  const statusText = hasKey ? 'Available' : 'Not Found';
  
  return `<svg width="220" height="52" viewBox="0 0 220 52" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <g filter="url(#cardShadow)">
    <rect x="0" y="0" width="220" height="52" rx="12" fill="${bg}" stroke="${border}" stroke-width="1"/>
    <rect x="12" y="10" width="32" height="32" rx="8" fill="${iconBg}"/>
    <g transform="translate(18, 16)" fill="${iconColor}">
      <path d="M10 0L0 4v6c0 5.55 4.16 10.74 10 12 5.84-1.26 10-6.45 10-12V4L10 0zm0 10.99h8c-.53 4.12-3.28 7.79-8 8.94V11H2V5.3l8-3.11v8.8z"/>
    </g>
    <text x="54" y="22" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="11" fill="${textSecondary}">@${escapeXml(username)}</text>
    <text x="54" y="38" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="${textPrimary}">${escapeXml(label)} ${statusText}</text>
  </g>
</svg>`;
};

const generateFlatBadge = (hasKey, label = 'GPG Key', square = false) => {
  const statusText = hasKey ? 'available' : 'none';
  const rightWidth = hasKey ? 62 : 42;
  const totalWidth = 70 + rightWidth;
  const radius = square ? 0 : 4;
  const rightColor = hasKey ? '#22c55e' : '#6b7280';
  
  return `<svg width="${totalWidth}" height="20" viewBox="0 0 ${totalWidth} 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="70" height="20" fill="#555" rx="${radius}" ry="${radius}"/>
  <rect x="${70 - radius}" y="0" width="${radius}" height="20" fill="#555"/>
  <rect x="70" y="0" width="${rightWidth}" height="20" fill="${rightColor}" rx="${radius}" ry="${radius}"/>
  <rect x="70" y="0" width="${radius}" height="20" fill="${rightColor}"/>
  <g fill="#010101" fill-opacity="0.3">
    <text x="35" y="15" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${escapeXml(label)}</text>
    <text x="${70 + rightWidth/2}" y="15" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${statusText}</text>
  </g>
  <g fill="white">
    <text x="35" y="14" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${escapeXml(label)}</text>
    <text x="${70 + rightWidth/2}" y="14" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${statusText}</text>
  </g>
</svg>`;
};

const generateErrorBadge = (label = 'GPG Key', message = 'error') => {
  const rightWidth = message.length * 7 + 10;
  const totalWidth = 70 + rightWidth;
  
  return `<svg width="${totalWidth}" height="20" viewBox="0 0 ${totalWidth} 20" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="70" height="20" fill="#555" rx="4" ry="4"/>
  <rect x="66" y="0" width="4" height="20" fill="#555"/>
  <rect x="70" y="0" width="${rightWidth}" height="20" fill="#eab308" rx="4" ry="4"/>
  <rect x="70" y="0" width="4" height="20" fill="#eab308"/>
  <g fill="#010101" fill-opacity="0.3">
    <text x="35" y="15" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${escapeXml(label)}</text>
    <text x="${70 + rightWidth/2}" y="15" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${escapeXml(message)}</text>
  </g>
  <g fill="white">
    <text x="35" y="14" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${escapeXml(label)}</text>
    <text x="${70 + rightWidth/2}" y="14" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">${escapeXml(message)}</text>
  </g>
</svg>`;
};

// Utility to escape XML special characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Validate GitHub username format
function isValidUsername(username) {
  // GitHub usernames: alphanumeric, hyphens, max 39 chars, no consecutive hyphens, can't start/end with hyphen
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(username);
}

// Determine if GitHub response contains a real user-uploaded key (not the placeholder block)
function hasUserGpgKey(text) {
  const trimmed = text.trim();
  if (!trimmed) return false;

  const hasArmoredBlock = trimmed.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----');
  if (!hasArmoredBlock) return false;

  const placeholder = /hasn't uploaded any gpg keys/i;
  if (placeholder.test(trimmed)) return false;

  return true;
}

// Check if GitHub user has GPG key
async function checkGpgKey(username) {
  try {
    const response = await fetch(`https://github.com/${username}.gpg`, {
      headers: {
        'User-Agent': 'GPG-Badge-Service/1.0',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return { hasKey: false, error: null };
      }
      return { hasKey: false, error: 'github-error' };
    }
    
    const text = await response.text();
    return { hasKey: hasUserGpgKey(text), error: null };

  } catch (err) {
    return { hasKey: false, error: 'fetch-error' };
  }
}

// Generate badge based on style
function generateBadge(hasKey, style, options) {
  const { label, theme, username } = options;
  
  switch (style) {
    case 'card':
      return generateCardBadge(hasKey, username, label, theme !== 'light');
    case 'flat':
      return generateFlatBadge(hasKey, label, false);
    case 'flat-square':
      return generateFlatBadge(hasKey, label, true);
    case 'split':
    default:
      return generateSplitBadge(hasKey, label);
  }
}

// Main request handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
    
    // Only handle GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    // Root path - show usage info
    if (path === '/' || path === '') {
      return new Response(JSON.stringify({
        name: 'GitHub GPG Key Badge Service',
        usage: '/{username}.svg',
        parameters: {
          style: 'split (default) | card | flat | flat-square',
          label: 'Custom label text (default: "GPG Key")',
          theme: 'dark (default) | light (card style only)',
        },
        examples: [
          '/torvalds.svg',
          '/octocat.svg?style=card',
          '/defunkt.svg?style=flat&label=PGP',
        ],
      }, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    // Parse username from path
    const match = path.match(/^\/([^\/]+)\.svg$/);
    if (!match) {
      return new Response('Not found. Usage: /{username}.svg', { status: 404 });
    }
    
    const username = match[1];
    
    // Validate username
    if (!isValidUsername(username)) {
      const svg = generateErrorBadge('GPG Key', 'invalid user');
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    // Parse query parameters
    const style = url.searchParams.get('style') || 'split';
    const label = url.searchParams.get('label') || 'GPG Key';
    const theme = url.searchParams.get('theme') || 'dark';
    
    // Validate style parameter
    const validStyles = ['split', 'card', 'flat', 'flat-square'];
    if (!validStyles.includes(style)) {
      const svg = generateErrorBadge(label, 'invalid style');
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    // Check cache first
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    let response = await cache.match(cacheKey);
    
    if (response) {
      // Return cached response with cache hit header
      response = new Response(response.body, response);
      response.headers.set('X-Cache', 'HIT');
      return response;
    }
    
    // Fetch GPG key status from GitHub
    const { hasKey, error } = await checkGpgKey(username);
    
    let svg;
    if (error) {
      svg = generateErrorBadge(label, error === 'github-error' ? 'github error' : 'error');
    } else {
      svg = generateBadge(hasKey, style, { label, theme, username });
    }
    
    // Create response
    response = new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
        'X-GPG-Status': hasKey ? 'available' : 'none',
      },
    });
    
    // Store in cache (don't await, let it happen in background)
    if (!error) {
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    }
    
    return response;
  },
};

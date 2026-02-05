import { isValidUsername, hasUserGpgKey } from './utils.js';
import { generateBadge, generateErrorBadge, VALID_STYLES } from './badges.js';

/**
 * GitHub GPG Key Badge - Cloudflare Worker
 *
 * Generates dynamic SVG badges showing whether a GitHub user
 * has a public GPG key available at github.com/{username}.gpg
 *
 * Usage:
 *   GET /{username}
 *   GET /{username}?style=split|card|flat|flat-square|for-the-badge
 *   GET /{username}?style=card&theme=light|dark
 */

// Check if GitHub user has GPG key
async function checkGpgKey(username) {
  try {
    const response = await fetch(`https://github.com/${username}.gpg`, {
      headers: {
        'User-Agent': 'GPG-Badge-Service/2.2',
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

// Main request handler
export default {
  async fetch(request) {
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
        usage: '/{username}',
        parameters: {
          style: VALID_STYLES.join(' | '),
          theme: 'dark (default) | light (card style only)',
        },
        examples: [
          '/torvalds',
          '/octocat?style=card',
          '/defunkt?style=flat',
          '/torvalds?style=for-the-badge',
        ],
      }, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Parse username from path (supports both /username and /username.svg)
    const match = path.match(/^\/([^\/]+?)(?:\.svg)?$/);
    if (!match) {
      return new Response('Not found. Usage: /{username}', { status: 404 });
    }

    const username = match[1];

    // Cache durations: 12h if key exists (stable), 5min if missing (user may be adding)
    const CACHE_HAS_KEY = 'public, max-age=43200';  // 12 hours
    const CACHE_NO_KEY = 'public, max-age=300';     // 5 minutes

    // Validate username
    if (!isValidUsername(username)) {
      const svg = generateErrorBadge('invalid user');
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': CACHE_NO_KEY,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Parse query parameters
    const style = url.searchParams.get('style') || 'split';
    const theme = url.searchParams.get('theme') || 'dark';

    // Validate style parameter
    if (!VALID_STYLES.includes(style)) {
      const svg = generateErrorBadge('invalid style');
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': CACHE_NO_KEY,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Fetch GPG key status from GitHub
    const { hasKey, error } = await checkGpgKey(username);

    if (error) {
      const svg = generateErrorBadge(error === 'github-error' ? 'github error' : 'error');
      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': CACHE_NO_KEY,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const svg = generateBadge(hasKey, style, { theme, username });
    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': hasKey ? CACHE_HAS_KEY : CACHE_NO_KEY,
        'Access-Control-Allow-Origin': '*',
        'X-GPG-Status': hasKey ? 'available' : 'none',
      },
    });
  },
};

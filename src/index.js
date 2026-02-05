import { isValidUsername, hasUserGpgKey } from './utils.js';
import { generateBadge, generateErrorBadge, VALID_STYLES } from './badges.js';

/**
 * GitHub GPG Key Badge - Cloudflare Worker
 *
 * Generates dynamic SVG badges showing whether a GitHub user
 * has a public GPG key available at github.com/{username}.gpg
 *
 * Usage:
 *   GET /{username}.svg
 *   GET /{username}.svg?style=split|card|flat|flat-square|for-the-badge
 *   GET /{username}.svg?style=card&theme=light|dark
 */

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
          style: VALID_STYLES.join(' | '),
          theme: 'dark (default) | light (card style only)',
        },
        examples: [
          '/torvalds.svg',
          '/octocat.svg?style=card',
          '/defunkt.svg?style=flat',
          '/torvalds.svg?style=for-the-badge',
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
      const svg = generateErrorBadge('invalid user');
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
    const theme = url.searchParams.get('theme') || 'dark';

    // Validate style parameter
    if (!VALID_STYLES.includes(style)) {
      const svg = generateErrorBadge('invalid style');
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
      svg = generateErrorBadge(error === 'github-error' ? 'github error' : 'error');
    } else {
      svg = generateBadge(hasKey, style, { theme, username });
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

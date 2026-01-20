/**
 * Utility functions for GPG badge generation
 */

/**
 * Escape XML special characters for safe SVG embedding
 * @param {string} str - Input string
 * @returns {string} Escaped string
 */
export function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Validate GitHub username format
 * GitHub usernames: alphanumeric, hyphens, max 39 chars, no consecutive hyphens, can't start/end with hyphen
 * @param {string} username - GitHub username to validate
 * @returns {boolean} True if valid
 */
export function isValidUsername(username) {
  // Must be 1-39 chars, alphanumeric or single hyphens, can't start/end with hyphen
  if (!username || username.length > 39) return false;
  if (username.startsWith('-') || username.endsWith('-')) return false;
  if (username.includes('--')) return false;
  return /^[a-zA-Z0-9-]+$/.test(username);
}

/**
 * Determine if GitHub response contains a real user-uploaded GPG key (not placeholder)
 * @param {string} text - Response text from GitHub /{username}.gpg endpoint
 * @returns {boolean} True if contains real GPG key
 */
export function hasUserGpgKey(text) {
  const trimmed = text.trim();
  if (!trimmed) return false;

  const hasArmoredBlock = trimmed.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----');
  if (!hasArmoredBlock) return false;

  const placeholder = /hasn't uploaded any gpg keys/i;
  if (placeholder.test(trimmed)) return false;

  return true;
}

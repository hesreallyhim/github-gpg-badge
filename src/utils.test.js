import { describe, it, expect } from 'vitest';
import { escapeXml, isValidUsername, hasUserGpgKey } from './utils.js';

describe('escapeXml', () => {
  it('escapes ampersand', () => {
    expect(escapeXml('foo & bar')).toBe('foo &amp; bar');
  });

  it('escapes less than', () => {
    expect(escapeXml('a < b')).toBe('a &lt; b');
  });

  it('escapes greater than', () => {
    expect(escapeXml('a > b')).toBe('a &gt; b');
  });

  it('escapes double quotes', () => {
    expect(escapeXml('say "hello"')).toBe('say &quot;hello&quot;');
  });

  it('escapes single quotes', () => {
    expect(escapeXml("it's")).toBe('it&apos;s');
  });

  it('escapes multiple special characters', () => {
    expect(escapeXml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('returns empty string unchanged', () => {
    expect(escapeXml('')).toBe('');
  });

  it('returns plain text unchanged', () => {
    expect(escapeXml('hello world')).toBe('hello world');
  });
});

describe('isValidUsername', () => {
  describe('valid usernames', () => {
    it('accepts typical username', () => {
      expect(isValidUsername('octocat')).toBe(true);
    });

    it('accepts single character', () => {
      expect(isValidUsername('a')).toBe(true);
    });

    it('accepts two characters', () => {
      expect(isValidUsername('ab')).toBe(true);
    });

    it('accepts username with hyphen', () => {
      expect(isValidUsername('foo-bar')).toBe(true);
    });

    it('accepts username with multiple hyphens', () => {
      expect(isValidUsername('foo-bar-baz')).toBe(true);
    });

    it('accepts all numbers', () => {
      expect(isValidUsername('12345')).toBe(true);
    });

    it('accepts mixed alphanumeric', () => {
      expect(isValidUsername('user123')).toBe(true);
    });

    it('accepts max length (39 chars)', () => {
      expect(isValidUsername('a'.repeat(39))).toBe(true);
    });
  });

  describe('invalid usernames', () => {
    it('rejects empty string', () => {
      expect(isValidUsername('')).toBe(false);
    });

    it('rejects null/undefined', () => {
      expect(isValidUsername(null)).toBe(false);
      expect(isValidUsername(undefined)).toBe(false);
    });

    it('rejects username starting with hyphen', () => {
      expect(isValidUsername('-foo')).toBe(false);
    });

    it('rejects username ending with hyphen', () => {
      expect(isValidUsername('foo-')).toBe(false);
    });

    it('rejects consecutive hyphens', () => {
      expect(isValidUsername('foo--bar')).toBe(false);
    });

    it('rejects username exceeding 39 chars', () => {
      expect(isValidUsername('a'.repeat(40))).toBe(false);
    });

    it('rejects underscore', () => {
      expect(isValidUsername('foo_bar')).toBe(false);
    });

    it('rejects dot', () => {
      expect(isValidUsername('foo.bar')).toBe(false);
    });

    it('rejects at sign', () => {
      expect(isValidUsername('foo@bar')).toBe(false);
    });

    it('rejects spaces', () => {
      expect(isValidUsername('foo bar')).toBe(false);
    });
  });
});

describe('hasUserGpgKey', () => {
  const validGpgKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQINBF...actual key data...
-----END PGP PUBLIC KEY BLOCK-----`;

  const placeholderResponse = `This user hasn't uploaded any GPG keys.

-----BEGIN PGP PUBLIC KEY BLOCK-----
(placeholder)
-----END PGP PUBLIC KEY BLOCK-----`;

  describe('valid GPG keys', () => {
    it('returns true for valid GPG key block', () => {
      expect(hasUserGpgKey(validGpgKey)).toBe(true);
    });

    it('returns true for key with surrounding whitespace', () => {
      expect(hasUserGpgKey(`  \n${validGpgKey}\n  `)).toBe(true);
    });
  });

  describe('invalid/missing GPG keys', () => {
    it('returns false for empty string', () => {
      expect(hasUserGpgKey('')).toBe(false);
    });

    it('returns false for whitespace only', () => {
      expect(hasUserGpgKey('   \n\t  ')).toBe(false);
    });

    it('returns false for placeholder response', () => {
      expect(hasUserGpgKey(placeholderResponse)).toBe(false);
    });

    it('returns false for text without PGP block', () => {
      expect(hasUserGpgKey('no gpg key here')).toBe(false);
    });

    it('returns false for partial PGP header', () => {
      expect(hasUserGpgKey('-----BEGIN PGP')).toBe(false);
    });
  });
});

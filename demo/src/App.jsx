import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// Static badge assets (snapshotted from API via CI)
import splitAvailable from './assets/badges/split-available.svg';
import splitMissing from './assets/badges/split-missing.svg';
import cardDarkAvailable from './assets/badges/card-dark-available.svg?raw';
import cardDarkMissing from './assets/badges/card-dark-missing.svg?raw';
import cardLightAvailable from './assets/badges/card-light-available.svg?raw';
import cardLightMissing from './assets/badges/card-light-missing.svg?raw';
import flatAvailable from './assets/badges/flat-available.svg';
import flatMissing from './assets/badges/flat-missing.svg';
import flatSquareAvailable from './assets/badges/flat-square-available.svg';
import flatSquareMissing from './assets/badges/flat-square-missing.svg';
import forTheBadgeAvailable from './assets/badges/for-the-badge-available.svg';
import forTheBadgeMissing from './assets/badges/for-the-badge-missing.svg';

const API_BASE = 'https://gpg-badge.hesreallyhim.com';
const DEMO_USER_AVAILABLE = 'hesreallyhim';
const DEMO_USER_MISSING = 'octocat';

// GitHub username: 1-39 chars, alphanumeric + hyphens, no consecutive hyphens, can't start/end with hyphen
const sanitizeUsername = (value) => {
  return value.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 39);
};

const isValidUsername = (value) => {
  if (typeof value !== 'string') return false;
  if (value.length === 0 || value.length > 39) return false;
  if (/^-|-$|--/.test(value)) return false;
  return /^[a-zA-Z0-9-]+$/.test(value);
};

const getBadgeUrl = (username, style, theme) => {
  const params = new URLSearchParams();
  if (style !== 'split') params.set('style', style);
  if (style === 'card') params.set('theme', theme);
  const query = params.toString();
  return `${API_BASE}/${username}${query ? `?${query}` : ''}`;
};

const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const BADGE_ASSETS = {
  split: { available: splitAvailable, missing: splitMissing },
  flat: { available: flatAvailable, missing: flatMissing },
  'flat-square': { available: flatSquareAvailable, missing: flatSquareMissing },
  'for-the-badge': { available: forTheBadgeAvailable, missing: forTheBadgeMissing },
};

const CARD_TEMPLATES = {
  dark: { available: cardDarkAvailable, missing: cardDarkMissing },
  light: { available: cardLightAvailable, missing: cardLightMissing },
};

export default function GPGBadgeFinal() {
  const [username, setUsername] = useState('torvalds');
  const [hasKey, setHasKey] = useState(true);
  const [style, setStyle] = useState('split');
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);

  const demoUsername = hasKey ? DEMO_USER_AVAILABLE : DEMO_USER_MISSING;
  const safeUsername = isValidUsername(username) ? username : '';

  const handleUsernameChange = (e) => {
    setUsername(sanitizeUsername(e.target.value));
  };

  const displayUsername = safeUsername || '<username>';

  const generateUrl = () => {
    return getBadgeUrl(displayUsername, style, theme);
  };

  const generateMarkdown = () => {
    const url = getBadgeUrl(displayUsername, style, theme);
    return `[![GPG Key](${url})](https://github.com/${displayUsername}.gpg)`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get preview src - Card does username replacement, others use static assets
  const getPreviewSrc = (badgeStyle, badgeTheme = 'dark') => {
    if (badgeStyle === 'card') {
      const templates = CARD_TEMPLATES[badgeTheme] || CARD_TEMPLATES.dark;
      const svg = templates[hasKey ? 'available' : 'missing'];
      if (safeUsername) {
        const replaced = svg.replace(`@${demoUsername}`, `@${safeUsername}`);
        return toDataUri(replaced);
      }
      return toDataUri(svg);
    }
    const assets = BADGE_ASSETS[badgeStyle] || BADGE_ASSETS.split;
    return assets[hasKey ? 'available' : 'missing'];
  };

  const previewSrc = getPreviewSrc(style, theme);
  const previewAlt = `GPG Key ${hasKey ? 'available' : 'missing'} badge`;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          GitHub GPG Key Badge
        </h1>
        <p className="text-gray-400 mb-8">Dynamic badge showing GPG key availability for any GitHub user</p>
        
        {/* Live Preview */}
        <section className="p-8 bg-gray-900 rounded-2xl border border-gray-800 mb-8">
          <div className="flex justify-center items-center min-h-20 mb-6">
            <img src={previewSrc} alt={previewAlt} className="block" />
          </div>
          
          {/* Toggle state */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setHasKey(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                hasKey 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Key Available
            </button>
            <button 
              onClick={() => setHasKey(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !hasKey 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              No Key
            </button>
          </div>
        </section>

        {/* Configuration */}
        <section className="p-6 bg-gray-900 rounded-2xl border border-gray-800 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Configuration</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">GitHub Username</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                placeholder="username"
                pattern="[a-zA-Z0-9-]+"
                maxLength={39}
              />
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Style</label>
              <div className="flex flex-wrap gap-2">
                {['split', 'card', 'flat', 'flat-square', 'for-the-badge'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      style === s 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Theme (only for card style) */}
            {style === 'card' && (
              <div>
                <label className="block text-sm text-gray-400 mb-2">Theme</label>
                <div className="flex gap-2">
                  {['dark', 'light'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        theme === t 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {t === 'dark' ? 'dark (default)' : t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Generated URLs */}
        <section className="p-6 bg-gray-900 rounded-2xl border border-gray-800 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">Usage</h2>
          
          {/* Badge URL */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Badge URL</label>
            <div className="flex gap-2">
              <code className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-green-400 text-sm font-mono overflow-x-auto">
                {generateUrl()}
              </code>
              <button
                onClick={() => copyToClipboard(generateUrl())}
                className="px-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
          
          {/* Markdown */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Markdown</label>
            <div className="flex gap-2">
              <code className="flex-1 bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-green-400 text-sm font-mono overflow-x-auto">
                {generateMarkdown()}
              </code>
              <button
                onClick={() => copyToClipboard(generateMarkdown())}
                className="px-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Custom height tip */}
          <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400">
              <span className="text-gray-300 font-medium">Custom height:</span> Use HTML to resize the badge.
            </p>
            <code className="block mt-2 text-xs text-green-400 font-mono">
              {`<img src="${generateUrl()}" height="28">`}
            </code>
          </div>
        </section>

        {/* All Styles Preview */}
        <section className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">All Styles</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div className="shrink-0 mr-4">
                <span className="text-sm font-medium text-white">split</span>
                <span className="text-xs text-gray-500 ml-2">(default)</span>
                <p className="text-xs text-gray-400 mt-1">Modern bi-colored badge with icons</p>
              </div>
              <div className="shrink-0">
                <img
                  src={getPreviewSrc('split')}
                  alt="GPG Key split badge"
                  className="block"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">card</span>
                <p className="text-xs text-gray-400 mt-1">Rich card with username display</p>
              </div>
              <img
                src={getPreviewSrc('card', 'dark')}
                alt="GPG Key card badge"
                className="block"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">flat</span>
                <p className="text-xs text-gray-400 mt-1">Classic shields.io compatible</p>
              </div>
              <img
                src={getPreviewSrc('flat')}
                alt="GPG Key flat badge"
                className="block"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">flat-square</span>
                <p className="text-xs text-gray-400 mt-1">Square corners variant</p>
              </div>
              <img
                src={getPreviewSrc('flat-square')}
                alt="GPG Key flat-square badge"
                className="block"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">for-the-badge</span>
                <p className="text-xs text-gray-400 mt-1">Large uppercase shields.io style</p>
              </div>
              <img
                src={getPreviewSrc('for-the-badge')}
                alt="GPG Key for-the-badge badge"
                className="block"
              />
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="mt-8 p-6 bg-gray-900 rounded-2xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">API Reference</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="pb-3 font-medium">Parameter</th>
                  <th className="pb-3 font-medium">Values</th>
                  <th className="pb-3 font-medium">Default</th>
                  <th className="pb-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 font-mono text-green-400">style</td>
                  <td className="py-3"><code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">split</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">card</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">flat</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">flat-square</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">for-the-badge</code></td>
                  <td className="py-3 text-gray-500">split</td>
                  <td className="py-3">Badge visual style</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 font-mono text-green-400">theme</td>
                  <td className="py-3"><code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">dark</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">light</code></td>
                  <td className="py-3 text-gray-500">dark</td>
                  <td className="py-3">Card style only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

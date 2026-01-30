import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import splitVerified from './assets/badges/split-verified.svg';
import splitMissing from './assets/badges/split-missing.svg';
import cardDarkAvailableTemplate from './assets/badges/card-dark-available.svg?raw';
import cardDarkMissingTemplate from './assets/badges/card-dark-missing.svg?raw';
import cardLightAvailableTemplate from './assets/badges/card-light-available.svg?raw';
import cardLightMissingTemplate from './assets/badges/card-light-missing.svg?raw';
import flatAvailable from './assets/badges/flat-available.svg';
import flatMissing from './assets/badges/flat-missing.svg';
import flatSquareAvailable from './assets/badges/flat-square-available.svg';
import flatSquareMissing from './assets/badges/flat-square-missing.svg';

const LABEL = 'GPG Key';

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const toDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const CARD_TEMPLATES = {
  dark: {
    available: cardDarkAvailableTemplate,
    missing: cardDarkMissingTemplate,
  },
  light: {
    available: cardLightAvailableTemplate,
    missing: cardLightMissingTemplate,
  },
};

const BADGE_ASSETS = {
  split: {
    available: splitVerified,
    missing: splitMissing,
  },
  flat: {
    available: flatAvailable,
    missing: flatMissing,
  },
  'flat-square': {
    available: flatSquareAvailable,
    missing: flatSquareMissing,
  },
};

const getBadgeSrc = (style, available, theme, username) => {
  if (style === 'card') {
    const palette = CARD_TEMPLATES[theme] ?? CARD_TEMPLATES.dark;
    const template = palette[available ? 'available' : 'missing'];
    const safeUsername = escapeXml(username?.trim() || 'username');
    return toDataUri(template.replace(/username<!--__USERNAME__-->/g, safeUsername));
  }

  const palette = BADGE_ASSETS[style] ?? BADGE_ASSETS.split;
  return palette[available ? 'available' : 'missing'];
};
  
  export default function GPGBadgeFinal() {
    const [username, setUsername] = useState('torvalds');
    const [hasKey, setHasKey] = useState(true);
    const [style, setStyle] = useState('split');
    const [theme, setTheme] = useState('dark');
    const [copied, setCopied] = useState(false);

    const generateUrl = () => {
    const base = `https://gpg-badge.hesreallyhim.com/${username}.svg`;
    const params = new URLSearchParams();
    if (style !== 'split') params.set('style', style);
    if (style === 'card' && theme !== 'dark') params.set('theme', theme);
    const queryString = params.toString();
    return queryString ? `${base}?${queryString}` : base;
  };

  const generateMarkdown = () => {
    const url = generateUrl();
    return `[![GPG Key](${url})](https://github.com/${username}.gpg)`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderBadge = () => {
    const src = getBadgeSrc(style, hasKey, theme, username);
    const status = hasKey ? 'available' : 'missing';
    return <img src={src} alt={`${LABEL} ${status} badge`} className="block" />;
  };

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
            {renderBadge()}
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
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                placeholder="username"
              />
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Style</label>
              <div className="flex flex-wrap gap-2">
                {['split', 'card', 'flat', 'flat-square'].map((s) => (
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
                      {t}
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
          <div>
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
                  src={BADGE_ASSETS.split[hasKey ? 'available' : 'missing']}
                  alt={`${LABEL} split badge`}
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
                src={getBadgeSrc('card', hasKey, 'dark', username)}
                alt={`${LABEL} card badge`}
                className="block"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">flat</span>
                <p className="text-xs text-gray-400 mt-1">Classic shields.io compatible</p>
              </div>
              <img
                src={BADGE_ASSETS.flat[hasKey ? 'available' : 'missing']}
                alt={`${LABEL} flat badge`}
                className="block"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">flat-square</span>
                <p className="text-xs text-gray-400 mt-1">Square corners variant</p>
              </div>
              <img
                src={BADGE_ASSETS['flat-square'][hasKey ? 'available' : 'missing']}
                alt={`${LABEL} flat-square badge`}
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
                  <td className="py-3"><code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">split</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">card</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">flat</code> <code className="text-xs bg-gray-800 px-1.5 py-0.5 rounded">flat-square</code></td>
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

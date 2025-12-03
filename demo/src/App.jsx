import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function GPGBadgeFinal() {
  const [username, setUsername] = useState('torvalds');
  const [hasKey, setHasKey] = useState(true);
  const [style, setStyle] = useState('split');
  const [label, setLabel] = useState('GPG Key');
  const [theme, setTheme] = useState('dark');
  const [copied, setCopied] = useState(false);

  // Split Badge Style (Modern Bold bi-colored)
  const SplitBadge = ({ available, label, scale = 1 }) => {
    // Calculate left width based on label length (approximate)
    const labelWidth = label.length * 7.5 + 40; // icon space + padding
    const leftWidth = Math.max(90, labelWidth);
    const rightWidth = available ? 88 : 82;
    const totalWidth = leftWidth + rightWidth;
    
    return (
      <svg 
        width={scale * totalWidth} 
        height={scale * 28} 
        viewBox={`0 0 ${totalWidth} 28`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151"/>
            <stop offset="100%" stopColor="#1f2937"/>
          </linearGradient>
          <linearGradient id="rightGradGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e"/>
            <stop offset="100%" stopColor="#16a34a"/>
          </linearGradient>
          <linearGradient id="rightGradRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444"/>
            <stop offset="100%" stopColor="#dc2626"/>
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        <g filter="url(#shadow)">
          {/* Left section */}
          <rect x="0" y="0" width={leftWidth} height="28" rx="6" ry="6" fill="url(#leftGrad)"/>
          <rect x={leftWidth - 6} y="0" width="10" height="28" fill="url(#leftGrad)"/>
          
          {/* Right section */}
          <rect x={leftWidth} y="0" width={rightWidth} height="28" rx="6" ry="6" fill={available ? "url(#rightGradGreen)" : "url(#rightGradRed)"}/>
          <rect x={leftWidth} y="0" width="10" height="28" fill={available ? "url(#rightGradGreen)" : "url(#rightGradRed)"}/>
          
          {/* Lock icon */}
          <g transform="translate(12, 7)" fill="white">
            <rect x="2" y="5" width="10" height="8" rx="1" fillOpacity="0.9"/>
            <path d="M4 5V3.5C4 1.57 5.57 0 7.5 0S11 1.57 11 3.5V5" stroke="white" strokeWidth="1.5" fill="none" strokeOpacity="0.9"/>
          </g>
          
          {/* Left text */}
          <text x="32" y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="600" fill="white">{label}</text>
          
          {/* Check/X icon */}
          <g transform={`translate(${leftWidth + 10}, 7)`} fill="white">
            {available ? (
              <path d="M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm3.54 5.54l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 111.06-1.06L6 7.94l3.47-3.47a.75.75 0 111.06 1.06z" fillOpacity="0.95"/>
            ) : (
              <path d="M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zm2.78 8.72a.75.75 0 11-1.06 1.06L7 8.06l-1.72 1.72a.75.75 0 01-1.06-1.06L5.94 7 4.22 5.28a.75.75 0 011.06-1.06L7 5.94l1.72-1.72a.75.75 0 111.06 1.06L8.06 7l1.72 1.72z" fillOpacity="0.95"/>
            )}
          </g>
          
          {/* Right text */}
          <text x={leftWidth + 32} y="18" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="600" fill="white">
            {available ? 'Verified' : 'Missing'}
          </text>
        </g>
      </svg>
    );
  };

  // Card Style (Rich Information)
  const CardBadge = ({ available, username, label, isDark = true }) => {
    const bg = isDark ? '#111827' : '#ffffff';
    const border = isDark ? '#374151' : '#e5e7eb';
    const textPrimary = isDark ? (available ? '#4ade80' : '#9ca3af') : (available ? '#16a34a' : '#6b7280');
    const textSecondary = isDark ? '#9ca3af' : '#6b7280';
    const iconBg = available 
      ? (isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.1)')
      : (isDark ? '#374151' : '#f3f4f6');
    const iconColor = available ? (isDark ? '#4ade80' : '#16a34a') : '#9ca3af';
    
    return (
      <svg width="220" height="52" viewBox="0 0 220 52" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
          </filter>
        </defs>
        
        <g filter="url(#cardShadow)">
          {/* Card background */}
          <rect x="0" y="0" width="220" height="52" rx="12" fill={bg} stroke={border} strokeWidth="1"/>
          
          {/* Icon container */}
          <rect x="12" y="10" width="32" height="32" rx="8" fill={iconBg}/>
          
          {/* Shield icon */}
          <g transform="translate(18, 16)" fill={iconColor}>
            <path d="M10 0L0 4v6c0 5.55 4.16 10.74 10 12 5.84-1.26 10-6.45 10-12V4L10 0zm0 10.99h8c-.53 4.12-3.28 7.79-8 8.94V11H2V5.3l8-3.11v8.8z"/>
          </g>
          
          {/* Username */}
          <text x="54" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fill={textSecondary}>
            @{username}
          </text>
          
          {/* Status text */}
          <text x="54" y="38" fontFamily="system-ui, -apple-system, sans-serif" fontSize="13" fontWeight="600" fill={textPrimary}>
            {label} {available ? 'Available' : 'Not Found'}
          </text>
        </g>
      </svg>
    );
  };

  // Flat Shields.io style
  const FlatBadge = ({ available, label, square = false }) => {
    const rightWidth = available ? 62 : 42;
    const totalWidth = 70 + rightWidth;
    const radius = square ? 0 : 4;
    
    return (
      <svg width={totalWidth} height="20" viewBox={`0 0 ${totalWidth} 20`} xmlns="http://www.w3.org/2000/svg">
        {/* Left section */}
        <rect x="0" y="0" width="70" height="20" fill="#555" rx={radius} ry={radius}/>
        <rect x={70 - radius} y="0" width={radius} height="20" fill="#555"/>
        
        {/* Right section */}
        <rect x="70" y="0" width={rightWidth} height="20" fill={available ? '#22c55e' : '#6b7280'} rx={radius} ry={radius}/>
        <rect x="70" y="0" width={radius} height="20" fill={available ? '#22c55e' : '#6b7280'}/>
        
        {/* Text shadow layer */}
        <g fill="#010101" fillOpacity="0.3">
          <text x="35" y="15" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" fontSize="11">{label}</text>
          <text x={70 + rightWidth/2} y="15" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" fontSize="11">{available ? 'available' : 'none'}</text>
        </g>
        
        {/* Text */}
        <g fill="white">
          <text x="35" y="14" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" fontSize="11">{label}</text>
          <text x={70 + rightWidth/2} y="14" textAnchor="middle" fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif" fontSize="11">{available ? 'available' : 'none'}</text>
        </g>
      </svg>
    );
  };

  const generateUrl = () => {
    const base = `https://gpg-badge.hesreallyhim.workers.dev/${username}.svg`;
    const params = new URLSearchParams();
    if (style !== 'split') params.set('style', style);
    if (label !== 'GPG Key') params.set('label', label);
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
    switch (style) {
      case 'split':
        return <SplitBadge available={hasKey} label={label} />;
      case 'card':
        return <CardBadge available={hasKey} username={username} label={label} isDark={theme === 'dark'} />;
      case 'flat':
        return <FlatBadge available={hasKey} label={label} />;
      case 'flat-square':
        return <FlatBadge available={hasKey} label={label} square />;
      default:
        return <SplitBadge available={hasKey} label={label} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          GitHub GPG Key Badge
        </h1>
        <p className="text-gray-400 mb-8">Dynamic badge showing GPG key availability for any GitHub user</p>
        
        {/* Live Preview */}
        <section className="p-8 bg-gray-900 rounded-2xl border border-gray-800 mb-8">
          <div className="flex justify-center items-center min-h-[80px] mb-6">
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
            
            {/* Label */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Label Text</label>
              <input 
                type="text" 
                value={label} 
                onChange={(e) => setLabel(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-green-500 focus:outline-none"
                placeholder="GPG Key"
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
              <div className="flex-shrink-0 mr-4">
                <span className="text-sm font-medium text-white">split</span>
                <span className="text-xs text-gray-500 ml-2">(default)</span>
                <p className="text-xs text-gray-400 mt-1">Modern bi-colored badge with icons</p>
              </div>
              <div className="flex-shrink-0">
                <SplitBadge available={hasKey} label="GPG Key" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">card</span>
                <p className="text-xs text-gray-400 mt-1">Rich card with username display</p>
              </div>
              <CardBadge available={hasKey} username={username} label="GPG Key" isDark={true} />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">flat</span>
                <p className="text-xs text-gray-400 mt-1">Classic shields.io compatible</p>
              </div>
              <FlatBadge available={hasKey} label="GPG Key" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-white">flat-square</span>
                <p className="text-xs text-gray-400 mt-1">Square corners variant</p>
              </div>
              <FlatBadge available={hasKey} label="GPG Key" square />
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
                  <td className="py-3 font-mono text-green-400">label</td>
                  <td className="py-3">any string</td>
                  <td className="py-3 text-gray-500">GPG Key</td>
                  <td className="py-3">Left-side label text</td>
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

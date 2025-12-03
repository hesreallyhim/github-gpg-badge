import React, { useState } from 'react';
import { Key, Shield, Lock, CheckCircle, XCircle, ShieldCheck, KeyRound, Fingerprint } from 'lucide-react';

export default function GPGBadgeDesigns() {
  const [username, setUsername] = useState('torvalds');
  const [hasKey, setHasKey] = useState(true);

  // Classic Shields.io style
  const ShieldsStyle = ({ available, style = 'flat' }) => {
    const styles = {
      flat: { borderRadius: '4px' },
      'flat-square': { borderRadius: '0px' },
      plastic: { borderRadius: '4px', background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)' },
      'for-the-badge': { borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }
    };
    
    return (
      <div className="flex items-center h-5 text-xs font-medium" style={styles[style]}>
        <span className="bg-gray-600 text-white px-2 h-full flex items-center" style={{ borderRadius: style === 'flat-square' ? '0' : '4px 0 0 4px' }}>
          GPG Key
        </span>
        <span 
          className={`px-2 h-full flex items-center text-white ${available ? 'bg-green-500' : 'bg-gray-400'}`}
          style={{ borderRadius: style === 'flat-square' ? '0' : '0 4px 4px 0' }}
        >
          {available ? 'available' : 'none'}
        </span>
      </div>
    );
  };

  // Bold modern style with icon
  const ModernBold = ({ available }) => (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-white shadow-lg ${
      available 
        ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
        : 'bg-gradient-to-r from-gray-500 to-gray-600'
    }`}>
      <KeyRound size={18} />
      <span>GPG Key</span>
      <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
        {available ? '✓ Available' : '✗ None'}
      </span>
    </div>
  );

  // Pill style with glow
  const GlowPill = ({ available }) => (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white ${
      available 
        ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]' 
        : 'bg-gray-500 shadow-[0_0_20px_rgba(107,114,128,0.5)]'
    }`}>
      <Shield size={16} className={available ? 'fill-white/30' : ''} />
      <span>GPG</span>
      {available ? <CheckCircle size={16} /> : <XCircle size={16} />}
    </div>
  );

  // Cyberpunk / Hacker style
  const CyberpunkStyle = ({ available }) => (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 font-mono text-sm border-2 ${
      available 
        ? 'bg-black text-green-400 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5),inset_0_0_20px_rgba(74,222,128,0.1)]' 
        : 'bg-black text-gray-400 border-gray-500'
    }`}>
      <span className="text-green-300">[</span>
      <Key size={14} />
      <span>GPG</span>
      <span className={available ? 'text-green-300' : 'text-red-400'}>
        {available ? 'VERIFIED' : 'NULL'}
      </span>
      <span className="text-green-300">]</span>
    </div>
  );

  // Minimal elegant
  const MinimalElegant = ({ available }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-md text-sm">
      <Fingerprint size={16} className={available ? 'text-emerald-400' : 'text-gray-500'} />
      <span className="text-gray-300">GPG</span>
      <span className={`font-medium ${available ? 'text-emerald-400' : 'text-gray-500'}`}>
        {available ? 'Available' : 'None'}
      </span>
    </div>
  );

  // GitHub native style
  const GitHubNative = ({ available }) => (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
      available 
        ? 'bg-green-50 text-green-700 border-green-200' 
        : 'bg-gray-50 text-gray-600 border-gray-200'
    }`}>
      <ShieldCheck size={14} className={available ? 'text-green-600' : 'text-gray-400'} />
      <span>GPG Key {available ? 'Available' : 'Not Found'}</span>
    </div>
  );

  // Split badge with status indicator
  const SplitBadge = ({ available }) => (
    <div className="inline-flex items-center rounded-lg overflow-hidden shadow-md text-sm font-semibold">
      <div className="bg-gray-800 text-white px-3 py-1.5 flex items-center gap-2">
        <Lock size={14} />
        <span>GPG Key</span>
      </div>
      <div className={`px-3 py-1.5 flex items-center gap-1.5 ${
        available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {available ? <CheckCircle size={14} /> : <XCircle size={14} />}
        <span>{available ? 'Verified' : 'Missing'}</span>
      </div>
    </div>
  );

  // Neon outline
  const NeonOutline = ({ available }) => (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-gray-900 border-2 ${
      available 
        ? 'border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
        : 'border-gray-600 text-gray-400'
    }`}>
      <Key size={16} className={available ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''} />
      <span>GPG</span>
      <div className={`w-2 h-2 rounded-full ${available ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-gray-600'}`} />
    </div>
  );

  // Retro terminal
  const RetroTerminal = ({ available }) => (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black rounded font-mono text-sm border border-green-900">
      <span className="text-green-500">$</span>
      <span className="text-green-400">gpg --verify</span>
      <span className={available ? 'text-green-300 font-bold' : 'text-red-400'}>
        {available ? '[OK]' : '[FAIL]'}
      </span>
      <span className={`inline-block w-2 h-4 ${available ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
    </div>
  );

  // Compact icon-only
  const CompactIcon = ({ available }) => (
    <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${
      available 
        ? 'bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/30' 
        : 'bg-gradient-to-br from-gray-400 to-gray-600'
    }`}>
      <Key size={20} className="text-white" />
    </div>
  );

  // Status card style
  const StatusCard = ({ available, username }) => (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-900 rounded-xl border border-gray-700">
      <div className={`p-2 rounded-lg ${available ? 'bg-green-500/20' : 'bg-gray-700'}`}>
        <Shield size={20} className={available ? 'text-green-400' : 'text-gray-400'} />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">@{username}</span>
        <span className={`font-semibold text-sm ${available ? 'text-green-400' : 'text-gray-400'}`}>
          GPG Key {available ? 'Available' : 'Not Found'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          GitHub GPG Key Badge Designs
        </h1>
        <p className="text-gray-400 mb-6">Preview different badge styles for displaying GPG key availability</p>
        
        {/* Controls */}
        <div className="flex gap-4 mb-8 p-4 bg-gray-900 rounded-xl">
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm w-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-400 text-sm">Has Key:</label>
            <button 
              onClick={() => setHasKey(!hasKey)}
              className={`px-4 py-1 rounded text-sm font-medium transition-colors ${
                hasKey ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {hasKey ? 'Yes' : 'No'}
            </button>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid gap-6">
          {/* Classic Shields.io */}
          <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Classic Shields.io Style</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">flat</span>
                <ShieldsStyle available={hasKey} style="flat" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">flat-square</span>
                <ShieldsStyle available={hasKey} style="flat-square" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">for-the-badge</span>
                <ShieldsStyle available={hasKey} style="for-the-badge" />
              </div>
            </div>
          </section>

          {/* Modern Bold */}
          <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Modern Bold</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <ModernBold available={hasKey} />
              <SplitBadge available={hasKey} />
            </div>
          </section>

          {/* Glowing Effects */}
          <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Glow Effects</h2>
            <div className="flex flex-wrap gap-6 items-center">
              <GlowPill available={hasKey} />
              <NeonOutline available={hasKey} />
            </div>
          </section>

          {/* Hacker / Terminal */}
          <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Hacker / Terminal</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <CyberpunkStyle available={hasKey} />
              <RetroTerminal available={hasKey} />
            </div>
          </section>

          {/* Minimal & Elegant */}
          <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Minimal & Elegant</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <MinimalElegant available={hasKey} />
              <GitHubNative available={hasKey} />
              <CompactIcon available={hasKey} />
            </div>
          </section>

          {/* Rich Info */}
          <section className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Rich Information</h2>
            <StatusCard available={hasKey} username={username} />
          </section>
        </div>

        {/* Usage Preview */}
        <section className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">README Preview</h2>
          <div className="bg-white text-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">👋 Hi, I'm {username}</h3>
            <p className="text-gray-600 mb-4">Open source developer & security enthusiast</p>
            <div className="flex flex-wrap gap-3 items-center">
              <ShieldsStyle available={hasKey} />
              <div className="flex items-center h-5 text-xs font-medium">
                <span className="bg-gray-600 text-white px-2 h-full flex items-center rounded-l">License</span>
                <span className="bg-blue-500 text-white px-2 h-full flex items-center rounded-r">MIT</span>
              </div>
              <div className="flex items-center h-5 text-xs font-medium">
                <span className="bg-gray-600 text-white px-2 h-full flex items-center rounded-l">Stars</span>
                <span className="bg-yellow-500 text-white px-2 h-full flex items-center rounded-r">1.2k</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

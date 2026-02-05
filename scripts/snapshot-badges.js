#!/usr/bin/env node

/**
 * Generate badge SVGs for demo site from local badge generators.
 * Run via: npm run snapshot:badges
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateBadge } from '../src/badges.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BADGES_DIR = join(__dirname, '..', 'demo', 'src', 'assets', 'badges');

const DEMO_USER_AVAILABLE = 'hesreallyhim';
const DEMO_USER_MISSING = 'octocat';

const VARIANTS = [
  { style: 'split' },
  { style: 'card', theme: 'dark' },
  { style: 'card', theme: 'light' },
  { style: 'flat' },
  { style: 'flat-square' },
  { style: 'for-the-badge' },
];

function getFilename(style, theme, hasKey) {
  const status = hasKey ? 'available' : 'missing';
  if (style === 'card') {
    return `card-${theme}-${status}.svg`;
  }
  return `${style}-${status}.svg`;
}

function main() {
  if (!existsSync(BADGES_DIR)) {
    mkdirSync(BADGES_DIR, { recursive: true });
  }

  console.log('Generating badge SVGs...\n');

  for (const { style, theme = 'dark' } of VARIANTS) {
    const username = style === 'card' ? DEMO_USER_AVAILABLE : undefined;

    // Available
    const availableSvg = generateBadge(true, style, { theme, username });
    const availableFile = getFilename(style, theme, true);
    writeFileSync(join(BADGES_DIR, availableFile), availableSvg);
    console.log(`  ${availableFile}`);

    // Missing
    const missingSvg = generateBadge(false, style, {
      theme,
      username: style === 'card' ? DEMO_USER_MISSING : undefined
    });
    const missingFile = getFilename(style, theme, false);
    writeFileSync(join(BADGES_DIR, missingFile), missingSvg);
    console.log(`  ${missingFile}`);
  }

  console.log(`\nDone. ${VARIANTS.length * 2} badges saved to demo/src/assets/badges/`);
}

main();

#!/usr/bin/env node

/**
 * Generate static SVG badge examples from the badge generation functions.
 *
 * Usage:
 *   node scripts/generate-badges.js          # Generate badges to src/badges/
 *   node scripts/generate-badges.js --check  # Check if generated badges match existing files
 */

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BADGES_DIR = join(ROOT, 'src', 'badges');

// Import badge generators
const {
  generateSplitBadge,
  generateCardBadge,
  generateFlatBadge,
  generateForTheBadge,
  generateErrorBadge
} = await import(join(ROOT, 'src', 'badges.js'));

const EXAMPLE_USERNAME = 'username';

// Define all badge variants to generate
const badges = [
  // Split style
  { name: 'split-verified.svg', generate: () => generateSplitBadge(true) },
  { name: 'split-missing.svg', generate: () => generateSplitBadge(false) },

  // Card style - dark theme
  { name: 'card-dark-available.svg', generate: () => generateCardBadge(true, EXAMPLE_USERNAME, true) },
  { name: 'card-dark-none.svg', generate: () => generateCardBadge(false, EXAMPLE_USERNAME, true) },

  // Card style - light theme
  { name: 'card-light-available.svg', generate: () => generateCardBadge(true, EXAMPLE_USERNAME, false) },
  { name: 'card-light-none.svg', generate: () => generateCardBadge(false, EXAMPLE_USERNAME, false) },

  // Flat style
  { name: 'flat-available.svg', generate: () => generateFlatBadge(true, false) },
  { name: 'flat-none.svg', generate: () => generateFlatBadge(false, false) },

  // Flat-square style
  { name: 'flat-square-available.svg', generate: () => generateFlatBadge(true, true) },
  { name: 'flat-square-none.svg', generate: () => generateFlatBadge(false, true) },

  // For-the-badge style
  { name: 'for-the-badge-available.svg', generate: () => generateForTheBadge(true) },
  { name: 'for-the-badge-none.svg', generate: () => generateForTheBadge(false) },

  // Error badge
  { name: 'error.svg', generate: () => generateErrorBadge('error') },
];

const isCheckMode = process.argv.includes('--check');

// Ensure badges directory exists
if (!existsSync(BADGES_DIR)) {
  mkdirSync(BADGES_DIR, { recursive: true });
}

let hasChanges = false;

for (const { name, generate } of badges) {
  const filepath = join(BADGES_DIR, name);
  const content = generate();

  if (isCheckMode) {
    // Check mode: compare with existing file
    if (!existsSync(filepath)) {
      console.error(`Missing: ${name}`);
      hasChanges = true;
      continue;
    }

    const existing = readFileSync(filepath, 'utf-8');
    if (existing !== content) {
      console.error(`Changed: ${name}`);
      hasChanges = true;
    }
  } else {
    // Generate mode: write files
    writeFileSync(filepath, content);
    console.log(`Generated: ${name}`);
  }
}

if (isCheckMode) {
  if (hasChanges) {
    console.error('\nBadge files are out of sync. Run `npm run generate:badges` to update.');
    process.exit(1);
  } else {
    console.log('All badge files are up to date.');
  }
} else {
  console.log(`\nGenerated ${badges.length} badge files to src/badges/`);
}

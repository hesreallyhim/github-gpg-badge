# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-02-05

### Added
- New `for-the-badge` style - 28px tall, uppercase, bold text (matches shields.io style)
- Static SVG badge examples in `src/badges/` for editor preview
- `npm run generate:badges` script to regenerate static SVGs from badge code
- `npm run check:badges` script to verify static SVGs match generators (runs on test/deploy)

### Changed
- Extracted badge generators to `src/badges.js` module
- Demo now includes custom height documentation (use `<img height="X">`)

## [2.0.0] - 2026-01-20

### Removed
- **BREAKING:** Removed `label` query parameter - badge label is now fixed as "GPG Key"
  - The badge serves a single purpose; custom labels added unnecessary complexity
  - Simplifies API and reduces code surface

### Added
- Test suite using Vitest with 33 tests covering username validation, XML escaping, and GPG key detection
- GitHub Actions CI workflow running tests on PRs and pushes to main
- `.nvmrc` and `.node-version` files pinning Node 20 for development

### Changed
- Upgraded Tailwind CSS from v3 to v4 in demo app
- Upgraded demo to use `@tailwindcss/vite` plugin instead of PostCSS integration
- Bumped wrangler to latest version
- Bumped Workers `compatibility_date` to 2026-01-01
- Minimum Node.js version now 20 (Node 18 reached EOL April 2025)
- Extracted utility functions (`escapeXml`, `isValidUsername`, `hasUserGpgKey`) to `src/utils.js` for testability

### Fixed
- `isValidUsername` now correctly rejects consecutive hyphens (e.g., `foo--bar`)
- Demo Tailwind v4 configuration (removed conflicting PostCSS plugin and redundant CSS imports)

## [1.0.0] - 2024-12-02

### Added
- Initial release
- SVG badge generation for GitHub GPG key status
- Four badge styles: split (default), card, flat, flat-square
- Card style with light/dark theme support
- Custom label support
- Demo UI with live preview and URL/Markdown generation
- Cloudflare Workers deployment
- Edge caching with stale-while-revalidate

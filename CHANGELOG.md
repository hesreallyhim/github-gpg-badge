# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-20

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

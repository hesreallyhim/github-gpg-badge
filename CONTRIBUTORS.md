# Project structure and deployment

This repository has two parts:
- **Worker API** (`src/index.js`): Cloudflare Worker that returns SVG badges showing whether `github.com/<username>.gpg` contains a real armored key. Supports styles, labels, and card theme.
- **Demo UI** (`demo/`): Vite + React + Tailwind app that previews badges and generates embed URLs/Markdown. Deploy to Vercel (recommended) or GitHub Pages.

## Worker deployment (Cloudflare)
Prereqs: Node 18+, Cloudflare account, Wrangler.

1) Install deps (root): `npm install`
2) Auth: `npx wrangler login`
3) (Optional) Custom domain: add to `wrangler.toml`
   ```toml
   routes = [
     { pattern = "gpg.yourdomain.com/*", zone_name = "yourdomain.com" }
   ]
   ```
   Ensure the DNS record is proxied (orange cloud) in Cloudflare.
4) Deploy: `npm run deploy`
5) Badge host is `https://gpg-badge.<your-account>.workers.dev` or your custom domain.

Behavior: On cache miss, the Worker fetches `https://github.com/<username>.gpg`, detects a real armored key (ignores GitHub’s “no key uploaded” placeholder), and returns an SVG. Headers: `X-GPG-Status` (`available`/`none`), `X-Cache` (`HIT`/`MISS`). Cache: 1h edge/browser, stale-while-revalidate 24h.

## Demo deployment
The demo calls the Worker host set in `demo/src/App.jsx` (`generateUrl` base).

### Vercel (recommended)
1) In `demo/`: `npm run build` to verify.
2) Vercel import: Root Directory `demo`, Framework `Vite`, Build `npm run build`, Output `dist`.
3) CLI (optional, from `demo/`): `npm run deploy:preview` or `npm run deploy:prod` (requires `vercel` installed).
4) Assign custom domain in Vercel if desired.

### GitHub Pages (alternative)
- In `demo/vite.config.js` set `base` to `/<repo-name>/`.
- Workflow: `cd demo && npm ci && npm run build`, publish `demo/dist` to Pages.

## Development
- Worker: `npm run dev` (root, Cloudflare dev server at http://localhost:8787).
- Demo: `cd demo && npm run dev` (Vite dev server). Point `generateUrl` to your Worker host or a mock during local testing.

## Maintenance notes
- Keep `wrangler` current (`npm install -D wrangler@latest`).
- Demo uses Tailwind 3.x; Vite config uses base `/` for Vercel. Adjust base if targeting Pages.
- Encourage contributors to publish their GPG keys and adopt the badge in READMEs.

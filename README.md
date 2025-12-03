# GitHub GPG Key Badge

A Cloudflare Worker that generates dynamic SVG badges showing whether a GitHub user has a public GPG key available.

![GPG Key Available](https://gpg-badge.example.workers.dev/torvalds.svg)
![GPG Key Missing](https://gpg-badge.example.workers.dev/octocat.svg)

## Features

- 🔍 **Dynamic checking** - Fetches `github.com/{username}.gpg` in real-time
- 🎨 **Multiple styles** - Split, Card, Flat, and Flat-Square designs
- ⚡ **Edge-cached** - 1-hour cache with stale-while-revalidate for fast responses
- 🌐 **CORS enabled** - Works from any website or README
- 🛡️ **Input validation** - Sanitizes usernames and escapes XML

## Usage

### Basic

```markdown
![GPG Key](https://gpg-badge.YOUR-SUBDOMAIN.workers.dev/USERNAME.svg)
```

### With Link to Key

```markdown
[![GPG Key](https://gpg-badge.YOUR-SUBDOMAIN.workers.dev/USERNAME.svg)](https://github.com/USERNAME.gpg)
```

## Styles

### Split (default)
Modern bi-colored badge with icons.

```
/torvalds.svg
/torvalds.svg?style=split
```

### Card
Rich information card showing username.

```
/torvalds.svg?style=card
/torvalds.svg?style=card&theme=light
```

### Flat
Classic shields.io compatible style.

```
/torvalds.svg?style=flat
```

### Flat-Square
Square corners variant.

```
/torvalds.svg?style=flat-square
```

## Query Parameters

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `style` | `split`, `card`, `flat`, `flat-square` | `split` | Badge visual style |
| `label` | any string | `GPG Key` | Left-side label text |
| `theme` | `dark`, `light` | `dark` | Color scheme (card style only) |

## Examples

```markdown
<!-- Default split style -->
![GPG](https://gpg-badge.example.workers.dev/torvalds.svg)

<!-- Card style with dark theme -->
![GPG](https://gpg-badge.example.workers.dev/torvalds.svg?style=card)

<!-- Card style with light theme -->
![GPG](https://gpg-badge.example.workers.dev/torvalds.svg?style=card&theme=light)

<!-- Flat style with custom label -->
![GPG](https://gpg-badge.example.workers.dev/torvalds.svg?style=flat&label=PGP%20Key)

<!-- Clickable badge linking to the actual key -->
[![GPG Key](https://gpg-badge.example.workers.dev/torvalds.svg)](https://github.com/torvalds.gpg)
```

## Deployment

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Steps

1. **Clone and install**
   ```bash
   git clone https://github.com/YOUR-USERNAME/gpg-badge.git
   cd gpg-badge
   npm install
   ```

2. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Your badge is live!**
   ```
   https://gpg-badge.YOUR-SUBDOMAIN.workers.dev/USERNAME.svg
   ```

### Local Development

```bash
npm run dev
# Opens at http://localhost:8787
```

### Custom Domain (Optional)

Edit `wrangler.toml` to add your domain:

```toml
routes = [
  { pattern = "gpg-badge.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

## Caching

- **Edge cache**: 1 hour TTL
- **Stale-while-revalidate**: 24 hours (serves stale content while refreshing)
- **Browser cache**: 1 hour
- **Error responses**: 5 minutes (to allow retry)

## Response Headers

| Header | Description |
|--------|-------------|
| `X-Cache` | `HIT` or `MISS` - indicates cache status |
| `X-GPG-Status` | `available` or `none` - the detected key status |

## API

### `GET /`
Returns JSON with usage information.

### `GET /{username}.svg`
Returns SVG badge for the specified GitHub user.

## How It Works

1. Request comes in for `/{username}.svg`
2. Check Cloudflare edge cache
3. If cache miss, fetch `https://github.com/{username}.gpg`
4. Parse response to check for valid GPG key block
5. Generate appropriate SVG badge
6. Cache response at edge for 1 hour
7. Return SVG with appropriate headers

## License

MIT

# GitHub GPG Key Badge

Show that you publish and respect GPG keys. Add this badge to signal that your GitHub account has a public key and encourage contributors to do the same.

## Add the badge
- Replace `<worker-host>` with your deployed Worker host (e.g., `gpg-badge.yourdomain.com` or `gpg-badge.<your-subdomain>.workers.dev`).
- Replace `<username>` with the GitHub username to check.

Markdown:
```markdown
[![GPG Key](https://<worker-host>/<username>.svg)](https://github.com/<username>.gpg)
```

HTML:
```html
<a href="https://github.com/<username>.gpg">
  <img src="https://<worker-host>/<username>.svg" alt="GPG Key badge" />
</a>
```

## Try it in the demo
Explore styles, toggle “available/missing,” and copy-ready URLs/Markdown: **https://<your-demo-domain>** (replace with your Vercel/Pages demo URL).

## Parameters
- `style`: `split` (default) | `card` | `flat` | `flat-square`
- `label`: custom text for the left side (default: `GPG Key`)
- `theme`: `dark` (default) | `light` (card style only)

Examples:
- `https://<worker-host>/torvalds.svg` (missing example)
- `https://<worker-host>/hesreallyhim.svg` (verified example)
- `https://<worker-host>/octocat.svg?style=card&theme=light`

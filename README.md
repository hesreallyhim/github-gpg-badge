# GitHub GPG Key Badge

Show that you publish and respect GPG keys. Add this badge to signal that your GitHub account has a public key and encourage contributors to do the same.

## Add the badge
- Use the hosted endpoint: `https://gpg-badge.hesreallyhim.com/<username>.svg`
- Replace `<username>` with the GitHub username to check.

Markdown:
```markdown
[![GPG Key](`https://gpg-badge.hesreallyhim.com/<username>.svg)](https://github.com/<username>.gpg)
```

HTML:
```html
<a href="https://github.com/<username>.gpg">
  <img src="`https://gpg-badge.hesreallyhim.com/<username>.svg" alt="GPG Key badge" />
</a>
```

## Try it in the demo
Explore styles, toggle “available/missing,” and copy-ready URLs/Markdown: **https://gpg-badge.hesreallyhim.workers.dev** (replace with your production demo URL if different).

## Parameters
- `style`: `split` (default) | `card` | `flat` | `flat-square`
- `label`: custom text for the left side (default: `GPG Key`)
- `theme`: `dark` (default) | `light` (card style only)

Examples:
- `https://gpg-badge.hesreallyhim.workers.dev/torvalds.svg` (missing example)
- `https://gpg-badge.hesreallyhim.workers.dev/hesreallyhim.svg` (verified example)
- `https://<worker-host>/octocat.svg?style=card&theme=light`

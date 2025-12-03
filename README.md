# GitHub GPG Key Badge &nbsp;&nbsp;&nbsp;&nbsp; ![hesreallyhim](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=card)

If you've uploaded a GPG key to GitHub - use this badge to show others, and encourage them to do the same. GPG keys are easy to make, easy to upload, and they make GitHub a safer place for all developers.

## The Badge
- If you have a GPG key on GitHub, anyone can view it by just visiting `https://github.com/USERNAME.gpg`.
- This badge just verifies that there is a GPG key there, and it's a nice way to promote key usage. 
- Use the hosted endpoint: `https://gpg-badge.hesreallyhim.com/<username>.svg`.
- Replace `<username>` with the GitHub username to check.

Markdown:
```markdown
[![GPG Key](`https://gpg-badge.hesreallyhim.com/<username>.svg)](https://github.com/<username>.gpg)
```

HTML:
```html
<a href="https://github.com/hesreallyhim.gpg">
  <img src="`https://gpg-badge.hesreallyhim.com/hesreallyhim.svg" alt="GPG Key badge" />
</a>
```


## Try it in the demo
Explore different styles, and get drop-in URLs/Markdown: **https://github-gpg-badge-demo.vercel.app/**


## Parameters
- `style`: `split` (default) | `card` | `flat` | `flat-square`
- `label`: custom text for the left side (default: `GPG Key`)
- `theme`: `dark` (default) | `light` (card style only)

Examples:
- `![torvalds](https://gpg-badge.hesreallyhim.com/torvalds.svg)` ![torvalds](https://gpg-badge.hesreallyhim.com/torvalds.svg)  
- `![hesreallyhim](https://gpg-badge.hesreallyhim.com/torvalds.svg)` ![hesreallyhim](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg)

## More Info:
- [GitHub's documentation about GPG keys](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
- [Here's a repo template](https://github.com/hesreallyhim/pgp-inbox-template) for creating your own private messenger right on GitHub using GPG for privacy.

---

Created with 🔐 by [hesreallyhim](https://github.com/hesreallyhim).

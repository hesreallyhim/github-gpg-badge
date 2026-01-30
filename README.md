# GitHub GPG Key Badge &nbsp;&nbsp;&nbsp;&nbsp; ![hesreallyhim](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=card)

If you've uploaded a GPG key to GitHub - use this badge to show others, and encourage them to do the same. GPG keys are easy to make, easy to upload, and they make GitHub a safer place for all developers.

## The Badge
- If you have a GPG key on GitHub, anyone can view it by just visiting `https://github.com/USERNAME.gpg`.
- This badge just verifies that there is a GPG key there, and it's a nice way to promote key usage. 
- Use the hosted endpoint: `https://gpg-badge.hesreallyhim.com/<username>.svg`.
- Replace `<username>` with the GitHub username to check.

Markdown:
```markdown
[![GPG Key](https://gpg-badge.hesreallyhim.com/<username>.svg)](https://github.com/<username>.gpg)
```

HTML:
```html
<a href="https://github.com/<username>.gpg">
  <img src="https://gpg-badge.hesreallyhim.com/<username>.svg" alt="GPG Key badge" />
</a>
```


## Try it in the demo
Explore different styles, and get drop-in URLs/Markdown: **https://demo.gpg-badge.hesreallyhim.com/**


## Parameters
- `style`: `split` (default) | `card` | `flat` | `flat-square`
- `theme`: `dark` (default) | `light` (card style only)

Examples:

| Style | Available | Missing |
| --- | --- | --- |
| split | ![split available](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=split) | ![split missing](https://gpg-badge.hesreallyhim.com/octocat.svg?style=split) |
| card (dark) | ![card dark available](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=card&theme=dark) | ![card dark missing](https://gpg-badge.hesreallyhim.com/octocat.svg?style=card&theme=dark) |
| card (light) | ![card light available](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=card&theme=light) | ![card light missing](https://gpg-badge.hesreallyhim.com/octocat.svg?style=card&theme=light) |
| flat | ![flat available](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=flat) | ![flat missing](https://gpg-badge.hesreallyhim.com/octocat.svg?style=flat) |
| flat-square | ![flat square available](https://gpg-badge.hesreallyhim.com/hesreallyhim.svg?style=flat-square) | ![flat square missing](https://gpg-badge.hesreallyhim.com/octocat.svg?style=flat-square) |

## More Info:
- [GitHub's documentation about GPG keys](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
- [Here's a repo template](https://github.com/hesreallyhim/pgp-inbox-template) for creating your own private messenger right on GitHub using GPG for privacy.

---

Created with 🔐 by [hesreallyhim](https://github.com/hesreallyhim).

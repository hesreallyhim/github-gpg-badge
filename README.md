# GitHub GPG Key Badge &nbsp;&nbsp;&nbsp;&nbsp; ![hesreallyhim](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=card)

If you've uploaded a GPG key to GitHub - use this badge to show others, and encourage them to do the same. GPG keys are easy to make, easy to upload, and they make GitHub a safer place for all developers.

## The Badge
- If you have a GPG key on GitHub, anyone can view it by just visiting `https://github.com/USERNAME.gpg`.
- This badge just verifies that there is a GPG key there, and it's a nice way to promote key usage. 
- Use the hosted endpoint: `https://gpg-badge.hesreallyhim.com/<username>`.
- Replace `<username>` with the GitHub username to check.

Markdown:
```markdown
[![GPG Key](https://gpg-badge.hesreallyhim.com/<username>)](https://github.com/<username>.gpg)
```

HTML:
```html
<a href="https://github.com/<username>.gpg">
  <img src="https://gpg-badge.hesreallyhim.com/<username>" alt="GPG Key badge" />
</a>
```


## Try it in the demo
Explore different styles, and get drop-in URLs/Markdown: **https://demo.gpg-badge.hesreallyhim.com/**


## Parameters
- `style`: `split` (default) | `card` | `flat` | `flat-square` | `for-the-badge`
- `theme`: `dark` (default) | `light` (card style only)

Examples:

| Style | Available | Missing |
| --- | --- | --- |
| split | ![split available](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=split) | ![split missing](https://gpg-badge.hesreallyhim.com/octocat?style=split) |
| card (dark) | ![card dark available](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=card&theme=dark) | ![card dark missing](https://gpg-badge.hesreallyhim.com/octocat?style=card&theme=dark) |
| card (light) | ![card light available](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=card&theme=light) | ![card light missing](https://gpg-badge.hesreallyhim.com/octocat?style=card&theme=light) |
| flat | ![flat available](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=flat) | ![flat missing](https://gpg-badge.hesreallyhim.com/octocat?style=flat) |
| flat-square | ![flat square available](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=flat-square) | ![flat square missing](https://gpg-badge.hesreallyhim.com/octocat?style=flat-square) |
| for-the-badge | ![for-the-badge available](https://gpg-badge.hesreallyhim.com/hesreallyhim?style=for-the-badge) | ![for-the-badge missing](https://gpg-badge.hesreallyhim.com/octocat?style=for-the-badge) |

## More Info:
- [GitHub's documentation about GPG keys](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
- [Here's a repo template](https://github.com/hesreallyhim/pgp-inbox-template) for creating your own private messenger right on GitHub using GPG for privacy.

---

Created with 🔐 by [hesreallyhim](https://github.com/hesreallyhim).

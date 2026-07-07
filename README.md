# Shan Kwan Cho — Portfolio

Modern dark-theme portfolio built with **HTML, CSS, JavaScript, and Bootstrap 5** (no build step required).

## Deploy to GitHub Pages

1. Go to your repo `ShanKwanCho/shankwancho.github.io` (or create it).
2. Delete the old files, then upload everything inside this folder (`index.html`, `css/`, `js/`, `images/`).
3. Commit — the site goes live at https://shankwancho.github.io/ within a minute or two.

Or via git:

```bash
git clone https://github.com/ShanKwanCho/shankwancho.github.io.git
# copy the contents of this folder into the repo (replacing old files)
git add -A && git commit -m "Rebrand portfolio" && git push
```

## Before going live — 2 small things

1. **Your photo**: copy `images/me.jpg` and the `images/portfolio/` thumbnails (1.jpg, 2.jpg, 3.jpg, 4.jpg, 6.jpg, docAI.jpg) from your old repo into `images/` here. If a photo is missing the site still works — the hero shows an "SC" avatar and project cards show gradient/emoji covers.
2. **Activate the contact form** (already wired to [FormSubmit.co](https://formsubmit.co), free, no account needed):
   - After the site is live, open it, fill in the contact form, and submit a test message.
   - FormSubmit sends a **one-time activation email to shankwancho@gmail.com** — open it and click **Activate**.
   - Done. Every submission now lands in your Gmail inbox (check spam for the activation email if it doesn't appear).
   - Optional, to hide your email from the page source: after activating, FormSubmit gives you a random alias string — replace `shankwancho@gmail.com` in the form `action` in `index.html` with that alias.
   - Note: activation must be done from the live site (https://shankwancho.github.io), not from a local file.

## How the contact form works

The form POSTs to `https://formsubmit.co/ajax/shankwancho@gmail.com` (no server needed on GitHub Pages).
It includes a hidden honeypot field (`_honey`) for spam protection, a fixed subject line (`_subject`),
and a table-style email layout (`_template`). Submissions arrive in your Gmail inbox from FormSubmit.

## Structure

```
shancho-portfolio/
├── index.html      # single-page site (hero, about, experience, skills, projects, contact)
├── css/style.css   # dark theme, gradients, animations
├── js/main.js      # typed text, scroll reveals, counters, filters, form submit
└── images/         # add me.jpg + portfolio/ thumbnails here
```

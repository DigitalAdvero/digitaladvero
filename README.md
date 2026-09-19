# DigitalAdvero — website

Static, dependency-free site (HTML + CSS + vanilla JS). Bosnian is the main language, with a BS/EN toggle. Dark theme is the brand default, with a full light theme.

## Deploy to GitHub Pages

1. Create a repository and upload the **contents of this folder** (so `index.html` is at the repo root).
2. Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Wait a minute; the site appears at `https://<user>.github.io/<repo>/`.

No build step or `.nojekyll` file is needed: the site has no `_`-prefixed folders, so GitHub serves every file as it is. All asset paths are relative, so it works both at the domain root and under `/<repo>/`.

## Before you go live — set the real URL

The SEO files currently point at `https://digitaladvero.ba/`. If the final address is different (for example the `github.io` URL), replace it in:

- `index.html` — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`, and the JSON-LD block (`url`, `logo`, `image`)
- `sitemap.xml` and `robots.txt`

Search for `digitaladvero.ba` to find every place.

## Structure

```
index.html            page markup (Bosnian text lives here)
css/base.css          design tokens (dark + light), reset, page background, buttons, reveal utilities
css/components.css    navigation, mobile menu, glass/spotlight surfaces, forms, FAQ, footer
css/sections.css      every page section
js/i18n-en.js         English translations (key = the data-i18n attribute in the HTML)
js/main.js            theme, language, navigation, effects, diagram, simulator, form
js/secret.js          the founder's hidden logo-click scene (click the logo 5 times quickly)
assets/               logos, favicon/app icons, og-image.png, founder photo, audio
```

## Editing

- **Text:** edit the Bosnian text in `index.html`; add/adjust the matching English string in `js/i18n-en.js`.
- **Colors / theme:** everything is a CSS variable at the top of `css/base.css`.
- **Default theme:** dark. The visitor's choice is remembered. To follow the visitor's system setting instead, change the fallback in the small script in the `<head>` of `index.html`.
- **Contact form:** GitHub Pages is static, so the form opens the visitor's email app with the inquiry filled in (`digitaladvero@gmail.com`). For real form submissions, point it at a form service such as Formspree or Web3Forms.
- **Local preview:** open `index.html` directly, or run any static server in this folder.
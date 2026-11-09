# DigitalAdvero — website

Static, dependency-free site (HTML + CSS + vanilla JS) for GitHub Pages. Bosnian only. Three colours: black, white and orange.

## Deploy to GitHub Pages

1. Upload the **contents of this folder** to the repository root (so `index.html` is at the top level).
2. Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Tick **Enforce HTTPS** on the same page.

No build step and no `.nojekyll` file are needed. All paths are relative, so the site works both at a custom domain and under `https://<user>.github.io/<repo>/`.

## Domain

The site runs at **https://digitaladvero.com/** — the `CNAME` file tells GitHub Pages to use that domain, so keep it in the repository. The same address is used in `index.html` (canonical, `og:url`, `og:image`, `twitter:image`, the JSON-LD block), `sitemap.xml` and `robots.txt`; if the domain ever changes, update those too.

## Structure

```
index.html        the page (all text lives here)
privatnost.html   privacy & cookie policy (linked from the cookie banner and the footer)
404.html          "page not found" (self-contained)
css/style.css     all styles; colours are the variables at the top
js/app.js         intro, line-by-line text reveals, smooth scrolling, marquee, cursor, menu, form, cookie banner
js/ring.js        the glossy 3D ring behind the hero and the contact section (WebGL)
js/secret.js      a hidden story (its text is stored encoded)
assets/           favicon + app icons, og-image.png (link preview), story-* files (song + images for the hidden story)
```

## Editing

- **Text:** edit `index.html`. Headings with `data-split` are split into lines automatically for the reveal animation.
- **Services:** the eight cards in the `#usluge` section. Prices are intentionally not on the site.
- **Colours:** `--black`, `--white`, `--orange` at the top of `css/style.css`.
- **Contact form:** GitHub Pages is static, so the form opens the visitor's email app with the message filled in (`digitaladvero@gmail.com`). For real submissions, point it at a form service such as Formspree or Web3Forms.

## Cookies

The banner offers **Prihvati sve** and **Samo neophodni**. The choice is stored in the browser (`localStorage`, key `da_consent`) and can be changed with **Postavke kolačića** in the footer or on the privacy page.

The site itself sets no tracking cookies. If you add analytics later (for example Google Analytics), paste its scripts with `type="text/plain" data-consent="analytics"` — there is a ready example in a comment in the `<head>` of `index.html`. Those scripts only run after a visitor clicks **Prihvati sve**; choosing **Samo neophodni** later removes the analytics cookies and reloads the page. Update `privatnost.html` if you add other services.

## Motion and performance

- The intro (logo, then the curtain lifts) runs on page load; it is skipped when a link points to a section (`#kontakt`) and for visitors with "reduce motion".
- The ring renders only while the hero or the contact section is on screen, lowers its resolution on slow devices and falls back to a CSS ring without WebGL.
- "Reduce motion" turns off the intro, smooth scrolling, the cursor and the moving parts; all content stays visible.

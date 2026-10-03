# Výdejní automaty – web (fáze 1)

Static website for a business that sells, rents and services vending
machines. Public content is in Czech. No runtime dependencies, no backend,
no analytics.

## Commands

Requires Node.js 20.10+ (ImageMagick only for `npm run images`).

| Command | What it does |
| --- | --- |
| `npm run build` | Renders all pages to `dist/` |
| `npm run check` | Build + verify links, anchors, `<h1>`, titles, descriptions, alt texts |
| `npm run dev` | Build + local server at http://localhost:8080 |
| `npm run images` | Optimizes photos from `media/originals/` to WebP |
| `npm run build:preview` | Build variant for the private claude.ai preview (`preview/`) |

`dist/` is plain HTML/CSS/JS and can be hosted on any static host.
The site is not deployed, and pages carry `noindex` until `indexable` is set to
`true` in `src/data/site.js`.

## Structure

```
src/data/site.js        company, contact details, navigation  ← edit contact here
src/data/products.js    products, specs, prices, optional equipment
src/data/services.js    services and the cooperation process
src/data/photos.js      photo registry (alt texts, category, product assignment)
src/lib/                layout, reusable components, icons
src/pages/              page templates (product.js = product detail template)
src/assets/             CSS, JS, fonts (IBM Plex, OFL), optimized images
media/originals/        original photos (source for npm run images)
scripts/                build, image optimization, link check, dev server
```

## Adding photos (e.g. the second batch)

1. Copy originals into `media/originals/` (use descriptive file names,
   e.g. `chlazeny-automat-predni-pohled.jpg`).
2. Run `npm run images`. WebP variants (480–1600 px, never upscaled) are
   created and `src/data/photo-manifest.json` is updated.
3. Add an entry to `src/data/photos.js` with a Czech `alt` text.
4. If the photo shows a confirmed model, add its id to that product's
   `photos` array in `src/data/products.js` (first = main photo). Otherwise
   set only `category` – it then appears under “Ukázky provedení”.
5. `npm run check`.

## Adding a product

Add an object to `src/data/products.js` with `status: 'published'`. The
detail page, catalogue card, footer link and inquiry-form option are
generated automatically. Use `optional: true` for optional specs and never
copy specs from another model.

## Inquiry form

There is no submission backend yet. The form validates input and opens the
visitor's e-mail client with a prepared message; the page states clearly
that the message has not been sent yet and offers copy text, phone and
e-mail alternatives. To add real delivery later (e.g. a form service or a
small serverless function), change the submit handler in
`src/assets/js/main.js` and only show a success message after a confirmed
server response.

See `CONTENT-TODO.md` for information still to be confirmed.

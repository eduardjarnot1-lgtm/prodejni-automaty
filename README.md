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
src/assets/             CSS, JS, optimized images (font: Georgia, serif – system font, no files)
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

## Motion

All timing comes from tokens in `src/assets/css/styles.css` (`--dur-fast` 180 ms
for control feedback, `--dur-base` 240 ms, `--dur-reveal` 600 ms for entrances,
`--dur-leave` 200 ms, `--stagger` 80 ms, decelerating easings `--ease-out` and
`--ease-emph`). Mobile uses shorter offsets and stagger.

- **Hero entrance:** CSS keyframes with `fill-mode: backwards`, under 1 s.
- **Machine showcase** (homepage hero): an accessible tab control (arrow keys,
  Home/End). Photo and description share one panel, so they always change together.
  It shows a confirmed product photo when one exists, otherwise a labelled
  category example ("Ukázka provedení").
- **Scroll reveals:** `IntersectionObserver` in `main.js`, played once. The
  selectors are in the `REVEAL` list.
- **Hover and focus feedback** on buttons, nav links, cards and form fields.
- **FAQ accordion:** native `<details>`, with smooth height animation added by JS.

Safety: animations run only when `<html>` has the `motion` class. That class is
set in `<head>` only if the visitor hasn't asked for reduced motion. Content
starts visible; reveals hide elements only after the script has initialised.
Without JavaScript, every showcase panel is shown.

## Layout

The page sits on a light frame and is split into rounded panels ("sheets").
Templates mark where a new panel starts with `<!--break-->`, and `layout.js`
wraps each part in `<div class="sheet">`. The header's logo sits in a notch at
the top of the first panel. After scrolling, the header becomes a floating pill.

## Page transition ("Zoom Through")

Links between the main pages (Úvod, Automaty, Služby, O nás, Kontakt) use a
zoom-through transition, implemented in `src/assets/js/zoom-through.js` with
the Web Animations API (no dependencies). The destination page is fetched and
its visible images are decoded first. Then the real outgoing `<main>` scales
1 → 3 while fading out, and the incoming `<main>` scales 3 → 1 while fading in,
both around the viewport centre. The header stays in place.

Settings are in `src/data/site.js` → `pageTransition`:

| Setting | Default | Meaning |
| --- | --- | --- |
| `enabled` | `true` | Turn the transition off entirely |
| `duration` | `2500` | Length in ms |
| `scaleOut` | `3` | Final scale of the outgoing page |
| `scaleIn` | `3` | Starting scale of the incoming page |
| `easing` | `cubic-bezier(0.65, 0, 0.35, 1)` | Any CSS easing |
| `reducedMotionDuration` | `180` | Fade length when reduced motion is preferred |
| `pages` | 5 main pages | Pages that take part |

Product detail pages, `tel:`/`mailto:` links, external links, downloads,
in-page anchors and modifier-clicks (new tab) use normal browser behaviour.
Back/Forward replays the transition and restores the scroll position. If
loading or animating fails, the browser does a normal page load.

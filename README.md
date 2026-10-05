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
src/assets/             CSS, JS, GSAP (vendor/), optimized images (font: Georgia, serif – system font, no files)
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

Optional per-product fields (used by HAHA VENDING Pro 542): `descriptor`
(lead under the title), `badge` (card label), `cta` (inquiry button text),
`contactHeading`, `useCasesNote`, `ai` (purchase steps + manufacturer
accuracy figure), `remote` (remote-management section), `price.type:
'inquiry'` (“Cena na poptávku”) and `noExamplePhotos: true` (never borrow
category example photos; neutral placeholders until own photos arrive).

### HAHA VENDING Pro 542 – images

Client uploads (unchanged) are kept in `media/source/haha-vending-pro-542/`;
the web versions are in `media/originals/` (`haha-pro-542-*`):

| Photo | Use |
| --- | --- |
| `haha-pro-542-celkovy-pohled` (three-quarter view) | catalogue card, first gallery image |
| `haha-pro-542-pohled-zepredu` (front view) | gallery |
| `haha-pro-542-detaily` (manufacturer detail image, headline cropped, English labels) | gallery |

The visual tour (“Pro 542 zblízka”) uses the edited video (see “Product
videos”); the photographs stay in the gallery as the factual source.

Not used: the English marketing image (`marketing-pro-542-en.png`), because
its figures contradict the brochure. Photos assigned to a product
(`product` in `photos.js`) are never used as category examples. To add or
replace photos: put the file into `media/originals/`, run `npm run images`,
add an entry with Czech `alt` to `photos.js` and reference the id. Captions
must not present photos as proof of the recognition accuracy.

The homepage section “Jak fungují automaty s AI” (`index.html#automaty-s-ai`,
`src/pages/home.js → aiSection`) is shown while a published product has
`ai` data and links to it.

## Inquiry form

There is no submission backend yet. The form validates input and opens the
visitor's e-mail client with a prepared message; the page states clearly
that the message has not been sent yet and offers copy text, phone and
e-mail alternatives. To add real delivery later (e.g. a form service or a
small serverless function), change the submit handler in
`src/assets/js/main.js` and only show a success message after a confirmed
server response.

See `CONTENT-TODO.md` for information still to be confirmed.

## Colours

All colours are tokens at the top of `src/assets/css/styles.css` (`:root`):
- `--accent` (near-black `#121417`) and `--accent-hover`: buttons, links, icons, focus ring
- `--ink` (anthracite): text, dark panels, card hover borders
- `--green` and `--green-bright`: restrained secondary accent (current-page marker, link hover, tags, step numbers)
- `--frame`, `--panel-gray`, `--surface`, `--hero-bg`: neutral greys for the frame, panels and backgrounds

The favicon colour is in `src/assets/favicon.svg`.

## Motion

GSAP 3.15 (self-hosted in `src/assets/vendor/gsap/`: core, ScrollTrigger, Flip)
drives all JavaScript animation through `src/assets/js/motion.js`.

- **Settings:** the `MOTION` object at the top of `motion.js` (eases, durations,
  stagger, distances, ScrollTrigger start). Hover/focus feedback is CSS; its
  timings are the `--dur-*` / `--ease-*` tokens in `styles.css`.
- **Hero entrance** (first load only): headline lines, intro, buttons, phone and
  video in one short timeline. The video only fades and rises, because the clip
  zooms by itself.
- **Scroll reveals** (ScrollTrigger, played once) with a different choreography per
  section type: headings, trust points, product cards (photo settles in its
  frame), service tiles (grid cascade), process steps (rule draws, then text),
  gallery, contact band. Desktop only: subtle scroll-linked drift of the gallery's
  side photos.
- **Interactions:** sliding nav indicator (green under the current page); animated
  mobile menu and FAQ; gallery panel swaps photos with Flip; product pages switch
  photos via thumbnails.
- **Lifecycle:** each page's animations live in a `gsap.matchMedia()` context
  (`Motion.initPage` / `Motion.destroyPage`). The page transition reverts the
  outgoing page before swapping, so no ScrollTrigger or timeline survives a
  route change. The zoom itself is a single GSAP timeline (`gsapEase` in
  `site.pageTransition`).
- **Safety:** entrances animate opacity only (content stays focusable). With
  reduced motion nothing is animated or hidden. If GSAP fails to load, the
  site works without motion.

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

## Product videos

AI-generated (PixVerse) clips, watermarks kept in this draft. All
settings (original filename, alias, product, posters, time ranges, playback
mode, reduced-motion fallback) are in `src/data/media.js`. Markup:
`src/lib/media-markup.js`. Behaviour: `src/assets/js/media.js`.

| Original (media/video/originals/) | Alias / derivative | Where | Used range (original time) | Interaction |
| --- | --- | --- | --- | --- |
| PixVerse_V6_Image_Text_540P_Create_a_premium_c.mp4 | hero-single-machine-orbit | Úvod, hero | 0.25–1.40 s | Desktop: scroll scrub on a held stage (~205svh); mobile: plays once, holds |
| PixVerse_V6_Image_Text_540P_Create_a_premium_p.mp4 | locker-cabinet-showcase | automaticky-boxovy-system.html#prohlidka; poster in automaty.html#boxove-systemy | 0.25–1.0 / 1.25–2.45 / 2.75–4.0 s | Chapter playback, each chapter once, holds last frame |
| PixVerse_V6_Image_Text_540P_create_me_a_vide_w.mp4 | chilled-machine-tour (complete, all-intra) | chlazeny-automat-na-potraviny.html#prohlidka | entire clip 0–7.04 s; 5 chapters follow the footage | Desktop: scroll mapped to the full duration; mobile: plays once in full, holds, replay |
| PixVerse_V6_Image_Text_540P_Create_an_8second_.mp4 | haha-pro-542-tour-web (1024², all-intra) / haha-pro-542-tour-mobile (720², keyframe every 6) + `.webm` fallbacks; poster = final frame | haha-vending-pro-542.html#prohlidka; static poster in index.html#automaty-s-ai | entire clip 0–8.04 s; chapters 0–1.0 / 1.0–3.85 / 3.85–6.5 / 6.5–end | Desktop: scroll mapped to the full duration (~3.7 viewport heights, sticky video and chapter text); mobile/reduced motion: final-frame poster, “Přehrát prohlídku”, plays once with chapters following, pause/resume, “Přehrát znovu” |

The Pro 542 clip is used complete. Its opening frames show an English
specification board whose figures differ from the brochure; the site never
uses them (chapter 01 says so). The English captions in the footage are
explained in Czech, not transcribed. The two sizes are the same clip;
`<source media>` plus the selection in `media.js` (`Clip.load`) download
only one. The real duration is read from `loadedmetadata`. Encoding:

```sh
ffmpeg -i <orig> -an -c:v libx264 -preset slow -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart haha-pro-542-tour-web.mp4
ffmpeg -i <orig> -an -vf scale=720:720:flags=lanczos -c:v libx264 -preset slow -crf 23 -g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart haha-pro-542-tour-mobile.mp4
```

Superseded and no longer used: `PixVerse_V6_Image_Text_540P_Create_a_6second_p.mp4`
(kept in media/video/originals for reference).
| PixVerse_V6_Image_Text_360P_Create_a_premium_p.mp4 | double-machine-details | automaty.html#ukazka-sestavy (in #chlazene-automaty); poster on chlazeny-automat-na-potraviny.html | 0–1.38 / 1.75–2.45 / 2.8–3.7 s + still photo | Chapter playback, then the original photo |

Derivatives in `src/assets/video/`: `<alias>.mp4` (H.264), `<alias>.webm`
(VP9 fallback), and `*-poster.webp`, `*-end.webp` or `*-ch1..3.webp` posters. The hero
derivative has a keyframe on every frame (scrubbing); the others every 6 frames.
Clips are fetched completely and played from memory, so seeking works even
where the server has no HTTP range support.

**Product page tours** ("Vizuální prohlídka", `#prohlidka`) are configured per
product in `src/data/tours.js` and rendered by `productTour()` in
`src/lib/media-markup.js`: same dark section and position (after the price and
inquiry, before benefits and specifications) on every product page. A product
without matching footage uses its photographs (`photos`) in the same layout.
Chapter titles are buttons, so chapters can also be chosen by keyboard.

Visitors can switch video motion off (button on each video; remembered in
the browser). Reduced motion: posters only, playback on request.

### Replacing a clip with a clean export

```sh
# Hero (all-intra for scrubbing); set -ss/-to to the chosen range
ffmpeg -ss 0.25 -to 1.40 -i NEW.mp4 -an -c:v libx264 -crf 20 -g 1 -bf 0 -pix_fmt yuv420p -movflags +faststart src/assets/video/hero-single-machine-orbit.mp4
ffmpeg -ss 0.25 -to 1.40 -i NEW.mp4 -an -c:v libvpx-vp9 -crf 28 -b:v 0 -g 1 src/assets/video/hero-single-machine-orbit.webm
# Chapter clips: same, with -g 6 -keyint_min 6 -sc_threshold 0
# Posters: ffmpeg -ss <t> -i <derivative> -frames:v 1 p.png && convert p.png -quality 86 <name>.webp
```

Then update the times in `src/data/media.js` (derivative time = original
time minus the trim start) and the `codec` string if the H.264 level changes.


// Markup for the product videos (behaviour: src/assets/js/media.js).
//
// No native player chrome, no frame: the video sits in the composition and
// a poster image covers it until the intended frame is ready. Without
// JavaScript the posters (and, in the hero, the start frame) remain as
// static images, and all text is regular content.

import { esc, join } from './html.js';
import { icons } from './icons.js';
import { media, mediaSources, MEDIA_NOTE } from '../data/media.js';
import { tours } from '../data/tours.js';
import { photo, photoPlaceholder } from './components.js';

const video = (r, m, cls) => `<video class="${cls}" muted playsinline preload="none" disablepictureinpicture aria-hidden="true" tabindex="-1" width="${m.width}" height="${m.height}">
      ${join(mediaSources(m), (s) => `<source src="${r(s.src)}" type='${s.type}'>`)}
    </video>`;

// One control for all video areas. Its label and icon are set by media.js
// (motion on/off, play/pause/replay). Hidden until the script is running.
const toggle = (cls = '') => `<button class="media-toggle ${cls}" type="button" hidden data-media-toggle>
      <span class="media-toggle__icon" data-icon="pause">${icons.pause(16)}</span>
      <span class="media-toggle__icon" data-icon="play">${icons.play(16)}</span>
      <span class="media-toggle__icon" data-icon="replay">${icons.replay(16)}</span>
      <span class="media-toggle__label"></span>
    </button>`;

// ---------------------------------------------------------------------------
// Homepage hero: dark stage, Video A scrubbed by scrolling (desktop).
// `text` is the hero copy (headline, lead, buttons, phone).
// ---------------------------------------------------------------------------
export function heroStage(r, text) {
  const m = media.heroOrbit;
  return `<section class="hero hero--stage" aria-labelledby="hero-h" data-stage
  data-range="${m.range.join(',')}">
  <div class="stage__sticky">
    <div class="stage__inner">
      <div class="stage__text">${text}</div>
      <figure class="stage__media" style="--ar: ${m.width} / ${m.height}">
        ${video(r, m, 'stage__video')}
        <img class="stage__poster" src="${r(m.poster)}" alt="${esc(m.alt)}" width="${m.width}" height="${m.height}" fetchpriority="high" decoding="async">
      </figure>
    </div>
    <div class="stage__meta">
      <p class="stage__note">${esc(MEDIA_NOTE)}</p>
      ${toggle('stage__toggle')}
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Chapter sequence: visual (sticky on desktop) beside numbered chapters.
// Either a video (`key` in media.js, posters per chapter) or, with no
// matching footage, `photos` (one photo per chapter, labelled as examples).
// Chapter titles are buttons, so chapters can be chosen by keyboard too.
// ---------------------------------------------------------------------------
// A `photos` entry may also be { slot: 'label' }: a neutral placeholder for
// a photo that has not been supplied yet.
const photoLayer = (r, item, i) => `<div class="seq__layer seq__layer--photo${i === 0 ? ' is-on' : ''}" data-layer="${i}">${typeof item === 'string'
  ? photo(r, item, { sizes: '(min-width: 1000px) 460px, 90vw' })
  : photoPlaceholder('machine', `Fotografie bude doplněna: ${item.slot}`)}</div>`;

export function chapterSequence(r, key, { id, eyebrow, title, intro, chapters, tone = 'light', after = '', photos = null, note = null, label = 'Ukázka provedení' }) {
  const m = key ? media[key] : null;
  const square = m && m.width === m.height;
  const data = m ? m.chapters.map((c) => (c.range ? c.range : null)) : chapters.map(() => null);
  const ar = m ? `${m.width} / ${m.height}` : '4 / 5';
  const layers = m
    ? join(m.chapters, (c, i) => c.photo
      ? `<div class="seq__layer seq__layer--photo${i === 0 ? ' is-on' : ''}" data-layer="${i}">${photo(r, c.photo, { sizes: '(min-width: 1000px) 460px, 90vw' })}</div>`
      : `<img class="seq__layer${i === 0 ? ' is-on' : ''}" data-layer="${i}" src="${r(c.poster)}" alt="" width="${m.width}" height="${m.height}" loading="lazy" decoding="async">`)
    : join(photos, (item, i) => photoLayer(r, item, i));
  return `<section class="seq seq--${tone}${square ? ' seq--square' : ''}${m ? '' : ' seq--photos'}" id="${id}" aria-labelledby="${id}-h"
  data-seq data-chapters='${JSON.stringify(data)}'${m && m.continuous ? ` data-continuous="${m.duration}"` : ''}>
  <div class="seq__head">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h2 id="${id}-h">${esc(title)}</h2>
    ${intro ? `<p>${esc(intro)}</p>` : ''}
  </div>
  <div class="seq__body">
    <div class="seq__visual">
      <figure class="seq__frame" style="--ar: ${ar}">
        ${m ? video(r, m, 'seq__video') : ''}
        ${layers}
        ${m || !label ? '' : `<span class="media-label">${esc(label)}</span>`}
      </figure>
      <p class="seq__note">${esc(note || (m ? MEDIA_NOTE : 'Ukázky provedení. Konkrétní sestavu navrhneme podle vašich požadavků.'))}</p>
      ${m ? toggle('seq__toggle') : ''}
    </div>
    <ol class="seq__chapters">
      ${join(chapters, (c, i) => `<li class="seq__chapter${i === 0 ? ' is-active' : ''}" data-ch="${i}"${m && m.continuous ? ` style="--dur: ${(m.chapters[i].range[1] - m.chapters[i].range[0]).toFixed(2)}"` : ''}>
        <span class="seq__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3><button class="seq__jump" type="button" data-jump="${i}">${esc(c.title)}</button></h3>
        <p>${c.html || esc(c.text)}</p>
      </li>`)}
    </ol>
  </div>
  ${after}
</section>`;
}

// "Vizuální prohlídka" on a product page (configuration: src/data/tours.js).
// Same dark section and position on every product page that has a tour.
export function productTour(r, p, inquiryHref) {
  const t = tours[p.slug];
  if (!t) return '';
  return `<div class="wrap">${chapterSequence(r, t.media || null, {
    id: 'prohlidka',
    tone: 'dark',
    eyebrow: 'Vizuální prohlídka',
    title: t.title,
    intro: t.intro,
    chapters: t.chapters,
    photos: t.photos || null,
    note: t.note || null,
    label: t.label === undefined ? 'Ukázka provedení' : t.label,
    after: `<p class="seq__cta"><a class="btn btn--primary" href="${inquiryHref(r, 'poptat-' + p.slug)}">${esc(p.cta || 'Nezávazně poptat tento automat')}</a></p>`,
  })}</div>`;
}

// Static poster that links to a full presentation elsewhere.
export function mediaTeaser(r, { poster, width, height, eyebrow, title, text, href, cta }) {
  return `<a class="teaser" href="${href}">
  <span class="teaser__media"><img src="${r(poster)}" alt="" width="${width}" height="${height}" loading="lazy" decoding="async"></span>
  <span class="teaser__body">
    <span class="eyebrow">${esc(eyebrow)}</span>
    <span class="teaser__title">${esc(title)}</span>
    <span class="teaser__text">${esc(text)}</span>
    <span class="teaser__cta">${esc(cta)} <span class="arrow-swap">${icons.arrow(16)}${icons.arrow(16)}</span></span>
  </span>
</a>`;
}

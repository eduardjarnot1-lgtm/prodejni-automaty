// Markup for the product videos (behaviour: src/assets/js/media.js).
//
// No native player chrome, no frame: the video sits in the composition and
// a poster image covers it until the intended frame is ready. Without
// JavaScript the posters (and, in the hero, the start frame) remain as
// static images, and all text is regular content.

import { esc, join } from './html.js';
import { icons } from './icons.js';
import { media, mediaSources, MEDIA_NOTE } from '../data/media.js';
import { photo } from './components.js';

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
// Chapter sequence: visual (sticky on desktop) beside short chapters.
// chapters: [{ title, text }] aligned with media[key].chapters.
// ---------------------------------------------------------------------------
export function chapterSequence(r, key, { id, eyebrow, title, intro, chapters, tone = 'light', after = '' }) {
  const m = media[key];
  const square = m.width === m.height;
  const data = m.chapters.map((c) => (c.range ? c.range : null));
  return `<section class="seq seq--${tone}${square ? ' seq--square' : ''}" id="${id}" aria-labelledby="${id}-h"
  data-seq data-chapters='${JSON.stringify(data)}'>
  <div class="seq__head">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h2 id="${id}-h">${esc(title)}</h2>
    ${intro ? `<p>${esc(intro)}</p>` : ''}
  </div>
  <div class="seq__body">
    <div class="seq__visual">
      <figure class="seq__frame" style="--ar: ${m.width} / ${m.height}">
        ${video(r, m, 'seq__video')}
        ${join(m.chapters, (c, i) => c.photo
          ? `<div class="seq__layer seq__layer--photo${i === 0 ? ' is-on' : ''}" data-layer="${i}">${photo(r, c.photo, { sizes: '(min-width: 1000px) 460px, 90vw' })}</div>`
          : `<img class="seq__layer${i === 0 ? ' is-on' : ''}" data-layer="${i}" src="${r(c.poster)}" alt="" width="${m.width}" height="${m.height}" loading="lazy" decoding="async">`)}
      </figure>
      <p class="seq__note">${esc(MEDIA_NOTE)}</p>
      ${toggle('seq__toggle')}
    </div>
    <ol class="seq__chapters">
      ${join(chapters, (c, i) => `<li class="seq__chapter${i === 0 ? ' is-active' : ''}" data-ch="${i}">
        <span class="seq__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(c.title)}</h3>
        <p>${c.html || esc(c.text)}</p>
      </li>`)}
    </ol>
  </div>
  ${after}
</section>`;
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

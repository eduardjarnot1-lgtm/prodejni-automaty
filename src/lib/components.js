// Reusable page components. Every component receives `r` (relative URL
// resolver for the current page depth) when it renders links or assets.

import { esc, join } from './html.js';
import { icons } from './icons.js';
import { site, addressOneLine } from '../data/site.js';
import { photoById, photosByCategory } from '../data/photos.js';
import { categories, priceText, productUrl, publishedProducts } from '../data/products.js';
import { services } from '../data/services.js';
import manifest from '../data/photo-manifest.json' with { type: 'json' };

const c = site.contact;

// Responsive <img> from the photo registry + manifest. Images keep their
// own aspect ratio (object-fit: contain) so machines are never cropped.
export function photo(r, id, { sizes = '100vw', eager = false, cls = '' } = {}) {
  const p = photoById(id);
  const m = manifest[id];
  if (!p || !m) throw new Error(`Photo "${id}" missing in photos.js or manifest (run npm run images)`);
  const largest = m.variants[m.variants.length - 1];
  const srcset = m.variants.map((v) => `${r('assets/img/' + v.file)} ${v.w}w`).join(', ');
  return `<img class="${esc(cls)}" src="${r('assets/img/' + largest.file)}" srcset="${srcset}" sizes="${esc(sizes)}" width="${m.width}" height="${m.height}" alt="${esc(p.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

// Understated placeholder used where no confirmed photo exists yet.
export function photoPlaceholder(kind = 'machine', label = 'Fotografie bude doplněna') {
  return `<div class="ph" role="img" aria-label="${esc(label)}">${icons[kind === 'box' ? 'box' : 'machine'](40)}<span>${esc(label)}</span></div>`;
}

// Photos shown for a product: its own confirmed photos; otherwise the
// examples of its category (labelled "Ukázka provedení" on the page).
export function productPhotos(p) {
  if (p.photos.length) return { ids: p.photos, example: false };
  return { ids: photosByCategory(p.category).map((x) => x.id), example: true };
}

// Product photo browser: one large photo with thumbnails (main.js switches
// them). Specifications stay in the text; photos only illustrate.
export function productGallery(r, p) {
  const { ids, example } = productPhotos(p);
  if (!ids.length) return `<div class="plinth plinth--lg">${photoPlaceholder(p.category === 'boxove-systemy' ? 'box' : 'machine')}</div>`;
  const first = photoById(ids[0]);
  return `<div class="pgallery" data-pgallery>
  <div class="plinth plinth--lg pgallery__stage">
    ${join(ids, (id, i) => photo(r, id, { eager: i === 0, sizes: '(min-width: 1000px) 560px, 92vw', cls: 'pgallery__img' }).replace('<img ', `<img data-i="${i}"${i ? ' hidden' : ''} `))}
    ${example ? '<span class="media-label">Ukázka provedení</span>' : ''}
  </div>
  <p class="pgallery__caption" aria-live="polite">${esc(first.title || first.alt)}</p>
  ${ids.length > 1 ? `<div class="pgallery__thumbs" role="group" aria-label="Fotografie (${ids.length})">
    ${join(ids, (id, i) => {
      const ph = photoById(id);
      return `<button class="pgallery__thumb" type="button" data-i="${i}" aria-pressed="${i === 0}" aria-label="Fotografie ${i + 1} z ${ids.length}: ${esc(ph.title || ph.alt)}">${photo(r, id, { sizes: '96px' })}</button>`;
    })}
  </div>` : ''}
</div>`;
}

// Main image of a product: its own confirmed photo; otherwise the first
// example photo of its category, clearly labelled as an example; otherwise
// a neutral placeholder.
export function productMedia(r, p, opts = {}) {
  if (p.photos.length) return photo(r, p.photos[0], opts);
  const example = photosByCategory(p.category)[0];
  if (example) return `${photo(r, example.id, opts)}<span class="media-label">Ukázka provedení</span>`;
  return photoPlaceholder(p.category === 'boxove-systemy' ? 'box' : 'machine');
}

export const phoneLink = (cls = '') =>
  `<a class="${cls}" href="${c.phoneHref}">${esc(c.phone)}</a>`;
export const emailLink = (email = c.email, cls = '') =>
  `<a class="${cls}" href="mailto:${esc(email)}">${esc(email)}</a>`;

export const inquiryHref = (r, anchor = 'poptavka') => r(`kontakt.html#${anchor}`);

export function button(href, label, variant = 'primary', extra = '') {
  return `<a class="btn btn--${variant}" href="${href}"${extra}>${esc(label)}</a>`;
}

export function pageHead({ eyebrow, title, lead, crumbs, r }) {
  return `<header class="page-head">
  <div class="wrap page-head__inner">
    ${crumbs ? breadcrumbs(r, crumbs) : ''}
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h1 class="display">${esc(title)}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</header>
<!--break-->`;
}

export function breadcrumbs(r, crumbs) {
  return `<nav class="crumbs" aria-label="Drobečková navigace"><ol>
    ${join(crumbs, (cr, i) =>
      i === crumbs.length - 1
        ? `<li><span aria-current="page">${esc(cr.label)}</span></li>`
        : `<li><a href="${r(cr.href)}">${esc(cr.label)}</a></li>`)}
  </ol></nav>`;
}

export function priceBlock(p) {
  const t = priceText(p.price);
  return `<p class="price"><span class="price__label">${esc(t.label)}</span> <span class="price__value">${esc(t.value)}</span></p>`;
}

export function productCard(r, p, { headingLevel = 3 } = {}) {
  const h = `h${headingLevel}`;
  const url = r(productUrl(p));
  return `<article class="pcard">
  <div class="pcard__media">${productMedia(r, p, { sizes: '(min-width: 1000px) 360px, (min-width: 640px) 45vw, 92vw' })}</div>
  <div class="pcard__body">
    <p class="tag">${esc(categories.find((k) => k.key === p.category)?.name)}</p>
    <${h} class="pcard__title"><a href="${url}">${esc(p.name)}</a></${h}>
    <p>${esc(p.summary)}</p>
    ${p.highlights.length ? `<ul class="chips" aria-label="Hlavní parametry">${join(p.highlights, (x) => `<li>${esc(x)}</li>`)}</ul>` : ''}
    <div class="pcard__foot">
      ${priceBlock(p)}
      <span class="pcard__cta" aria-hidden="true">Detail automatu <span class="arrow-swap">${icons.arrow(16)}${icons.arrow(16)}</span></span>
    </div>
  </div>
</article>`;
}

// "More models on request" card shown at the end of product lists.
export function moreCard(r) {
  return `<article class="pcard pcard--more">
  <div class="pcard__body">
    <p class="tag">Na dotaz</p>
    <h3 class="pcard__title">Hledáte jiný typ nebo sestavu?</h3>
    <p>Nabídka se neomezuje jen na uvedené automaty. Popište nám, co chcete prodávat nebo vydávat, a navrhneme vhodné řešení.</p>
    <div class="pcard__foot">${button(inquiryHref(r), 'Nezávazně poptat', 'secondary')}</div>
  </div>
</article>`;
}

export function specTable(p) {
  if (!p.specs.length) {
    return `<p class="note">${esc(p.specsNote || 'Technické parametry uvedeme v nabídce.')}</p>`;
  }
  const hasOptional = p.specs.some((s) => s.optional);
  return `<div class="table-scroll"><table class="specs">
  <caption class="visually-hidden">Technické parametry – ${esc(p.name)}</caption>
  <tbody>
    ${join(p.specs, (s) => `<tr><th scope="row">${esc(s.label)}</th><td>${esc(s.value)}${s.optional ? ' <span class="badge-opt">Volitelné</span>' : ''}</td></tr>`)}
  </tbody>
</table></div>
${hasOptional ? '<p class="note">Položky označené „Volitelné“ nejsou součástí základního provedení.</p>' : ''}`;
}

// Contact strip shown at the bottom of most pages.
export function contactBand(r, { heading = 'Poradíme vám s výběrem automatu' } = {}) {
  return `<!--break-->
<section class="band-dark" aria-labelledby="kontakt-band-h">
  <div class="wrap band-dark__grid">
    <div>
      <h2 id="kontakt-band-h">${esc(heading)}</h2>
      <p>Konzultace je zdarma a nezávazná. Zavolejte nebo napište, ozveme se vám zpět.</p>
      <div class="actions">${button(inquiryHref(r), 'Nezávazně poptat', 'primary')}</div>
    </div>
    ${contactList({ dark: true })}
  </div>
</section>`;
}

export function contactList({ dark = false } = {}) {
  return `<ul class="contact-list${dark ? ' contact-list--dark' : ''}">
  <li>${icons.phone()}<div><span class="contact-list__label">Telefon</span>${phoneLink('contact-list__value')}</div></li>
  <li>${icons.mail()}<div><span class="contact-list__label">E-mail</span>${emailLink(c.email, 'contact-list__value')}${c.emailAlt ? emailLink(c.emailAlt, 'contact-list__alt') : ''}</div></li>
  <li>${icons.pin()}<div><span class="contact-list__label">Adresa</span><span class="contact-list__value contact-list__value--plain">${esc(addressOneLine())}</span></div></li>
  <li>${icons.user()}<div><span class="contact-list__label">Kontaktní osoba</span><span class="contact-list__value contact-list__value--plain">${esc(c.person)}</span></div></li>
</ul>`;
}

// Options for the inquiry form: published products, then services.
export function inquiryOptions() {
  return [
    { group: 'Automaty', items: publishedProducts.map((p) => ({ id: p.slug, label: p.name })) },
    { group: 'Služby', items: services.map((s) => ({ id: s.id, label: s.title })) },
    { group: 'Ostatní', items: [{ id: 'jine', label: 'Jiný dotaz' }] },
  ];
}

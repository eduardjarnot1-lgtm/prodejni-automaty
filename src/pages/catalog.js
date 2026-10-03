import { esc, join } from '../lib/html.js';
import { categories, publishedProducts } from '../data/products.js';
import { photosByCategory } from '../data/photos.js';
import { pageHead, productCard, moreCard, contactBand, photo } from '../lib/components.js';

// Example photos of a category (not assigned to a specific model).
export function categoryGallery(r, key, headingLevel = 3) {
  const items = photosByCategory(key);
  if (!items.length) return '';
  const h = `h${headingLevel}`;
  return `<div class="examples">
  <${h} class="examples__h">Ukázky provedení</${h}>
  <ul class="examples__list">
    ${join(items, (p) => `<li><figure><div class="plinth plinth--sm">${photo(r, p.id, { sizes: '(min-width: 1000px) 320px, 45vw' })}</div><figcaption>${esc(p.alt)}</figcaption></figure></li>`)}
  </ul>
  <p class="note">Konkrétní provedení, počet a velikost schránek upřesníme podle vašich požadavků.</p>
</div>`;
}

export default {
  path: 'automaty.html',
  navKey: 'automaty',
  title: 'Automaty',
  description:
    'Chlazené automaty na potraviny a výdejní boxové systémy k prodeji i pronájmu. Přehled typů, technické parametry a orientační ceny.',
  render(r) {
    return `
${pageHead({
  r,
  title: 'Automaty',
  lead: 'Chlazené automaty na potraviny a výdejní boxové systémy k prodeji i pronájmu. Nevíte si rady s výběrem? Poradíme zdarma.',
  crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: 'Automaty' }],
})}

<nav class="wrap jump" aria-label="Typy automatů">
  <ul>${join(categories, (k) => `<li><a href="#${k.key}">${esc(k.name)}</a></li>`)}</ul>
</nav>

${join(categories, (k, i) => {
  const items = publishedProducts.filter((p) => p.category === k.key);
  const last = i === categories.length - 1;
  return `<section class="section cat-section" id="${k.key}" aria-labelledby="${k.key}-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="${k.key}-h">${esc(k.name)}</h2>
      <p>${esc(k.short)}</p>
    </div>
    <div class="pgrid">
      ${join(items, (p) => productCard(r, p))}
      ${last ? moreCard(r) : ''}
    </div>
    ${categoryGallery(r, k.key)}
  </div>
</section>`;
})}

<section class="section section--alt" aria-labelledby="ceny-h">
  <div class="wrap narrow">
    <h2 id="ceny-h">Ceny a nabídka</h2>
    <p>Uvedené ceny jsou orientační. Konečná cena závisí na konfiguraci, výbavě a rozsahu instalace. Přesnou cenu a podmínky uvedeme v nezávazné nabídce.</p>
  </div>
</section>

${contactBand(r)}
`;
  },
};

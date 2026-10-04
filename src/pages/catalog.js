import { esc, join } from '../lib/html.js';
import { categories, publishedProducts } from '../data/products.js';
import { photosByCategory } from '../data/photos.js';
import { pageHead, productCard, moreCard, contactBand, photo, inquiryHref } from '../lib/components.js';
import { chapterSequence, mediaTeaser } from '../lib/media-markup.js';
import { media } from '../data/media.js';

// Example photos of a category (not assigned to a specific model).
export function categoryGallery(r, key, headingLevel = 3) {
  // The two-cabinet assembly has its own 'Ukázka sestavy' block.
  const items = photosByCategory(key).filter((p) => !p.config);
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

// Video C: the two-cabinet assembly, as a separate example. Its price and
// parameters are not those of the single chilled machine above.
function doubleAssembly(r) {
  return chapterSequence(r, 'doubleDetails', {
    id: 'ukazka-sestavy',
    eyebrow: 'Ukázka sestavy',
    title: 'Sestava dvou prodejních automatů',
    intro: 'Automaty lze sestavit i do větších celků. Parametry a cenu sestavy připravíme individuálně; neplatí pro ni údaje uvedené u chlazeného automatu výše.',
    chapters: [
      { title: 'Sestava dvou skříní', text: 'Dvě prosklené prodejní skříně se společným ovládacím panelem uprostřed.' },
      { title: 'Police se zbožím', text: 'Detail polic se zbožím za prosklenými dveřmi.' },
      { title: 'Ovládací a platební panel', text: 'Detail panelu s platebním terminálem. Podporované způsoby platby upřesníme v nabídce.' },
      { title: 'Fotografie sestavy', html: `Fotografie sestavy dvou automatů. <a href="${inquiryHref(r)}">Poptat sestavu</a>` },
    ],
  });
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
    ${k.key === 'chlazene-automaty' ? doubleAssembly(r) : ''}
    ${k.key === 'boxove-systemy' ? mediaTeaser(r, {
      poster: media.lockerShowcase.chapters[1].poster, width: 704, height: 1024,
      eyebrow: 'Vizuální prohlídka',
      title: 'Automatický výdejní boxový systém',
      text: 'Celá skříň, detail schránek a ovládacího panelu a ilustrační umístění v interiéru.',
      href: r('automaty/automaticky-boxovy-system.html#prohlidka'),
      cta: 'Zobrazit prohlídku',
    }) : ''}
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

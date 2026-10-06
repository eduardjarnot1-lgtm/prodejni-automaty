// Product detail template. One page per published product (see products.js).

import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site } from '../data/site.js';
import { categories, publishedProducts, productUrl } from '../data/products.js';
import { productTour, mediaTeaser } from '../lib/media-markup.js';
import { AI_PAGE } from './ai.js';
import { media } from '../data/media.js';
import { pageHead, priceBlock, specTable, button, inquiryHref, phoneLink, contactBand, productCard, productGallery } from '../lib/components.js';

// Section order on every product page:
//   1 title + introduction, 2 photos/summary/price/inquiry, 3 dark visual
//   tour (src/data/tours.js), 4 overview (intro, key facts, main benefits,
//   where it suits, optional equipment, inquiry), 5 technical parameters,
//   6 related products + contact.
// AI machines (`ai: true`) link to ai-automaty.html instead of explaining
// AI shopping again; they have no optional-equipment block.

// Product overview: short intro, key facts, main benefits, suitable
// places and the inquiry. AI machines link to ai-automaty.html instead of
// repeating how AI shopping and the platform work.
function overview(r, p) {
  const has = p.intro || p.keyFacts?.length || p.benefits.length || p.useCases.length;
  if (!has) return '';
  return `<section class="section pov" aria-labelledby="prehled-h">
  <div class="wrap">
    <div class="pov__head">
      <h2 id="prehled-h">${esc(p.shortName || p.name)} pro váš provoz</h2>
      ${p.intro ? `<p>${esc(p.intro)}</p>` : ''}
    </div>
    ${p.keyFacts?.length ? `<dl class="pov__facts">
      ${join(p.keyFacts, (f) => `<div>${icons[f.icon](24)}<dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)}
    </dl>` : ''}
    <div class="pov__cols">
      ${p.benefits.length ? `<section aria-labelledby="prednosti-h">
        <h3 id="prednosti-h">Hlavní přednosti</h3>
        <ul class="pov__benefits">${join(p.benefits, (b) => `<li><span class="pov__ic">${icons[b.icon](20)}</span><div><strong>${esc(b.title)}</strong><span>${esc(b.text)}</span></div></li>`)}</ul>
      </section>` : ''}
      ${p.useCases.length ? `<section aria-labelledby="vyuziti-h">
        <h3 id="vyuziti-h">Kam se hodí</h3>
        <ul class="pov__uses">${join(p.useCases, (u) => `<li>${icons[u.icon](20)}<span>${esc(u.label)}</span></li>`)}</ul>
        ${p.useCasesNote ? `<p class="pov__note">${esc(p.useCasesNote)}</p>` : ''}
      </section>` : ''}
    </div>
    ${p.ai ? '' : `<div class="pov__options">
      <h3>Volitelná výbava a provedení</h3>
      ${p.options.length
        ? `<dl class="options">${join(p.options, (o) => `<div><dt>${esc(o.label)} <span class="badge-opt">Volitelné</span></dt><dd>${esc(o.value)}</dd></div>`)}</dl>`
        : '<p class="note">Výbavu sestavíme podle vašich požadavků a uvedeme ji v nabídce.</p>'}
    </div>`}
    <div class="pov__actions">
      ${button(inquiryHref(r, 'poptat-' + p.slug), p.cta || 'Nezávazně poptat tento automat', 'primary')}
      ${p.ai ? `<a class="link-arrow" href="${r(AI_PAGE + '#jak-probiha-nakup')}">Jak funguje nákup s AI <span class="arrow-swap">${icons.arrow(18)}${icons.arrow(18)}</span></a>` : ''}
    </div>
  </div>
</section>`;
}

function extraAfter(r, p) {
  if (p.slug !== 'chlazeny-automat-na-potraviny') return '';
  return `<section class="section section--tight" aria-labelledby="sestava-h">
  <div class="wrap">
    <h2 id="sestava-h" class="visually-hidden">Ukázka sestavy</h2>
    ${mediaTeaser(r, {
      poster: media.doubleDetails.chapters[0].poster, width: 640, height: 640,
      eyebrow: 'Ukázka sestavy',
      title: 'Sestava dvou prodejních automatů',
      text: 'Samostatná ukázka sestavy. Uvedená orientační cena a kapacita 54 pozic platí pro jeden automat, ne pro sestavu.',
      href: r('automaty.html#ukazka-sestavy'),
      cta: 'Zobrazit ukázku sestavy',
    })}
  </div>
</section>`;
}

export function productPage(p) {
  const cat = categories.find((k) => k.key === p.category);
  return {
    path: productUrl(p),
    navKey: 'automaty',
    // Every inquiry action on this page (incl. the mobile bar) preselects it.
    inquiryAnchor: 'poptat-' + p.slug,
    title: p.name,
    description: p.summary,
    render(r) {
      const related = publishedProducts.filter((x) => x.slug !== p.slug).slice(0, 2);


      return `
${pageHead({
  r,
  eyebrow: cat?.name,
  title: p.name,
  lead: p.descriptor ? esc(p.descriptor) : '',
  crumbs: [
    { label: 'Úvod', href: 'index.html' },
    { label: 'Naše nabídka', href: 'automaty.html' },
    { label: p.name },
  ],
})}

<div class="wrap product">
  <div class="product__media">
    ${productGallery(r, p)}
  </div>

  <aside class="product__summary" aria-label="Shrnutí a poptávka">
    <p class="product__lead">${esc(p.summary)}</p>
    ${priceBlock(p)}
    <p class="note">${p.price.type === 'from' || p.price.type === 'fixed'
      ? 'Cena je orientační.'
      : p.price.type === 'inquiry' ? '' : 'Cenu připravíme podle požadované konfigurace.'}
      Automaty nabízíme ke koupi i k pronájmu. ${p.price.type === 'from' || p.price.type === 'fixed' ? 'Konečnou cenu podle výbavy, podmínky' : 'Cenu, podmínky'} dodání i možnost pronájmu, instalace a servisu tohoto typu upřesníme v nezávazné nabídce.</p>
    <div class="actions actions--stack">
      ${button(inquiryHref(r, 'poptat-' + p.slug), p.cta || 'Nezávazně poptat tento automat', 'primary')}
      <p class="product__call">${icons.phone(18)} ${phoneLink()}</p>
    </div>
  </aside>
</div>

${productTour(r, p, inquiryHref)}
${overview(r, p)}
<div class="wrap product-info">
  <section class="product-info__wide" aria-labelledby="parametry-h">
    <h2 id="parametry-h">Technické parametry</h2>
    ${specTable(p)}
  </section>
</div>



${extraAfter(r, p)}
${related.length ? `<section class="section section--alt" aria-labelledby="dalsi-h">
  <div class="wrap">
    <h2 id="dalsi-h">Další automaty</h2>
    <div class="pgrid pgrid--2">${join(related, (x) => productCard(r, x))}</div>
  </div>
</section>` : ''}

${contactBand(r, { heading: p.contactHeading || `Zajímá vás ${p.name.toLowerCase()}?`, anchor: 'poptat-' + p.slug })}
`;
    },
  };
}

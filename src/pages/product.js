// Product detail template. One page per published product (see products.js).

import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site } from '../data/site.js';
import { categories, publishedProducts, productUrl } from '../data/products.js';
import { chapterSequence, mediaTeaser } from '../lib/media-markup.js';
import { media } from '../data/media.js';
import { pageHead, priceBlock, specTable, button, inquiryHref, phoneLink, contactBand, productCard, productGallery } from '../lib/components.js';

// Product-specific video presentations (see src/data/media.js). Video B is
// attached only to the automatic locker system: it shows one particular
// cabinet, not every modular arrangement.
function extraBefore(r, p) {
  if (p.slug !== 'automaticky-boxovy-system') return '';
  return `<div class="wrap">${chapterSequence(r, 'lockerShowcase', {
    id: 'prohlidka',
    tone: 'dark',
    eyebrow: 'Vizuální prohlídka',
    title: 'Boxový systém zblízka',
    intro: 'Ilustrační vizualizace jednoho provedení. Skutečné uspořádání schránek navrhneme podle vašich požadavků.',
    chapters: [
      { title: 'Celá skříň', text: 'Uzamykatelné schránky pro výdej připraveného zboží. Počet a uspořádání schránek odpovídá konfiguraci, kterou s vámi navrhneme.' },
      { title: 'Schránky a ovládací panel', text: 'Dveře schránek v ocelovém nebo průhledném provedení, chlazení v rozsahu 2–8 °C. Vybavení ovládacího panelu upřesníme v nabídce.' },
      { title: 'Ilustrační umístění v interiéru', text: 'Například pro výdej předem objednaných jídel a nákupů nebo pro firemní a areálové stravování. Požadavky na místo instalace projdeme předem.' },
    ],
    after: `<p class="seq__cta"><a class="btn btn--primary" href="${inquiryHref(r, 'poptat-' + p.slug)}">Nezávazně poptat tento automat</a></p>`,
  })}</div>`;
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
    title: p.name,
    description: p.summary,
    render(r) {
      const related = publishedProducts.filter((x) => x.slug !== p.slug).slice(0, 2);


      return `
${pageHead({
  r,
  eyebrow: cat?.name,
  title: p.name,
  crumbs: [
    { label: 'Úvod', href: 'index.html' },
    { label: 'Automaty', href: 'automaty.html' },
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
      ? 'Cena je orientační. Konečnou cenu podle výbavy a podmínky dodání uvedeme v nabídce.'
      : 'Cenu připravíme na míru podle požadované konfigurace.'}</p>
    <div class="actions actions--stack">
      ${button(inquiryHref(r, 'poptat-' + p.slug), 'Nezávazně poptat tento automat', 'primary')}
      <p class="product__call">${icons.phone(18)} ${phoneLink()}</p>
    </div>
    <p class="product__also">Automaty nabízíme ke koupi i k pronájmu. Možnost pronájmu, instalaci a servis tohoto typu upřesníme v nabídce.</p>
  </aside>
</div>

${extraBefore(r, p)}
<div class="wrap product-info">
  ${p.benefits.length ? `<section aria-labelledby="prednosti-h">
    <h2 id="prednosti-h">Přednosti</h2>
    <ul class="checks">${join(p.benefits, (b) => `<li>${icons.check(20)}<span>${esc(b)}</span></li>`)}</ul>
  </section>` : ''}

  ${p.useCases.length ? `<section aria-labelledby="vyuziti-h">
    <h2 id="vyuziti-h">Vhodné využití</h2>
    <ul class="dots">${join(p.useCases, (u) => `<li>${esc(u)}</li>`)}</ul>
  </section>` : ''}

  <section aria-labelledby="vybava-h">
    <h2 id="vybava-h">Volitelná výbava a provedení</h2>
    ${p.options.length
      ? `<dl class="options">${join(p.options, (o) => `<div><dt>${esc(o.label)} <span class="badge-opt">Volitelné</span></dt><dd>${esc(o.value)}</dd></div>`)}</dl>`
      : '<p class="note">Výbavu sestavíme podle vašich požadavků a uvedeme ji v nabídce.</p>'}
  </section>

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

${contactBand(r, { heading: `Zajímá vás ${p.name.toLowerCase()}?` })}
`;
    },
  };
}

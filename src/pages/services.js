import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { services, process } from '../data/services.js';
import { pageHead, contactBand, button, inquiryHref } from '../lib/components.js';

const checklist = [
  'Co chcete prodávat nebo vydávat (balená jídla, nápoje, objednávky…).',
  'Kde bude automat stát a kolik je tam místa.',
  'Zda máte zájem o koupi, nebo pronájem.',
  'Přibližný počet zákazníků nebo výdejů za den, pokud ho znáte.',
];

export default {
  path: 'sluzby.html',
  navKey: 'sluzby',
  title: 'Služby',
  description:
    'Prodej a pronájem výdejních automatů, instalace a uvedení do provozu, servis a údržba, bezplatné poradenství, výkup použitých automatů a náhradní díly.',
  render(r) {
    return `
${pageHead({
  r,
  title: 'Služby',
  lead: 'Pomůžeme s výběrem, dodáním i provozem automatu. Rozsah služeb a podmínky sjednáme v nabídce podle vašich potřeb.',
  crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: 'Služby' }],
})}

<div class="wrap svc-layout">
  <nav class="svc-toc" aria-label="Přehled služeb">
    <ul>${join(services, (s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`)}</ul>
  </nav>
  <div class="svc-list">
    ${join(services, (s) => `<section class="svc-item" id="${s.id}" aria-labelledby="${s.id}-h">
      <h2 id="${s.id}-h">${esc(s.title)}</h2>
      ${join(s.text, (t) => `<p>${esc(t)}</p>`)}
      <p><a class="link-arrow" href="${inquiryHref(r, 'poptat-' + s.id)}">Poptat službu ${icons.arrow(18)}</a></p>
    </section>`)}
  </div>
</div>

<section class="section section--alt" aria-labelledby="postup-h">
  <div class="wrap">
    <div class="section-head"><h2 id="postup-h">Jak spolupráce probíhá</h2></div>
    <ol class="steps">${join(process, (s) => `<li class="step"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)}</ol>
  </div>
</section>

<section class="section" aria-labelledby="priprava-h">
  <div class="wrap narrow">
    <h2 id="priprava-h">Co se vám vyplatí mít připravené</h2>
    <p>Nic z toho není podmínkou. Pomůže nám to ale rychleji doporučit vhodné zařízení.</p>
    <ul class="checks">${join(checklist, (x) => `<li>${icons.check(20)}<span>${esc(x)}</span></li>`)}</ul>
    <div class="actions">${button(inquiryHref(r), 'Nezávazně poptat', 'primary')}</div>
  </div>
</section>

${contactBand(r)}
`;
  },
};

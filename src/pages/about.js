import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site } from '../data/site.js';
import { pageHead, contactBand } from '../lib/components.js';

export default {
  path: 'o-nas.html',
  navKey: 'o-nas',
  title: 'O nás',
  description:
    'Prodejním a výdejním automatům se věnujeme od roku 1992. Nabízíme bezplatné poradenství, dodávku, instalaci a servis automatů po celé České republice.',
  render(r) {
    const facts = [
      { label: 'V oboru od roku', value: String(site.since) },
      { label: 'Působnost', value: site.coverage },
      { label: 'Sídlo', value: site.contact.address.city },
      { label: 'Poradenství', value: 'Zdarma' },
    ];
    const values = [
      'Servis nejen při dodávce automatu, ale i během jeho provozu.',
      'Bezplatné poradenství a konzultace k vašemu projektu.',
      'Výběr řešení s ohledem na efektivitu a ekonomiku provozu.',
    ];
    return `
${pageHead({
  r,
  title: 'O nás',
  lead: `Oboru prodejních a výdejních automatů se věnujeme od roku ${site.since}.`,
  crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: 'O nás' }],
})}

<section class="section section--first">
  <div class="wrap about">
    <div class="about__text">
      <p>Zabýváme se prodejem, pronájmem a servisem výdejních automatů. Zákazníkům dodáváme chlazené automaty na potraviny a výdejní boxové systémy a pomáháme jim s jejich provozem.</p>
      <p>Dlouholeté zkušenosti nám umožňují poskytovat servis nejen při dodávce automatu, ale i během jeho následného provozu. Ještě před nákupem nebo pronájmem s vámi zdarma probereme, jaké zařízení se pro váš provoz hodí.</p>
      <h2>Na čem si zakládáme</h2>
      <ul class="checks">${join(values, (v) => `<li>${icons.check(20)}<span>${esc(v)}</span></li>`)}</ul>
    </div>
    <dl class="facts">
      ${join(facts, (f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)}
    </dl>
  </div>
</section>

${contactBand(r)}
`;
  },
};

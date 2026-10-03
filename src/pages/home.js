import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site } from '../data/site.js';
import { categories, publishedProducts, productUrl } from '../data/products.js';
import { services, process } from '../data/services.js';
import { photo, photoPlaceholder, button, inquiryHref, contactBand, phoneLink } from '../lib/components.js';

export default {
  path: 'index.html',
  navKey: 'home',
  title: 'Prodej a pronájem výdejních automatů',
  description:
    'Prodej, pronájem, instalace a servis chlazených automatů na potraviny a výdejních boxových systémů. V oboru od roku 1992, bezplatné poradenství, celá Česká republika.',
  render(r) {
    const reasons = [
      { icon: 'calendar', title: `V oboru od roku ${site.since}`, text: 'Prodejním a výdejním automatům se věnujeme dlouhodobě.' },
      { icon: 'chat', title: 'Bezplatné poradenství', text: 'Pomůžeme vybrat zařízení s ohledem na efektivitu a ekonomiku provozu.' },
      { icon: 'plug', title: 'Instalace na místě', text: 'Automat nainstalujeme a uvedeme do provozu.' },
      { icon: 'tool', title: 'Servis během provozu', text: 'Zajišťujeme servis, údržbu a náhradní díly.' },
    ];

    const boxProducts = publishedProducts.filter((p) => p.category === 'boxove-systemy');
    const fridge = publishedProducts.find((p) => p.category === 'chlazene-automaty');

    return `
<section class="hero">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <p class="eyebrow">Výdejní automaty od roku ${site.since}</p>
      <h1>Prodej a pronájem výdejních automatů</h1>
      <p class="lead">Dodáváme chlazené automaty na potraviny a výdejní boxové systémy. Pomůžeme vybrat vhodné zařízení, nainstalujeme ho a postaráme se o servis.</p>
      <div class="actions">
        ${button(inquiryHref(r), 'Nezávazně poptat', 'primary')}
        ${button(r('automaty.html'), 'Prohlédnout automaty', 'secondary')}
      </div>
      <p class="hero__call">Raději telefonicky? ${phoneLink()} <span>(${esc(site.contact.person)})</span></p>
    </div>
    <figure class="hero__media">
      <div class="plinth">${photo(r, 'boxovy-system-bily', { eager: true, sizes: '(min-width: 1000px) 440px, 90vw' })}</div>
      <figcaption>Výdejní boxový systém s dotykovým terminálem</figcaption>
    </figure>
  </div>
</section>

<section class="reasons" aria-label="Proč se na nás obrátit">
  <ul class="wrap reasons__list">
    ${join(reasons, (x) => `<li>${icons[x.icon](24)}<div><h2 class="reasons__h">${esc(x.title)}</h2><p>${esc(x.text)}</p></div></li>`)}
  </ul>
</section>

<section class="section" aria-labelledby="typy-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="typy-h">Automaty v nabídce</h2>
      <p>Dva typy zařízení pro samoobslužný prodej a výdej zboží. Konkrétní model a výbavu doporučíme podle vašeho provozu.</p>
    </div>
    <div class="cats">
      <article class="cat">
        <div class="cat__media">${photoPlaceholder('machine')}</div>
        <div class="cat__body">
          <h3>${esc(categories[0].name)}</h3>
          <p>${esc(categories[0].short)}</p>
          <ul class="cat__links"><li><a href="${r(productUrl(fridge))}">${esc(fridge.name)} ${icons.arrow(16)}</a></li></ul>
        </div>
      </article>
      <article class="cat">
        <div class="cat__media cat__media--photo">${photo(r, 'boxovy-system-zeleny', { sizes: '(min-width: 1000px) 240px, 60vw' })}</div>
        <div class="cat__body">
          <h3>${esc(categories[1].name)}</h3>
          <p>${esc(categories[1].short)}</p>
          <ul class="cat__links">${join(boxProducts, (p) => `<li><a href="${r(productUrl(p))}">${esc(p.name)} ${icons.arrow(16)}</a></li>`)}</ul>
        </div>
      </article>
    </div>
    <p class="section-more"><a class="link-arrow" href="${r('automaty.html')}">Všechny automaty a parametry ${icons.arrow(18)}</a></p>
  </div>
</section>

<section class="section section--alt" aria-labelledby="sluzby-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="sluzby-h">Služby</h2>
      <p>Od výběru zařízení přes instalaci až po servis a náhradní díly.</p>
    </div>
    <ul class="svc-grid">
      ${join(services, (s) => `<li class="svc"><h3><a href="${r('sluzby.html#' + s.id)}">${esc(s.title)}</a></h3><p>${esc(s.short)}</p></li>`)}
      <li class="svc svc--cta"><p>Nevíte, kterou službu potřebujete?</p><p><a class="link-arrow" href="${inquiryHref(r)}">Napište nám ${icons.arrow(18)}</a></p></li>
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="postup-h">
  <div class="wrap">
    <div class="section-head">
      <h2 id="postup-h">Jak spolupráce probíhá</h2>
      <p>Termíny dodání a instalace upřesníme v nabídce podle zvoleného zařízení.</p>
    </div>
    <ol class="steps">
      ${join(process, (s) => `<li class="step"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)}
    </ol>
  </div>
</section>

<section class="section section--alt" aria-labelledby="onas-h">
  <div class="wrap about-short">
    <h2 id="onas-h">O nás</h2>
    <div>
      <p>Oboru prodejních a výdejních automatů se věnujeme <strong>od roku ${site.since}</strong>. Zkušenosti nám umožňují poskytovat servis nejen při dodávce automatu, ale i během jeho provozu.</p>
      <p>Poradenství a konzultace k vašemu projektu jsou <strong>zdarma</strong>. Doporučíme řešení s ohledem na efektivitu a ekonomiku provozu.</p>
      <p><a class="link-arrow" href="${r('o-nas.html')}">Více o nás ${icons.arrow(18)}</a></p>
    </div>
  </div>
</section>

${contactBand(r)}
`;
  },
};

import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site } from '../data/site.js';
import { categories, publishedProducts, productUrl, priceText } from '../data/products.js';
import { photosByCategory } from '../data/photos.js';
import { services, process } from '../data/services.js';
import { photo, photoPlaceholder, button, inquiryHref, contactBand, phoneLink } from '../lib/components.js';

// Featured machines in the hero, one tab per category. A category shows a
// photo confirmed for one of its products; otherwise the first category
// example photo, labelled "Ukázka provedení" so it is never presented as a
// specific model. Product specs appear only when the category has exactly
// one product, so photo and specs always belong together.
function featured() {
  return categories
    .map((k) => {
      const items = publishedProducts.filter((p) => p.category === k.key);
      const withPhoto = items.find((p) => p.photos.length);
      const example = photosByCategory(k.key)[0];
      return {
        key: k.key,
        tab: k.name.replace('Výdejní boxové systémy', 'Boxové systémy').replace('Chlazené automaty na potraviny', 'Chlazené automaty'),
        name: items.length === 1 ? items[0].name : k.name,
        text: items.length === 1 ? items[0].summary : k.short,
        single: items.length === 1 ? items[0] : null,
        items,
        photoId: withPhoto ? withPhoto.photos[0] : example?.id,
        isExample: !withPhoto && !!example,
        icon: k.key === 'boxove-systemy' ? 'box' : 'machine',
      };
    })
    .filter((f) => f.items.length)
    // Show a category with a photo first.
    .sort((a, b) => Number(!!b.photoId) - Number(!!a.photoId));
}

function showcase(r) {
  const list = featured();
  const lines = `<svg class="showcase__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    ${join([[0, 8], [0, 46], [0, 92], [100, 10], [100, 50], [100, 90], [30, 0], [70, 0]], ([x, y]) => `<line x1="${x}" y1="${y}" x2="50" y2="50"/>`)}
  </svg>`;
  return `<div class="showcase" data-showcase>
  <div class="showcase__tabs" role="tablist" aria-label="Vybrané automaty">
    ${join(list, (f, i) => `<button class="showcase__tab" type="button" role="tab" id="sc-tab-${f.key}" aria-controls="sc-panel-${f.key}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(f.tab)}</button>`)}
    <span class="showcase__indicator" aria-hidden="true"></span>
  </div>
  <div class="showcase__stage">
    ${join(list, (f, i) => `<div class="showcase__panel${i === 0 ? ' is-active' : ''}" role="tabpanel" id="sc-panel-${f.key}" aria-labelledby="sc-tab-${f.key}">
      <figure class="showcase__media">
        ${lines}
        ${f.photoId
          ? photo(r, f.photoId, { eager: i === 0, sizes: '(min-width: 1000px) 420px, 80vw', cls: 'showcase__img' })
          : photoPlaceholder(f.icon)}
        ${f.isExample ? '<figcaption class="showcase__label">Ukázka provedení</figcaption>' : ''}
      </figure>
      <div class="showcase__info">
        <p class="tag">${esc(f.single ? categories.find((k) => k.key === f.key).name : 'Typ zařízení')}</p>
        <h2 class="showcase__name">${esc(f.name)}</h2>
        <p>${esc(f.text)}</p>
        ${f.single
          ? `<ul class="chips" aria-label="Hlavní parametry">${join(f.single.highlights, (x) => `<li>${esc(x)}</li>`)}</ul>
             <div class="showcase__foot"><p class="price"><span class="price__label">${esc(priceText(f.single.price).label)}</span> <span class="price__value">${esc(priceText(f.single.price).value)}</span></p>
             <a class="link-arrow" href="${r(productUrl(f.single))}">Detail automatu ${icons.arrow(18)}</a></div>`
          : `<ul class="showcase__models">${join(f.items, (p) => `<li><a href="${r(productUrl(p))}">${esc(p.name)} ${icons.arrow(16)}</a></li>`)}</ul>`}
      </div>
    </div>`)}
  </div>
</div>`;
}

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
    ${showcase(r)}
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

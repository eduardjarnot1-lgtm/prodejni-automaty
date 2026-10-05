import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { site } from '../data/site.js';
import { categories, publishedProducts, productUrl, priceText } from '../data/products.js';
import { photosByCategory, photoById } from '../data/photos.js';
import { services, process } from '../data/services.js';
import { photo, photoPlaceholder, button, inquiryHref, contactBand, phoneLink } from '../lib/components.js';
import { heroStage, mediaTeaser } from '../lib/media-markup.js';
import { media } from '../data/media.js';

// Featured machines in the hero, one tab per category. A category shows a
// photo confirmed for one of its products; otherwise the first category
// example photo, labelled "Ukázka provedení" so it is never presented as a
// specific model. Product specs appear only when the category has exactly
// one product, so photo and specs always belong together.
function featured() {
  return categories
    .map((k) => {
      const items = publishedProducts.filter((p) => p.category === k.key);
      // A product photo only stands for the category when it is its only product.
      const withPhoto = items.length === 1 ? items.find((p) => p.photos.length) : null;
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
  return `<div class="showcase" data-showcase>
  <div class="showcase__stage">
    ${join(list, (f, i) => `<div class="showcase__panel${i === 0 ? ' is-active' : ''}" id="sc-panel-${f.key}" role="group" aria-roledescription="automat" aria-label="${i + 1} z ${list.length}: ${esc(f.tab)}">
      <figure class="showcase__media">
        ${f.photoId
          ? photo(r, f.photoId, { eager: i === 0, sizes: '(min-width: 1000px) 520px, 88vw', cls: 'showcase__img' })
          : photoPlaceholder(f.icon)}
        ${f.isExample ? '<figcaption class="visually-hidden">Ukázka provedení</figcaption>' : ''}
      </figure>
      <div class="showcase__card">
        <p class="showcase__tag">${esc(f.single ? categories.find((k) => k.key === f.key).name : 'Typ zařízení')}${f.isExample ? ' · foto: ukázka provedení' : ''}</p>
        <h3 class="showcase__name">${esc(f.name)}</h3>
        ${f.single
          ? `<ul class="chips chips--dark" aria-label="Hlavní parametry">${join(f.single.highlights, (x) => `<li>${esc(x)}</li>`)}</ul>
             <p class="showcase__price">${esc(priceText(f.single.price).label)}: <strong>${esc(priceText(f.single.price).value)}</strong></p>
             <a class="showcase__more" href="${r(productUrl(f.single))}">Detail automatu ${icons.arrow(16)}</a>`
          : `<p class="showcase__text">${esc(f.text)}</p>
             <ul class="showcase__models">${join(f.items, (p) => `<li><a href="${r(productUrl(p))}">${esc(p.name)} ${icons.arrow(16)}</a></li>`)}</ul>`}
      </div>
    </div>`)}
  </div>
  <div class="showcase__controls" role="group" aria-label="Přepnout automat">
    <button class="showcase__arrow" type="button" data-sc-prev aria-label="Předchozí automat">${icons.arrow(18)}</button>
    <div class="showcase__dots">
      ${join(list, (f, i) => `<button class="showcase__dot" type="button" data-sc-go="${i}" aria-controls="sc-panel-${f.key}" aria-pressed="${i === 0}"><span class="visually-hidden">${esc(f.tab)}</span></button>`)}
    </div>
    <button class="showcase__arrow showcase__arrow--next" type="button" data-sc-next aria-label="Další automat">${icons.arrow(18)}</button>
    <p class="showcase__status" aria-live="polite"><span data-sc-index>1</span> / ${list.length} · <span data-sc-name>${esc(list[0].tab)}</span></p>
  </div>
</div>`;
}

// Interactive gallery panel: the large photo in the middle and two smaller
// ones; choosing a small one swaps it into the large position (main.js +
// GSAP Flip). The caption always describes the large photo.
const GALLERY = ['chlazeny-automat-dotykovy-displej', 'boxovy-system-12-schranek', 'chlazeny-automat-dvojita-sestava'];

function galleryItem(r, id, isMain) {
  const ph = photoById(id);
  const cat = categories.find((k) => k.key === ph.category);
  return `<button class="gallery__item" type="button" data-photo="${id}" data-name="${esc(ph.title)}" data-cat="${esc(cat.name)}" data-href="${r('automaty.html#' + cat.key)}"
      aria-pressed="${isMain}" aria-label="Zobrazit ve velkém náhledu: ${esc(ph.title)}">
      ${photo(r, id, { sizes: '(min-width: 1000px) 420px, 90vw' })}
      <span class="gallery__expand" aria-hidden="true">${icons.plus(16)}</span>
    </button>`;
}

function gallery(r) {
  const [main, a, c] = GALLERY;
  const mainPhoto = photoById(main);
  const mainCat = categories.find((k) => k.key === mainPhoto.category);
  return `<section class="gallery" aria-labelledby="galerie-h" data-gallery>
  <h2 id="galerie-h" class="visually-hidden">Ukázky provedení automatů</h2>
  ${guideLinesSvg('gallery__lines', 300)}
  <div class="gallery__slot gallery__slot--a">${galleryItem(r, a, false)}</div>
  <div class="gallery__slot gallery__slot--b">${galleryItem(r, main, true)}</div>
  <div class="gallery__slot gallery__slot--c">${galleryItem(r, c, false)}</div>
  <div class="gallery__caption">
    <p class="gallery__tag">Ukázka provedení · <span data-g-cat>${esc(mainCat.name)}</span></p>
    <p class="gallery__name" data-g-name aria-live="polite">${esc(mainPhoto.title)}</p>
    <a class="link-arrow" data-g-link href="${r('automaty.html#' + mainCat.key)}">Zobrazit kategorii <span class="arrow-swap">${icons.arrow(18)}${icons.arrow(18)}</span></a>
  </div>
  <p class="gallery__text gallery__text--a">Chlazené automaty na potraviny a výdejní boxové systémy pro samoobslužný prodej a výdej zboží. Vyberte fotografii pro větší náhled.</p>
  <div class="gallery__text gallery__text--b">
    <p>Konkrétní model, výbavu a počet schránek navrhneme podle vašeho provozu a místa instalace.</p>
    <a class="link-arrow" href="${r('automaty.html')}">Prohlédnout automaty <span class="arrow-swap">${icons.arrow(18)}${icons.arrow(18)}</span></a>
  </div>
</section>`;
}

// "Jak fungují automaty s AI" (anchor #automaty-s-ai, linked from the
// Pro 542 page). Applies only to HAHA VENDING machines with AI recognition;
// the other machines in the catalogue work differently. Manufacturer
// figures are labelled as such.
function aiSection(r) {
  const pro = publishedProducts.find((p) => p.ai);
  if (!pro) return '';
  const topics = [
    { title: 'Kamerové rozpoznávání', text: 'Kamery v automatu spolu s umělou inteligencí rozpoznají, které produkty zákazník z polic odebral.' },
    { title: 'Více produktů najednou', text: 'Během jednoho nákupu si zákazník může vzít několik položek.' },
    { title: 'Vyúčtování po zavření dveří', text: 'Nákup se vyúčtuje automaticky po zavření dveří. Podle výrobce trvá rozpoznání přibližně 60 sekund.' },
    { title: 'Flexibilní sortiment', text: 'Zboží se přidává z knihovny produktů, nebo přes žádost o registraci nového produktu.' },
  ];
  const steps = [
    { title: 'Přiložíte kartu nebo mobil', text: 'Podporovanou platební kartou nebo mobilem se otevřou dveře automatu.' },
    { title: 'Vyberete si zboží', text: 'Zboží si vezmete přímo z polic, klidně i více kusů.' },
    { title: 'AI rozpozná a vyúčtuje nákup', text: 'Po zavření dveří systém rozpozná odebrané produkty a nákup vyúčtuje.' },
  ];
  const ops = [
    { title: 'Statistiky prodeje', text: 'Prodeje podle produktů, zařízení a období.' },
    { title: 'Přehled zásob', text: 'Stav zásob a správa sortimentu a cen.' },
    { title: 'Upozornění na doplnění', text: 'Upozornění na docházející zboží a na stav zařízení.' },
    { title: 'Správa na dálku', text: 'Teplota, otevření dveří nebo restart automatu z aplikace.' },
  ];
  return `<section class="section ai-home" id="automaty-s-ai" aria-labelledby="ai-h">
  <div class="wrap">
    <div class="section-head section-head--stack">
      <p class="eyebrow">Automaty s AI</p>
      <h2 id="ai-h">Jak fungují automaty s AI</h2>
      <p>Chytré automaty využívají kamerové rozpoznávání produktů. Zákazník si vybere zboží přímo z polic a systém rozpozná odebrané položky pro automatické vyúčtování nákupu.</p>
    </div>
    <ul class="ai-topics">
      ${join(topics, (t) => `<li><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></li>`)}
    </ul>
    <h3 class="ai-home__sub">Nákup ve třech krocích</h3>
    <ol class="steps steps--3">
      ${join(steps, (s) => `<li class="step"><span class="step__bar" aria-hidden="true"></span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)}
    </ol>
    <p class="note">Údaje o době rozpoznání (přibližně 60 sekund) a přesnosti (až 99 %) uvádí výrobce.</p>
    <div class="ai-ops">
      <div class="ai-ops__head">
        <h3>Co získá provozovatel</h3>
        <p>Nejde o funkce umělé inteligence, ale o správu automatu v cloudové platformě AI VENDING.</p>
      </div>
      <ul class="ai-ops__list">
        ${join(ops, (o) => `<li><strong>${esc(o.title)}</strong><span>${esc(o.text)}</span></li>`)}
      </ul>
    </div>
    ${mediaTeaser(r, {
      poster: media.haha542Tour.posterSmall, width: 480, height: 480,
      eyebrow: 'Vizuální prohlídka',
      title: `${pro.name} zblízka`,
      text: 'Ilustrační vizualizace vytvořená pomocí AI, od detailu polic po celkové provedení. Rozpoznávání zboží ve videu neuvidíte.',
      href: r(productUrl(pro) + '#prohlidka'),
      cta: 'Zobrazit prohlídku',
    })}
    <div class="ai-scope">
      <p>Kamerové rozpoznávání nabízejí pouze automaty HAHA VENDING s AI. V naší nabídce je to model <a href="${r(productUrl(pro))}">${esc(pro.name)}</a>. Ostatní automaty v katalogu tuto funkci nemají.</p>
      <a class="btn btn--primary" href="${r(productUrl(pro))}">Detail ${esc(pro.name)}</a>
    </div>
  </div>
</section>`;
}

// Converging guide lines behind the featured machine (decorative).
// Converging guide lines (decorative), used behind the featured machine and
// behind the large gallery photo. cy = where the lines meet (0–700).
const guideLinesSvg = (cls, cy) => `<svg class="guide-lines ${cls}" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  ${[[0, 210], [0, 330], [0, 470], [190, 700], [1000, 210], [1000, 330], [1000, 470], [810, 700], [230, 0], [770, 0]].map(([x, y]) => `<line x1="${x}" y1="${y}" x2="500" y2="${cy}"/>`).join('')}
</svg>`;
const guideLines = guideLinesSvg('featured__lines', 520);

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


    return `
${heroStage(r, `
      <h1 id="hero-h" class="display hero__title"><span class="hero__line">Prodej a pronájem</span> <span class="hero__line">výdejních <span class="stencil">automatů</span></span></h1>
      <p class="hero__lead">Dodáváme chlazené automaty na potraviny a výdejní boxové systémy. V oboru jsme od roku ${site.since}. Pomůžeme vybrat vhodné zařízení, nainstalujeme ho a postaráme se o servis.</p>
      <div class="hero__actions">
        ${button(inquiryHref(r), 'Nezávazně poptat', 'primary')}
        <a class="btn btn--secondary" href="${r('automaty.html')}">Prohlédnout automaty <span class="arrow-swap">${icons.arrow(18)}${icons.arrow(18)}</span></a>
      </div>
      <p class="hero__call">${icons.phone(16)} ${phoneLink()} <span>(${esc(site.contact.person)})</span></p>`)}
<!--break-->
<section class="reasons" aria-label="Proč se na nás obrátit">
  <ul class="wrap reasons__list">
    ${join(reasons, (x) => `<li>${icons[x.icon](24)}<div><h2 class="reasons__h">${esc(x.title)}</h2><p>${esc(x.text)}</p></div></li>`)}
  </ul>
</section>

<!--break-->
<section class="featured" aria-labelledby="featured-h">
  ${guideLines}
  <div class="featured__inner">
    <div class="featured__head">
      <p class="eyebrow">Vybrané automaty</p>
      <h2 id="featured-h" class="featured__title">Chlazené automaty a boxové systémy</h2>
      <p>Přepínejte mezi typy zařízení. Konkrétní model a výbavu doporučíme podle vašeho provozu.</p>
      <p><a class="link-arrow" href="${r('automaty.html')}">Všechny automaty a parametry <span class="arrow-swap">${icons.arrow(18)}${icons.arrow(18)}</span></a></p>
    </div>
    ${showcase(r)}
  </div>
</section>
<!--break-->
${aiSection(r)}
<!--break-->
${gallery(r)}
<!--break-->
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
      ${join(process, (s) => `<li class="step"><span class="step__bar" aria-hidden="true"></span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)}
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

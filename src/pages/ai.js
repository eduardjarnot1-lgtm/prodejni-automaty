// "AI automaty": how purchasing with AI product recognition works and what
// the AI VENDING management platform offers the operator.
//
// Applies only to HAHA VENDING machines with AI recognition (Pro 542). Facts
// come from the manufacturer brochure; manufacturer figures are labelled as
// such. The machine's AI (product recognition) is kept apart from the cloud
// platform's management functions, which are not described as AI.

import { esc, join } from '../lib/html.js';
import { icons } from '../lib/icons.js';
import { publishedProducts, productUrl } from '../data/products.js';
import { pageHead, inquiryHref, contactBand, photo } from '../lib/components.js';
import { formIll, photosIll, reviewIll, shelfIll, restockIll } from '../lib/ai-visuals.js';

export const AI_PAGE = 'ai-automaty.html';

const sections = [
  { id: 'jak-probiha-nakup', label: 'Jak probíhá nákup' },
  { id: 'vyhody-pro-zakazniky', label: 'Výhody pro zákazníky' },
  { id: 'ceny-a-sortiment', label: 'Správa cen a sortimentu' },
  { id: 'prodeje-a-zasoby', label: 'Prodeje a zásoby' },
  { id: 'vzdalena-sprava', label: 'Vzdálená správa' },
  { id: 'caste-otazky', label: 'Časté otázky' },
];

// Customer journey (brochure: Swipe / Tap → Grab Items → Auto Checkout).
const journey = [
  { img: 'ai-nakup-1-platba', title: 'Přiložte kartu nebo telefon', text: 'Podporovanou kartou nebo telefonem zahájíte nákup a odemknete dveře.' },
  { img: 'ai-nakup-2-vyber', title: 'Vyberte si zboží', text: 'Vezměte si z polic, co chcete, klidně více kusů najednou.' },
  { img: 'ai-nakup-3-dokonceni', title: 'Dokončete nákup', text: 'Zavřete dveře; systém rozpozná odebrané zboží a nákup vyúčtuje.' },
];

const perks = [
  { icon: 'shelves', title: 'Zboží na očích', text: 'Všechno je vidět za prosklenými dveřmi.' },
  { icon: 'receipt', title: 'Více produktů, jedna platba', text: 'Nápoj i svačina v jednom nákupu.' },
  { icon: 'mobile', title: 'Známé platby', text: 'Karty a mobilní peněženky, např. Apple Pay a Google Pay.' },
];

const assortmentActions = [
  { icon: 'shelves', title: 'Správa sortimentu', text: 'Sestavíte nabídku pro jednotlivé automaty a police.' },
  { icon: 'tag', title: 'Nastavení cen', text: 'Ceny nastavujete a měníte sami; platforma je sama nemění.' },
  { icon: 'chart', title: 'Přehled prodejů', text: 'Uvidíte, co se prodává, a podle toho nabídku upravíte.' },
];
const assortmentMore = [
  'Správa knihovny produktů.',
  'Import podporovaných produktů z cloudové knihovny.',
  'Sortiment zvlášť pro každý automat i polici.',
  'Úpravy nabídky podle dosažených prodejů.',
  'Registrace nového produktu, který v knihovně chybí (viz níže).',
];

const newProduct = [
  { ill: formIll, title: 'Údaje o produktu', text: 'Vyplníte údaje o produktu. Standardizované zboží má kód GTIN.' },
  { ill: photosIll, title: 'Fotografie produktu', text: 'Přiložíte čtyři fotografie: zepředu, zezadu, z boku a shora.', caption: 'Ilustrační příklad' },
  { ill: reviewIll, title: 'Odeslání ke kontrole', text: 'Žádost odešlete ke schválení.' },
  { ill: shelfIll, title: 'Zařazení do nabídky', text: 'Po schválení produkt zařadíte do sortimentu automatu.' },
];

// Recording a restock in the app (brochure: "Scan the code to open the door
// and restock items. Choose from three restocking modes"; mode definitions
// from the manufacturer). How the one-click quantity is calculated is not
// documented, so it is not described.
const restock = [
  {
    key: 'fast', title: 'Rychlé doplnění',
    does: 'Doplníte zboží a zaznamenáte to bez zadávání počtu doplněných kusů u každého produktu.',
    records: 'Při tomto kroku nezadáváte přesná množství jednotlivých produktů.',
    when: 'Když chcete omezit ruční zadávání údajů.',
    tags: ['Krabice', 'Automat', 'Bez počtu kusů'],
  },
  {
    key: 'oneclick', title: 'Doplnění jedním kliknutím',
    does: 'Doplníte zboží a doplnění zaznamenáte v aplikaci jedním kliknutím.',
    records: 'Režim pracuje s vypočteným množstvím k doplnění. Jedno kliknutí se týká záznamu v aplikaci, nikoli fyzického doplnění zboží.',
    when: 'Pro provoz s poměrně stálým sortimentem.',
    tags: ['Automat', 'Vypočtené množství', 'Potvrzení'],
  },
  {
    key: 'order', title: 'Doplnění podle objednávky',
    does: 'Doplnění organizujete podle objednávky na doplnění zásob, ne podle nákupu zákazníka.',
    records: 'Podle výrobce tento režim podporuje přesnější evidenci zásob.',
    when: 'Pro plánované doplňování a přehlednější práci se skladem.',
    tags: ['Objednávka na doplnění', 'Krabice', 'Automat'],
  },
];

// Management functions (AI VENDING platform), shown on the schematic phone.
const functions = [
  { key: 'produkty', icon: 'tag', title: 'Produkty a ceny', text: 'Katalog produktů, ceny a sortiment jednotlivých automatů.' },
  { key: 'prodeje', icon: 'chart', title: 'Prodeje a platby', text: 'Přehled objednávek, tržeb a záznamů o platbách za zvolené období.' },
  { key: 'zasoby', icon: 'box', title: 'Zásoby a doplňování', text: 'Stav zásob, upozornění na docházející zboží a historie doplňování.' },
  { key: 'stav', icon: 'bell', title: 'Stav zařízení', text: 'Upozornění, když automat hlásí problém, a kontrola teploty.' },
  { key: 'nastaveni', icon: 'gear', title: 'Nastavení automatu', text: 'Nastavení teploty, vzdálené otevření dveří a restart automatu.' },
  { key: 'uzivatele', icon: 'users', title: 'Uživatelé a oprávnění', text: 'Role a přístupy pro kolegy i pro obsluhu, která automat doplňuje.' },
];

// Accessible tabs (behaviour: main.js → initTabs). Without JavaScript all
// panels stay visible, one below the other.
const tabs = (id, label, items, panel) => `<div class="tabs__list" role="tablist" aria-label="${esc(label)}">
      ${join(items, (x, i) => `<button class="tabs__tab" type="button" role="tab" id="${id}-tab-${x.key}" aria-controls="${id}-panel-${x.key}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-key="${x.key}">${x.icon ? icons[x.icon](18) : ''}<span>${esc(x.title)}</span></button>`)}
    </div>
    ${join(items, (x, i) => `<div class="tabs__panel" role="tabpanel" id="${id}-panel-${x.key}" aria-labelledby="${id}-tab-${x.key}" tabindex="0" data-key="${x.key}"${i === 0 ? ' data-first' : ''}>${panel(x)}</div>`)}`;

function faq(r, pro) {
  return [
    { q: 'Jak AI pozná vybrané zboží?', a: 'Automat má kamerový systém, který po zavření dveří s pomocí umělé inteligence rozpozná, které produkty zákazník odebral. Výrobce uvádí přesnost rozpoznávání až 99 %. Jde o údaj výrobce, ne o záruku; výsledek může záviset na sortimentu a balení zboží.' },
    { q: 'Lze koupit více produktů najednou?', a: 'Ano. Během jednoho nákupu si zákazník může vzít více produktů a nákup se vyúčtuje dohromady.' },
    { q: 'Jaké platební metody automat podporuje?', a: 'Podle výrobce kreditní a debetní karty a podporované mobilní peněženky, například Apple Pay a Google Pay. Konkrétní platební metody ověříme podle dodané konfigurace.' },
    { q: 'Mohu měnit ceny a sortiment?', a: 'Ano. Ceny i sortiment nastavuje provozovatel v platformě AI VENDING, a to pro jednotlivé automaty i police. Platforma ceny sama nemění.' },
    { q: 'Jak přidám nový produkt?', a: 'Buď ho importujete z cloudové knihovny produktů, nebo podáte žádost o registraci: vyplníte údaje, přiložíte čtyři fotografie a po schválení produkt zařadíte do sortimentu. Podle výrobce je žádost vyřízena do 6 hodin.' },
    { q: 'Jak zjistím, co je potřeba doplnit?', a: 'Platforma ukazuje stav zásob a upozorní na docházející zboží. Přesnost evidence závisí na zvoleném způsobu doplňování a na správném zadávání změn.' },
    { q: 'Lze automat spravovat na dálku?', a: 'Ano. Na dálku lze například nastavit teplotu, otevřít dveře, restartovat automat, sledovat upozornění a spravovat přístupy obsluhy.' },
    { q: 'Který model tyto funkce nabízí?', html: `V naší nabídce je to model <a href="${r(productUrl(pro))}">${esc(pro.name)}</a>. Ostatní automaty a výdejní boxové systémy v katalogu fungují jinak.` },
  ];
}

export default {
  path: AI_PAGE,
  navKey: 'ai',
  title: 'AI automaty: chytrý nákup, přehledná správa',
  description:
    'Jak funguje nákup v automatu s AI rozpoznáváním produktů a jak provozovatel spravuje ceny, sortiment, zásoby a prodeje na dálku. Automaty HAHA VENDING, model Pro 542.',
  render(r) {
    const pro = publishedProducts.find((p) => p.ai);
    const proUrl = r(productUrl(pro));
    const proInquiry = inquiryHref(r, 'poptat-' + pro.slug);
    const img = (id, sizes) => photo(r, id, { sizes });
    return `
${pageHead({
  r,
  eyebrow: 'Automaty HAHA VENDING s AI',
  title: 'AI automaty: chytrý nákup, přehledná správa',
  lead: 'Zjistěte, jak funguje nákup s AI rozpoznáváním produktů a jak můžete spravovat sortiment, ceny, zásoby i prodeje na dálku.',
  crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: 'AI automaty' }],
  cls: 'art-bg art-bg--hero',
})}

<nav class="wrap jump" aria-label="Obsah stránky">
  <ul>${join(sections, (s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`)}</ul>
</nav>
<div class="wrap">
  <p class="ai-scope-note">Popsané funkce nabízejí automaty HAHA VENDING s AI rozpoznáváním, v naší nabídce model <a href="${proUrl}">${esc(pro.name)}</a>. Ostatní automaty a výdejní boxové systémy v katalogu fungují jinak.</p>
</div>

<section class="section ai-sec" id="jak-probiha-nakup" aria-labelledby="nakup-h">
  <div class="wrap">
    <div class="section-head section-head--stack">
      <p class="eyebrow">Jak probíhá nákup</p>
      <h2 id="nakup-h">Nákup, který zákazník zná</h2>
    </div>
    <ol class="journey">
      ${join(journey, (j, i) => `<li class="journey__step">
        <div class="journey__img">${img(j.img, '(min-width: 900px) 300px, 80vw')}</div>
        <h3><span class="journey__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span> ${esc(j.title)}</h3>
        <p>${esc(j.text)}</p>
      </li>`)}
    </ol>
    <p class="ai-label">Ilustrační náhled</p>
    <ul class="perks" id="vyhody-pro-zakazniky" aria-label="Výhody pro zákazníky">
      ${join(perks, (x) => `<li>${icons[x.icon](24)}<div><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></div></li>`)}
    </ul>

    <div class="ai-split ai-split--recog">
      <figure class="ai-figure">${img('ai-rozpoznavani-police', '(min-width: 900px) 560px, 92vw')}<figcaption class="ai-label">Ilustrační náhled</figcaption></figure>
      <div>
        <h3 class="ai-sub">Jak AI pozná vybrané zboží</h3>
        <p>Kamery v automatu sledují police. Po zavření dveří systém s pomocí AI určí, které produkty zákazník odebral, a nákup vyúčtuje.</p>
        <details class="disclosure disclosure--inline">
          <summary><span>Podrobnosti o nákupu</span>${icons.plus(20)}</summary>
          <div class="disclosure__body">
            <p>Při zahájení nákupu může být na kartě dočasně rezervována částka (předautorizace platby).</p>
            <p>Rozpoznání a vyúčtování proběhne po zavření dveří; výrobce uvádí přibližně 60 sekund. Samotný výběr zboží tím zdržen není.</p>
            <p>Výrobce uvádí přesnost rozpoznávání až 99 %. Jde o údaj výrobce, ne o záruku.</p>
            <p>Konkrétní platební metody ověříme podle dodané konfigurace.</p>
          </div>
        </details>
        <p><a class="link-arrow" href="${proUrl}#prohlidka">Vizuální prohlídka Pro 542 <span class="arrow-swap">${icons.arrow(18)}${icons.arrow(18)}</span></a></p>
      </div>
    </div>
  </div>
</section>

<!--break-->
<section class="section section--alt ai-sec" id="ceny-a-sortiment" aria-labelledby="sortiment-h">
  <div class="wrap">
    <div class="ai-split">
      <figure class="ai-figure ai-figure--white">${img('ai-prehled-sortimentu', '(min-width: 900px) 560px, 92vw')}<figcaption class="ai-label">Ilustrační náhled, nejde o skutečnou aplikaci</figcaption></figure>
      <div>
        <p class="eyebrow">Správa cen a sortimentu</p>
        <h2 id="sortiment-h">Ceny a nabídku určujete vy</h2>
        <p class="ai-lead">Zákazník zboží vybírá a kupuje. Ceny a sortiment spravuje provozovatel v cloudové platformě AI VENDING.</p>
        <ul class="ai-actions">
          ${join(assortmentActions, (x) => `<li>${icons[x.icon](22)}<div><strong>${esc(x.title)}</strong><span>${esc(x.text)}</span></div></li>`)}
        </ul>
        <details class="disclosure disclosure--inline">
          <summary><span>Další možnosti správy</span>${icons.plus(20)}</summary>
          <div class="disclosure__body"><ul class="checks">${join(assortmentMore, (x) => `<li>${icons.check(20)}<span>${esc(x)}</span></li>`)}</ul></div>
        </details>
      </div>
    </div>

    <div class="ai-block">
      <h3 class="ai-sub" id="novy-h">Nový produkt v sortimentu</h3>
      <ol class="flow">
        ${join(newProduct, (x, i) => `<li class="flow__step">
          <div class="flow__ill">${x.ill()}${x.caption ? `<span class="ai-label ai-label--in">${esc(x.caption)}</span>` : ''}</div>
          <h4><span class="journey__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span> ${esc(x.title)}</h4>
          <p>${esc(x.text)}</p>
        </li>`)}
      </ol>
      <details class="disclosure disclosure--inline">
        <summary><span>Podrobnosti přidání produktu</span>${icons.plus(20)}</summary>
        <div class="disclosure__body">
          <p>Nejdřív se vyplatí podívat do cloudové knihovny: podporované produkty z ní můžete rovnou importovat.</p>
          <p>Pokud produkt v knihovně chybí, podáte žádost o nový produkt. U standardizovaného zboží zadáte kód GTIN, u nestandardizovaného zboží podle výrobce není potřeba. Přiložíte čtyři fotografie produktu.</p>
          <p>Žádost se po odeslání kontroluje; výrobce uvádí vyřízení do 6 hodin. Schválený produkt pak zařadíte do sortimentu a rozmístíte na police.</p>
        </div>
      </details>
    </div>
  </div>
</section>

<!--break-->
<section class="section ai-sec" id="prodeje-a-zasoby" aria-labelledby="zasoby-h">
  <div class="wrap">
    <div class="ai-split ai-split--rev">
      <figure class="ai-figure">${img('ai-upozorneni-zasoby', '(min-width: 900px) 560px, 92vw')}<figcaption class="ai-label">Ilustrační náhled</figcaption></figure>
      <div>
        <p class="eyebrow">Prodeje a zásoby</p>
        <h2 id="zasoby-h">Víte, co se prodává a co doplnit</h2>
        <p class="ai-lead">Přehled tržeb a objednávek podle období, produktů a automatů. Platforma upozorní na docházející zboží a eviduje doplňování i změny zásob.</p>
        <p>Přehled ukazuje tržby a objednávky, ne čistý zisk.</p>
      </div>
    </div>

    <section class="ai-block restock" aria-labelledby="doplneni-h">
      <h3 class="ai-sub" id="doplneni-h">Jak zaznamenáte doplnění zboží</h3>
      <p class="restock__intro">Zboží do automatu vždy doplňuje obsluha. Tyto tři režimy určují, jak doplnění zaznamenáte v aplikaci a jak následně pracujete s evidencí zásob.</p>
      <ul class="restock__cards">
        ${join(restock, (x) => `<li class="restock__card">
          <div class="restock__art">${restockIll(x.key)}</div>
          <p class="restock__tags">${join(x.tags, (t) => `<span>${esc(t)}</span>`)}</p>
          <h4>${esc(x.title)}</h4>
          <dl>
            <div><dt>Co uděláte</dt><dd>${esc(x.does)}</dd></div>
            <div><dt>Záznam v aplikaci</dt><dd>${esc(x.records)}</dd></div>
            <div><dt>Kdy se hodí</dt><dd>${esc(x.when)}</dd></div>
          </dl>
        </li>`)}
      </ul>
      <p class="restock__caption">${icons.user(18)} Fyzické doplnění provádí obsluha. Schémata vysvětlují princip, nejde o snímky aplikace.</p>
      <p class="ai-qual ai-qual--strong">Přesnost evidence zásob závisí na zvoleném režimu a správnosti zadaných údajů. Evidence v aplikaci nemusí vždy odpovídat skutečnému počtu kusů v automatu.</p>
      <details class="disclosure disclosure--inline">
        <summary><span>Podrobnější postup v aplikaci</span>${icons.plus(20)}</summary>
        <div class="disclosure__body">
          <p>Při doplňování obsluha otevře dveře automatu naskenováním kódu v aplikaci a doplní zboží do polic.</p>
          <p>Pro záznam doplnění si podle potřeb provozu vyberete jeden ze tří režimů. Rozpoznávání zboží pomocí AI slouží k vyúčtování nákupů zákazníků; přesnost evidence zásob nezaručuje.</p>
          <p>Podrobný postup v aplikaci upřesníme podle dodané konfigurace.</p>
        </div>
      </details>
    </section>
  </div>
</section>

<!--break-->
<section class="section section--alt ai-sec art-bg art-bg--edge" id="vzdalena-sprava" aria-labelledby="dalka-h">
  <div class="wrap">
    <div class="remote-ui" data-tabs>
      <div class="remote-ui__head">
        <p class="eyebrow">Vzdálená správa</p>
        <h2 id="dalka-h">Provoz pod kontrolou i na dálku</h2>
        <p class="ai-lead">AI v automatu rozpoznává zboží. Aplikace a cloudová platforma slouží ke správě provozu.</p>
      </div>
      <figure class="appmock" aria-label="Schéma aplikace pro správu automatu">
        <div class="appmock__phone">
          <div class="appmock__bar" aria-hidden="true"><span></span></div>
          <ul class="appmock__grid" aria-hidden="true">
            ${join(functions, (f) => `<li data-tab-mark="${f.key}">${icons[f.icon](26)}<span>${esc(f.title)}</span></li>`)}
          </ul>
        </div>
        <figcaption class="ai-label">Schematický náhled, nejde o snímek skutečné aplikace</figcaption>
      </figure>
      <div class="remote-ui__tabs">
        ${tabs('sprava', 'Funkce aplikace', functions, (f) => `<p class="remote-ui__text"><strong>${esc(f.title)}.</strong> ${esc(f.text)}</p>`)}
      </div>
    </div>

    <div class="ai-diagram">
      <figure class="ai-figure ai-figure--white">${img('ai-automat-cloud-aplikace', '(min-width: 900px) 640px, 92vw')}</figure>
      <ol class="ai-diagram__steps" aria-label="Jak spolu části souvisejí">
        <li>${icons.machine(24)}<strong>Automat</strong><span>AI rozpozná odebrané zboží.</span></li>
        <li>${icons.cloud(24)}<strong>Cloudová platforma</strong><span>Objednávky, platby, zásoby a nastavení.</span></li>
        <li>${icons.mobile(24)}<strong>Aplikace</strong><span>Přehledy, upozornění a úkony na dálku.</span></li>
      </ol>
    </div>
    <p class="ai-qual">Popis funkcí vychází z podkladů výrobce. Dostupnost funkcí závisí na dodané konfiguraci a podmínkách platformy; upřesníme je v nabídce.</p>
  </div>
</section>

<!--break-->
<section class="section" id="caste-otazky" aria-labelledby="faq-h">
  <div class="wrap narrow">
    <h2 id="faq-h">Časté otázky</h2>
    <div class="faq">
      ${join(faq(r, pro), (f) => `<details class="disclosure">
        <summary><span>${esc(f.q)}</span>${icons.plus(20)}</summary>
        <div class="disclosure__body"><p>${f.html || esc(f.a)}</p></div>
      </details>`)}
    </div>
  </div>
</section>

${contactBand(r, {
  heading: 'Prohlédněte si HAHA Pro 542',
  text: 'Fotografie, technické parametry a vizuální prohlídku najdete na stránce automatu. Konzultace je zdarma a nezávazná.',
  actions: [
    { href: proUrl, label: 'Prohlédnout automat', primary: true },
    { href: proInquiry, label: 'Nezávazně poptat' },
  ],
})}
`;
  },
};

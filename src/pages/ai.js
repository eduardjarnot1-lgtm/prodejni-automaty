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
import { media } from '../data/media.js';
import { pageHead, inquiryHref, contactBand } from '../lib/components.js';
import { mediaTeaser } from '../lib/media-markup.js';

export const AI_PAGE = 'ai-automaty.html';

const sections = [
  { id: 'jak-probiha-nakup', label: 'Jak probíhá nákup' },
  { id: 'vyhody-pro-zakazniky', label: 'Výhody pro zákazníky' },
  { id: 'ceny-a-sortiment', label: 'Správa cen a sortimentu' },
  { id: 'prodeje-a-zasoby', label: 'Prodeje a zásoby' },
  { id: 'vzdalena-sprava', label: 'Vzdálená správa' },
  { id: 'caste-otazky', label: 'Časté otázky' },
];

const journey = [
  { title: 'Přiložení karty nebo mobilu', text: 'Zákazník zahájí nákup podporovanou platební kartou nebo mobilem. Na kartě může být dočasně rezervována částka (předautorizace platby).' },
  { title: 'Otevření dveří a výběr', text: 'Dveře se odemknou a zákazník si vybírá zboží přímo z polic. Během jednoho nákupu si může vzít i více produktů.' },
  { title: 'Zavření dveří', text: 'Když má zákazník vybráno, zavře dveře automatu. Tím je výběr ukončen.' },
  { title: 'Rozpoznání a vyúčtování', text: 'Kamerový systém s AI rozpozná odebrané produkty a nákup se automaticky vyúčtuje.' },
];

const customer = [
  { title: 'Zboží na očích', text: 'Produkty jsou vidět za prosklenými dveřmi a zákazník si je bere přímo z polic.' },
  { title: 'Více produktů v jednom nákupu', text: 'Nápoj i svačinu si zákazník vezme najednou, bez opakování platby pro každou položku.' },
  { title: 'Platba kartou nebo mobilem', text: 'Platební a debetní karty a podporované mobilní peněženky, například Apple Pay a Google Pay. Konkrétní platební metody ověříme podle dodané konfigurace.' },
  { title: 'Známá samoobsluha', text: 'Přiložit, vybrat, zavřít dveře. Postup připomíná běžný nákup v obchodě s chladicí vitrínou.' },
];

const assortment = [
  'Správa knihovny produktů.',
  'Import podporovaných produktů z cloudové knihovny.',
  'Nastavení a úpravy cen produktů.',
  'Sestavení sortimentu pro jednotlivé automaty a police.',
  'Úpravy sortimentu podle dosažených prodejů.',
  'Registrace nového produktu, který v knihovně chybí.',
];

const newProduct = [
  { title: 'Údaje o produktu', text: 'Vyplníte název a další údaje. U standardizovaného zboží zadáte kód GTIN, u nestandardizovaného zboží podle výrobce není potřeba.' },
  { title: 'Čtyři fotografie', text: 'Přiložíte čtyři fotografie produktu z různých stran.' },
  { title: 'Odeslání ke kontrole', text: 'Žádost se odešle ke schválení. Podle výrobce je vyřízena do 6 hodin.' },
  { title: 'Zařazení do sortimentu', text: 'Schválený produkt přidáte do sortimentu konkrétního automatu.' },
];

const sales = [
  'Tržby a počty objednávek za zvolené období.',
  'Výsledky podle produktů a podle automatů.',
  'Přehled objednávek.',
  'Stav zásob a upozornění na docházející zboží.',
  'Historie doplňování a záznamy o změnách zásob.',
];

const restock = [
  { title: 'Rychlé doplnění', text: 'Pro jednodušší provoz, kde rozhoduje rychlost. Množství doplněného zboží se po jednotlivých produktech nezadává.' },
  { title: 'Doplnění jedním kliknutím', text: 'Pracuje s vypočteným množstvím k doplnění. Hodí se pro poměrně stálý sortiment.' },
  { title: 'Doplnění podle objednávky', text: 'Podporuje objednávky na doplnění a uspořádanější práci se skladem.' },
];

const remote = [
  { title: 'Teplota na dálku', text: 'Kontrola a nastavení teploty v automatu.' },
  { title: 'Upozornění na stav zařízení', text: 'Zpráva, když automat hlásí problém.' },
  { title: 'Otevření dveří a restart', text: 'Vzdálené otevření dveří a restart automatu.' },
  { title: 'Nastavení zařízení a produktů', text: 'Konfigurace automatu a jeho sortimentu.' },
  { title: 'Objednávky a platby', text: 'Přehled objednávek a záznamů o platbách.' },
  { title: 'Role a přístupy', text: 'Oprávnění pro kolegy i pro obsluhu, která automat doplňuje.' },
];

function faq(r, pro) {
  return [
    { q: 'Jak AI pozná vybrané zboží?', a: 'Automat má kamerový systém, který po zavření dveří s pomocí umělé inteligence rozpozná, které produkty zákazník odebral. Výrobce uvádí přesnost rozpoznávání až 99 %. Jde o údaj výrobce, ne o záruku; výsledek může záviset na sortimentu a balení zboží.' },
    { q: 'Lze koupit více produktů najednou?', a: 'Ano. Během jednoho nákupu si zákazník může vzít více produktů a nákup se vyúčtuje dohromady.' },
    { q: 'Jaké platební metody automat podporuje?', a: 'Podle výrobce platební a debetní karty a podporované mobilní peněženky, například Apple Pay a Google Pay. Konkrétní platební metody ověříme podle dodané konfigurace.' },
    { q: 'Mohu měnit ceny a sortiment?', a: 'Ano. Ceny i sortiment nastavuje provozovatel v platformě AI VENDING, a to pro jednotlivé automaty i police. Platforma ceny sama nemění.' },
    { q: 'Jak přidám nový produkt?', a: 'Buď ho importujete z cloudové knihovny produktů, nebo podáte žádost o registraci: vyplníte údaje, přiložíte čtyři fotografie a po schválení produkt zařadíte do sortimentu. Podle výrobce je žádost vyřízena do 6 hodin.' },
    { q: 'Jak zjistím, co je potřeba doplnit?', a: 'Platforma ukazuje stav zásob a upozorní na docházející zboží. Přesnost evidence závisí na zvoleném způsobu doplňování a na správném zadávání změn.' },
    { q: 'Lze automat spravovat na dálku?', a: 'Ano. Na dálku lze například nastavit teplotu, otevřít dveře, restartovat automat, sledovat upozornění a spravovat přístupy obsluhy.' },
    { q: 'Který model tyto funkce nabízí?', html: `V naší nabídce je to model <a href="${r(productUrl(pro))}">${esc(pro.name)}</a>. Ostatní automaty a výdejní boxové systémy v katalogu fungují jinak.` },
  ];
}

const steps = (list) => `<ol class="steps steps--${list.length}">
      ${join(list, (s) => `<li class="step"><span class="step__bar" aria-hidden="true"></span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)}
    </ol>`;

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
    return `
${pageHead({
  r,
  eyebrow: 'Automaty HAHA VENDING s AI',
  title: 'AI automaty: chytrý nákup, přehledná správa',
  lead: 'Zjistěte, jak funguje nákup s AI rozpoznáváním produktů a jak můžete spravovat sortiment, ceny, zásoby i prodeje na dálku.',
  crumbs: [{ label: 'Úvod', href: 'index.html' }, { label: 'AI automaty' }],
})}

<nav class="wrap jump" aria-label="Obsah stránky">
  <ul>${join(sections, (s) => `<li><a href="#${s.id}">${esc(s.label)}</a></li>`)}</ul>
</nav>
<div class="wrap">
  <p class="ai-scope-note">Popsané funkce nabízejí automaty HAHA VENDING s AI rozpoznáváním, v naší nabídce model <a href="${proUrl}">${esc(pro.name)}</a>. Ostatní automaty a výdejní boxové systémy v katalogu fungují jinak.</p>
</div>

<section class="section" id="jak-probiha-nakup" aria-labelledby="nakup-h">
  <div class="wrap">
    <div class="ai-stage">
      <div class="section-head section-head--stack">
        <p class="eyebrow">Jak probíhá nákup</p>
        <h2 id="nakup-h">Čtyři kroky od výběru k vyúčtování</h2>
        <p>Zákazník si vybírá stejně jako u chladicí vitríny v obchodě. Rozdíl je v tom, že pokladnu nahrazuje rozpoznávání zboží.</p>
      </div>
      ${steps(journey)}
      <p class="ai-stage__note">Rozpoznání a vyúčtování probíhá až po zavření dveří; podle výrobce trvá přibližně 60 sekund. Samotný výběr zboží tím zdržen není.</p>
    </div>
    ${mediaTeaser(r, {
      poster: media.haha542Tour.posterSmall, width: 480, height: 480,
      eyebrow: 'Vizuální prohlídka',
      title: 'Pro 542: chytrý nákup krok za krokem',
      text: 'Ilustrační AI vizualizace principu nákupu. Nejde o záznam skutečného nákupu ani rozpoznávání; skutečné provedení a funkce se mohou lišit podle konfigurace.',
      href: `${proUrl}#prohlidka`,
      cta: 'Zobrazit prohlídku',
    })}
  </div>
</section>

<!--break-->
<section class="section" id="vyhody-pro-zakazniky" aria-labelledby="zakaznici-h">
  <div class="wrap">
    <div class="section-head section-head--stack">
      <p class="eyebrow">Výhody pro zákazníky</p>
      <h2 id="zakaznici-h">Nákup, který zákazník zná</h2>
    </div>
    <ul class="ai-topics">
      ${join(customer, (t) => `<li><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></li>`)}
    </ul>
  </div>
</section>

<!--break-->
<section class="section section--alt" id="ceny-a-sortiment" aria-labelledby="sortiment-h">
  <div class="wrap">
    <div class="section-head section-head--stack">
      <p class="eyebrow">Správa cen a sortimentu</p>
      <h2 id="sortiment-h">Ceny a nabídku určujete vy</h2>
      <p>Zákazník zboží vybírá a kupuje. Ceny a sortiment spravuje provozovatel v cloudové platformě AI VENDING; platforma je sama nemění.</p>
    </div>
    <div class="ai-cols">
      <div>
        <ul class="checks">${join(assortment, (x) => `<li>${icons.check(20)}<span>${esc(x)}</span></li>`)}</ul>
      </div>
      <figure class="ai-example">
        <blockquote><p>V přehledu zjistíte, které produkty se prodávají nejlépe. Podle výsledků můžete upravit jejich cenu, rozšířit nabídku nebo změnit plán doplňování.</p></blockquote>
        <figcaption>Příklad z praxe. Rozhodnutí je vždy na provozovateli.</figcaption>
      </figure>
    </div>
    <h3 class="ai-sub">Nový produkt v sortimentu</h3>
    ${steps(newProduct)}
  </div>
</section>

<!--break-->
<section class="section" id="prodeje-a-zasoby" aria-labelledby="zasoby-h">
  <div class="wrap">
    <div class="section-head section-head--stack">
      <p class="eyebrow">Prodeje a zásoby</p>
      <h2 id="zasoby-h">Přehled o prodeji a doplňování</h2>
      <p>Údaje z platformy pomáhají najít oblíbené produkty a naplánovat doplňování. Přehled ukazuje tržby a objednávky, ne čistý zisk.</p>
    </div>
    <ul class="checks ai-list">${join(sales, (x) => `<li>${icons.check(20)}<span>${esc(x)}</span></li>`)}</ul>
    <h3 class="ai-sub">Tři způsoby doplňování</h3>
    <ul class="remote__list remote__list--3">
      ${join(restock, (f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></li>`)}
    </ul>
    <p class="note">Přesnost evidence zásob závisí na zvoleném způsobu doplňování a na správném zadávání změn. Ne každý způsob odpovídá přesnému fyzickému stavu v automatu.</p>
  </div>
</section>

<!--break-->
<section class="section section--alt" id="vzdalena-sprava" aria-labelledby="dalka-h">
  <div class="wrap">
    <div class="section-head section-head--stack">
      <p class="eyebrow">Vzdálená správa</p>
      <h2 id="dalka-h">Provoz pod kontrolou i na dálku</h2>
      <p>Vzdálená správa je funkcí cloudové platformy AI VENDING. Umělá inteligence v automatu slouží k rozpoznávání zboží; přehledy, nastavení a oprávnění zajišťuje platforma.</p>
    </div>
    <ol class="ai-flow" aria-label="Kdo co zajišťuje">
      <li><span class="ai-flow__k">Automat</span><strong>AI rozpoznávání zboží</strong><span>Kamery a AI určí odebrané produkty.</span></li>
      <li><span class="ai-flow__k">Cloudová platforma</span><strong>AI VENDING</strong><span>Objednávky, platby, zásoby a nastavení.</span></li>
      <li><span class="ai-flow__k">Aplikace</span><strong>Provozovatel a obsluha</strong><span>Přehledy, upozornění a úkony na dálku.</span></li>
    </ol>
    <ul class="remote__list">
      ${join(remote, (f) => `<li><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></li>`)}
    </ul>
    <p class="note">Popis funkcí vychází z podkladů výrobce. Rozsah funkcí a podmínky používání platformy upřesníme v nabídce.</p>
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

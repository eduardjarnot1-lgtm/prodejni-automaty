// Product data. One entry = one product detail page (automaty/<slug>.html).
//
// Rules for editing:
//   - Only enter specifications that are documented for that exact model.
//     Never copy values from another model.
//   - `optional: true` marks equipment that is not part of the base version.
//   - `price.confirmed: false` means the figure comes from the old website and
//     has not been re-confirmed. VAT treatment is unknown, so the website does
//     not say whether prices include VAT.
//   - `status: 'pending'` keeps a product out of the public website until its
//     name and details are confirmed.
//   - `photos` may only contain photos confirmed for this model. Category
//     example photos are shown separately (see photos.js).
//   - `noExamplePhotos: true` means the product never borrows category
//     example photos: until its own photos arrive, neutral placeholders are
//     shown (slots listed in `photoSlots`).
//   - Optional per-product texts: `descriptor` (lead under the title),
//     `badge` (small label on the product card), `cta` (inquiry button
//     label), `contactHeading`, `useCasesNote`, `ai: true` (AI machine:
//     the page links to ai-automaty.html). See HAHA VENDING Pro 542.
//   - Product page overview: `shortName`, `intro` (max. two sentences),
//     `keyFacts` (3–4 verified facts with an icon), `benefits` (max. four
//     { icon, title, text }), `useCases` ({ icon, label }).

export const categories = [
  {
    key: 'chlazene-automaty',
    name: 'Chlazené automaty na potraviny',
    short:
      'Samoobslužný prodej balených jídel, svačin a nápojů. Výběr na dotykovém displeji, nebo přímo z polic u automatu s AI rozpoznáváním produktů.',
  },
  {
    key: 'boxove-systemy',
    name: 'Výdejní boxové systémy',
    short:
      'Uzamykatelné schránky pro výdej předem připraveného zboží a objednávek. Sestava podle počtu a velikosti schránek.',
  },
];

export const products = [
  {
    // Source: manufacturer brochure (spec page) and app screenshots supplied
    // by the client. Marketing image values that differ from the brochure
    // (5.96 kWh/24 h, 324+ bottles) are NOT used; see CONTENT-TODO.md.
    slug: 'haha-vending-pro-542',
    status: 'published',
    category: 'chlazene-automaty',
    name: 'HAHA VENDING Pro 542',
    descriptor: 'Chlazený prodejní automat s AI rozpoznáváním produktů',
    summary:
      'Chlazený prodejní automat s kamerovým rozpoznáváním produktů. Zákazník otevře dveře kartou nebo mobilem, vybere si zboží přímo z polic a nákup se automaticky vyúčtuje.',
    badge: 'AI rozpoznávání',
    cta: 'Nezávazně poptat Pro 542',
    contactHeading: 'Zajímá vás HAHA VENDING Pro 542?',
    shortName: 'Pro 542',
    intro:
      'Chlazený automat s prosklenými dveřmi, ve kterém zákazník vidí celou nabídku a bere si zboží přímo z polic. Nákup se vyúčtuje pomocí kamerového rozpoznávání produktů.',
    keyFacts: [
      { icon: 'ruler', label: 'Rozměry (š × h × v)', value: '750 × 650 × 2020 mm' },
      { icon: 'shelves', label: 'Objem a police', value: '558 l, 6 polic' },
      { icon: 'thermo', label: 'Teplota', value: '0–10 °C' },
      { icon: 'mobile', label: 'Platby', value: 'Karty, Apple Pay, Google Pay' },
    ],
    useCases: [
      { icon: 'office', label: 'Kanceláře a pracoviště' },
      { icon: 'dumbbell', label: 'Fitness a sportoviště' },
      { icon: 'cap', label: 'Studentské koleje' },
      { icon: 'building', label: 'Společné prostory budov' },
    ],
    useCasesNote:
      'Hodí se pro nápoje, svačiny a vhodně balené chlazené produkty. Konkrétní zboží je třeba posoudit z hlediska rozpoznávání a skladování.',
    highlights: ['Výběr přímo z polic', '6 polic', '0–10 °C'],
    benefits: [
      { icon: 'shelves', title: 'Výběr přímo z polic', text: 'Zákazník vidí zboží a během jednoho nákupu si může vzít více položek.' },
      { icon: 'box', title: 'Police podle balení', text: 'Police lze přizpůsobit různým tvarům a velikostem balení.' },
      { icon: 'thermo', title: 'Sklo proti zamlžení', text: 'Dveře s rámem z hliníkové slitiny a vyhřívaným sklem proti zamlžení.' },
      { icon: 'chart', title: 'Správa na dálku', text: 'Teplotu, sortiment i zásoby spravujete v aplikaci AI VENDING; rozsah funkcí upřesníme v nabídce.' },
    ],
    // AI machine: links to ai-automaty.html instead of repeating it.
    ai: true,
    options: [],
    specs: [
      { label: 'Model', value: 'Pro 542' },
      { label: 'Rozpoznávání zboží', value: 'Kamerové, s umělou inteligencí (AI vision)' },
      { label: 'Vnitřní objem', value: '558 l' },
      { label: 'Rozměry (š × h × v)', value: '750 × 650 × 2020 mm' },
      { label: 'Hmotnost', value: '122,5 kg' },
      { label: 'Teplotní rozsah', value: '0–10 °C' },
      { label: 'Chladivo', value: 'R290' },
      { label: 'Spotřeba energie', value: '2,65 kWh / 24 h (uvedená hodnota; skutečná spotřeba závisí na podmínkách provozu)' },
      { label: 'Počet polic', value: '6' },
      { label: 'Kapacita (příklad)', value: 'přibližně 378 ks: 5 polic lahví 0,5 l a 1 police plechovek 0,33 l. Skutečná kapacita závisí na balení a uspořádání zboží.' },
      { label: 'Dveře', value: 'Rám z hliníkové slitiny, vyhřívané sklo proti zamlžení' },
      { label: 'Nastavení teploty', value: 'Na dálku v aplikaci' },
      { label: 'Platby', value: 'Platební a debetní karty, podporované mobilní peněženky (Apple Pay, Google Pay)' },
      { label: 'Přesnost rozpoznávání', value: 'až 99 % (podle výrobce)' },
      { label: 'Doba rozpoznání nákupu', value: 'přibližně 60 s po zavření dveří (podle výrobce)' },
      { label: 'Přidání nového produktu', value: 'do 6 hodin (podle výrobce)' },
    ],
    specsNote: 'Parametry podle podkladů výrobce. Automat je chlazený, není určen pro mražené zboží.',
    price: { type: 'inquiry' },
    photos: ['haha-pro-542-celkovy-pohled', 'haha-pro-542-pohled-zepredu', 'haha-pro-542-detaily'],
    noExamplePhotos: true,
    // Still missing: higher-resolution views, app screenshots (optional).
  },
  {
    slug: 'chlazeny-automat-na-potraviny',
    status: 'published',
    category: 'chlazene-automaty',
    name: 'Chlazený automat na potraviny',
    summary:
      'Prodejní automat s dotykovým displejem a výtahem pro výdej zboží. Až 54 prodejních pozic, volitelně s chlazením 4–8 °C.',
    shortName: 'Chlazený automat',
    intro:
      'Klasický prodejní automat, ve kterém zákazník vybírá zboží na dotykovém displeji a automat mu ho vydá výtahem do výdejního otvoru.',
    keyFacts: [
      { icon: 'shelves', label: 'Prodejní pozice', value: 'max. 54 (6 polic × 9 kanálů)' },
      { icon: 'thermo', label: 'Chlazení', value: '4–8 °C (volitelné)' },
      { icon: 'ruler', label: 'Rozměry', value: '1330 × 815 × 1915 mm' },
      { icon: 'plug', label: 'Max. příkon', value: '500 W' },
    ],
    useCases: [
      { icon: 'factory', label: 'Firmy, výrobní provozy a sklady' },
      { icon: 'office', label: 'Kanceláře a administrativní budovy' },
      { icon: 'building', label: 'Školy, nemocnice a veřejné budovy' },
    ],
    highlights: ['Displej 21,5″', 'Až 54 pozic', 'Výdej výtahem'],
    benefits: [
      { icon: 'mobile', title: 'Dotykový displej 21,5″', text: 'Přehledný výběr zboží na velkém displeji.' },
      { icon: 'box', title: 'Výdej výtahem', text: 'Zboží se k výdejnímu otvoru přepravuje výtahem.' },
      { icon: 'gear', title: 'Systém Android', text: 'Řídicí systém automatu běží na platformě Android.' },
    ],
    options: [
      { label: 'Chlazení', value: 'Udržuje teplotu 4–8 °C' },
    ],
    specs: [
      { label: 'Displej', value: 'Dotykový, 21,5″' },
      { label: 'Operační systém', value: 'Android' },
      { label: 'Počet polic', value: 'až 6' },
      { label: 'Kanály na polici', value: 'až 9' },
      { label: 'Prodejní pozice', value: 'max. 54' },
      { label: 'Způsob výdeje', value: 'Výtah' },
      // Axis order (W × D × H) not confirmed, so values are shown as listed.
      { label: 'Rozměry', value: '1330 × 815 × 1915 mm' },
      { label: 'Chlazení', value: '4–8 °C', optional: true },
      { label: 'Maximální příkon', value: '500 W' },
      { label: 'Příkon v pohotovostním režimu', value: '60 W' },
    ],
    price: { type: 'from', amount: 170000, confirmed: false },
    photos: [],
  },
  {
    slug: 'automaticky-boxovy-system',
    status: 'published',
    category: 'boxove-systemy',
    name: 'Automatický výdejní boxový systém',
    summary:
      'Chlazený systém uzamykatelných schránek pro výdej připraveného zboží. Teplota 2–8 °C, dveře schránek ocelové nebo průhledné.',
    shortName: 'Boxový systém',
    intro:
      'Uzamykatelné chlazené schránky pro výdej předem připraveného zboží a objednávek.',
    keyFacts: [
      { icon: 'thermo', label: 'Teplota', value: '2–8 °C' },
      { icon: 'gear', label: 'Chlazení', value: 'Vzduchové, chladivo R290' },
      { icon: 'plug', label: 'Jmenovitý příkon', value: '450 W' },
    ],
    useCases: [
      { icon: 'box', label: 'Výdej objednaných jídel a nákupů' },
      { icon: 'calendar', label: 'Výdej mimo otevírací dobu' },
      { icon: 'building', label: 'Firemní a areálové stravování' },
    ],
    highlights: ['2–8 °C', 'Chladivo R290', '450 W'],
    benefits: [
      { icon: 'box', title: 'Dveře podle zboží', text: 'Ocelové, nebo průhledné dveře schránek.' },
      { icon: 'shelves', title: 'Sestava na míru', text: 'Počet a uspořádání schránek podle vašich požadavků.' },
    ],
    options: [
      { label: 'Dveře schránek', value: 'Ocelové, nebo průhledné' },
      { label: 'Konfigurace', value: 'Počet a uspořádání schránek podle požadavků' },
    ],
    specs: [
      { label: 'Chlazení', value: 'Vzduchové' },
      { label: 'Chladivo', value: 'R290' },
      { label: 'Teplotní rozsah', value: '2–8 °C' },
      { label: 'Dveře schránek', value: 'Ocelové nebo průhledné (dle volby)', optional: true },
      { label: 'Jmenovitý příkon', value: '450 W' },
    ],
    price: { type: 'configuration' },
    photos: [],
  },
  {
    slug: 'modularni-boxovy-system',
    status: 'published',
    category: 'boxove-systemy',
    name: 'Modulární výdejní boxový systém',
    summary:
      'Sestava výdejních schránek skládaná z modulů podle místa instalace, počtu schránek a druhu zboží. Nacenění individuálně.',
    shortName: 'Modulární systém',
    intro:
      'Výdejní schránky skládané z modulů podle prostoru, počtu schránek a druhu zboží.',
    keyFacts: [],
    useCases: [
      { icon: 'ruler', label: 'Provozy s konkrétními prostorovými požadavky' },
      { icon: 'box', label: 'Výdej různě velkého zboží' },
      { icon: 'building', label: 'Projekty s pozdějším rozšířením' },
    ],
    highlights: ['Sestava na míru', 'Individuální nacenění'],
    benefits: [
      { icon: 'ruler', title: 'Podle prostoru', text: 'Sestavu navrhneme podle místa, kde bude systém stát.' },
      { icon: 'box', title: 'Schránky podle zboží', text: 'Počet a velikost schránek odpovídá vašemu zboží.' },
      { icon: 'chat', title: 'Konfigurace předem', text: 'Konfiguraci s vámi projdeme ještě před vypracováním nabídky.' },
    ],
    options: [],
    specs: [],
    specsNote:
      'Technické parametry závisí na zvolené konfiguraci. Uvedeme je v nabídce.',
    price: { type: 'individual' },
    photos: [],
  },
  {
    // Old website: heading "???? upravit", price 200 000 Kč, no reliable
    // name or specifications. Not published until the client confirms it.
    slug: 'sestava-k-upresneni',
    status: 'pending',
    category: null,
    name: 'Sestava automatů (název k upřesnění)',
    summary: '',
    useCases: [],
    highlights: [],
    benefits: [],
    options: [],
    specs: [],
    price: { type: 'fixed', amount: 200000, confirmed: false },
    photos: [],
  },
];

export const publishedProducts = products.filter((p) => p.status === 'published');
export const productUrl = (p) => `automaty/${p.slug}.html`;

const fmt = new Intl.NumberFormat('cs-CZ');

// Public price text. Deliberately says nothing about VAT (unknown).
export function priceText(price) {
  switch (price.type) {
    case 'from':
      return { label: 'Orientační cena', value: `od ${fmt.format(price.amount)} Kč` };
    case 'fixed':
      return { label: 'Orientační cena', value: `${fmt.format(price.amount)} Kč` };
    case 'configuration':
      return { label: 'Cena', value: 'Podle konfigurace' };
    case 'inquiry':
      return { label: 'Cena', value: 'na poptávku' };
    default:
      return { label: 'Cena', value: 'Individuální nacenění' };
  }
}

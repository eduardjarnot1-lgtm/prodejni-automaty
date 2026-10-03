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

export const categories = [
  {
    key: 'chlazene-automaty',
    name: 'Chlazené automaty na potraviny',
    short:
      'Samoobslužný prodej balených jídel, svačin a nápojů. Zákazník vybírá na dotykovém displeji.',
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
    slug: 'chlazeny-automat-na-potraviny',
    status: 'published',
    category: 'chlazene-automaty',
    name: 'Chlazený automat na potraviny',
    summary:
      'Prodejní automat s dotykovým displejem a výtahem pro výdej zboží. Až 54 prodejních pozic, volitelně s chlazením 4–8 °C.',
    useCases: [
      'Firmy, výrobní provozy a sklady',
      'Kanceláře a administrativní budovy',
      'Školy, nemocnice a veřejné budovy',
    ],
    highlights: ['Displej 21,5″', 'Až 54 pozic', 'Výdej výtahem'],
    benefits: [
      'Velký dotykový displej 21,5″ pro přehledný výběr zboží.',
      'Zboží se k výdejnímu otvoru přepravuje výtahem.',
      'Až 6 polic a 9 kanálů na polici, celkem až 54 prodejních pozic.',
      'Řídicí systém na platformě Android.',
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
    useCases: [
      'Výdej předem objednaných jídel a nákupů',
      'Provozy s výdejem mimo otevírací dobu',
      'Firemní a areálové stravování',
    ],
    highlights: ['2–8 °C', 'Chladivo R290', '450 W'],
    benefits: [
      'Chlazení schránek v rozsahu 2–8 °C.',
      'Vzduchové chlazení s chladivem R290.',
      'Provedení dveří schránek podle typu zboží: ocelové nebo průhledné.',
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
    useCases: [
      'Provozy s konkrétními prostorovými požadavky',
      'Výdej různě velkého zboží',
      'Projekty, které se mohou později rozšiřovat',
    ],
    highlights: ['Sestava na míru', 'Individuální nacenění'],
    benefits: [
      'Sestavu navrhneme podle prostoru, ve kterém bude systém stát.',
      'Počet a velikost schránek odpovídá vašemu zboží.',
      'Konfiguraci s vámi projdeme ještě před vypracováním nabídky.',
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
    default:
      return { label: 'Cena', value: 'Individuální nacenění' };
  }
}

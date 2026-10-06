// Schematic illustrations for the "AI automaty" page (inline SVG).
//
// One drawing style for all: dark outline, light fills, one green accent.
// They explain a step; they never imitate readable app screens or data, and
// the page labels them as illustrations ("Ilustrační náhled").

const INK = '#1c2027';
const LINE = '#c9cdd2';
const SOFT = '#f1f2f3';
const GREEN = '#3fa34d';
const JUICE = '#8cc47a';

const svg = (body, label, vb = '0 0 240 180') =>
  `<svg class="ai-ill" viewBox="${vb}" role="img" aria-label="${label}" focusable="false">${body}</svg>`;

// --- Adding a product -------------------------------------------------------

// 01 Product details: a form with four fields, one of them a barcode (GTIN).
export const formIll = () => svg(`
  <rect x="58" y="14" width="124" height="152" rx="14" fill="#fff" stroke="${INK}" stroke-width="3"/>
  ${[44, 76, 108].map((y, i) => `
    <rect x="74" y="${y - 10}" width="${[46, 30, 38][i]}" height="5" rx="2.5" fill="${LINE}"/>
    <rect x="74" y="${y}" width="92" height="16" rx="5" fill="${SOFT}" stroke="${LINE}" stroke-width="2"/>`).join('')}
  <g stroke="${INK}" stroke-width="2">${[0, 4, 6, 11, 14, 16, 20, 25, 27, 31].map((x) => `<path d="M${80 + x * 2} 112v8"/>`).join('')}</g>
  <rect x="96" y="138" width="48" height="16" rx="8" fill="${GREEN}"/>`,
  'Formulář s poli pro údaje o produktu a čárovým kódem');

// 02 Photographs: one bottle from the front, back, side and top.
const bottleFront = (x, back = false) => `
  <g transform="translate(${x} 34)">
    <rect x="9" y="0" width="14" height="12" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M7 14h18l4 10v66a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6V24z" fill="${JUICE}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="3" y="42" width="26" height="24" fill="#fff" stroke="${INK}" stroke-width="2"/>
    ${back
      ? `<g stroke="${INK}" stroke-width="1.5">${[0, 2, 5, 7, 10, 12, 15].map((d) => `<path d="M${8 + d} 49v10"/>`).join('')}</g>`
      : `<rect x="8" y="48" width="16" height="4" rx="2" fill="${GREEN}"/><rect x="8" y="56" width="11" height="3" rx="1.5" fill="${LINE}"/>`}
  </g>`;
const bottleSide = (x) => `
  <g transform="translate(${x} 34)">
    <rect x="5" y="0" width="10" height="12" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <path d="M3 14h14l3 10v66a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V24z" fill="${JUICE}" stroke="${INK}" stroke-width="2.5"/>
    <rect x="0" y="42" width="20" height="24" fill="#fff" stroke="${INK}" stroke-width="2"/>
  </g>`;
const bottleTop = (x) => `
  <g transform="translate(${x} 64)">
    <circle cx="20" cy="20" r="19" fill="${JUICE}" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="20" cy="20" r="9" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
  </g>`;
export const photosIll = () => svg(`
  ${bottleFront(18)}${bottleFront(76, true)}${bottleSide(142)}${bottleTop(184)}
  ${[34, 92, 152, 204].map((x) => `<circle cx="${x}" cy="150" r="3" fill="${GREEN}"/>`).join('')}`,
  'Stejná lahev vyfocená zepředu, zezadu, z boku a shora');

// 03 Submit for review: a document with a check mark in a circle.
export const reviewIll = () => svg(`
  <path d="M74 18h66l26 26v118H74z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M140 18v26h26" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  ${[64, 80, 96].map((y, i) => `<rect x="90" y="${y}" width="${[56, 46, 52][i]}" height="6" rx="3" fill="${LINE}"/>`).join('')}
  <circle cx="160" cy="132" r="24" fill="#fff" stroke="${GREEN}" stroke-width="4"/>
  <path d="m149 132 8 8 14-15" fill="none" stroke="${GREEN}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  'Žádost o nový produkt odeslaná ke kontrole');

// 04 Added to the assortment: a shelf with a new product highlighted.
const can = (x, hl = false) => `
  <rect x="${x}" y="78" width="30" height="50" rx="6" fill="${hl ? JUICE : SOFT}" stroke="${INK}" stroke-width="2.5"/>
  <rect x="${x}" y="94" width="30" height="14" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
export const shelfIll = () => svg(`
  <rect x="24" y="128" width="192" height="10" rx="3" fill="${INK}"/>
  ${can(40)}${can(80)}${can(160)}
  <g>${can(120, true)}</g>
  <rect x="113" y="70" width="44" height="66" rx="10" fill="none" stroke="${GREEN}" stroke-width="3" stroke-dasharray="7 5"/>
  <circle cx="157" cy="66" r="13" fill="${GREEN}"/><path d="M157 59v14M150 66h14" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
  'Police se zbožím, nový produkt je zvýrazněný');

// --- Restocking ---------------------------------------------------------------
// Shared base: a shelf with three product lanes and a box; each method adds
// its own mark (fast: lightning; one click: calculated amounts; order: list).
const restockBase = (lanes) => `
  <rect x="20" y="22" width="132" height="136" rx="10" fill="#fff" stroke="${INK}" stroke-width="3"/>
  ${[64, 110].map((y) => `<rect x="20" y="${y}" width="132" height="4" fill="${INK}"/>`).join('')}
  ${lanes.map((n, row) => Array.from({ length: 4 }, (_, k) => `<rect x="${32 + k * 28}" y="${[36, 82, 128][row]}" width="20" height="26" rx="4" fill="${k < n ? JUICE : SOFT}" stroke="${k < n ? INK : LINE}" stroke-width="2"/>`).join('')).join('')}
  <path d="M168 120h50v40h-50z" fill="#d9b98b" stroke="${INK}" stroke-width="2.5"/><path d="M168 120l8-12h34l8 12" fill="#e8cfa6" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;

export const restockIll = (mode) => {
  const marks = {
    fast: `<circle cx="193" cy="56" r="26" fill="#fff" stroke="${GREEN}" stroke-width="3"/>
      <path d="M197 38l-14 22h12l-4 16 14-23h-12z" fill="${GREEN}" stroke="${GREEN}" stroke-width="2" stroke-linejoin="round"/>`,
    oneclick: `<rect x="168" y="30" width="52" height="56" rx="8" fill="#fff" stroke="${GREEN}" stroke-width="3"/>
      ${[44, 58, 72].map((y) => `<rect x="178" y="${y - 4}" width="18" height="6" rx="3" fill="${LINE}"/><rect x="200" y="${y - 4}" width="10" height="6" rx="3" fill="${GREEN}"/>`).join('')}`,
    order: `<rect x="170" y="24" width="48" height="64" rx="6" fill="#fff" stroke="${GREEN}" stroke-width="3"/>
      <rect x="184" y="18" width="20" height="10" rx="3" fill="${GREEN}"/>
      ${[42, 56, 70].map((y) => `<path d="m178 ${y}l4 4 7-8" fill="none" stroke="${GREEN}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="194" y="${y - 2}" width="16" height="5" rx="2.5" fill="${LINE}"/>`).join('')}`,
  };
  const labels = {
    fast: 'Doplnění police bez zadávání množství',
    oneclick: 'Doplnění podle vypočteného množství',
    order: 'Doplnění podle objednávky na doplnění',
  };
  return svg(`${restockBase([4, 2, 3])}${marks[mode]}`, labels[mode]);
};
